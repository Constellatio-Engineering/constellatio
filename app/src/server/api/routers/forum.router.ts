/* eslint-disable max-lines */
import { db } from "@/db/connection";
import {
  answerUpvotes, correctAnswers, type ForumAnswerInsert, forumAnswers, type ForumQuestionInsert, forumQuestions, questionUpvotes 
} from "@/db/schema";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { deleteAnswerSchema } from "@/schemas/forum/deleteAnswer.schema";
import { deleteQuestionSchema } from "@/schemas/forum/deleteQuestion.schema";
import { getAnswerByIdSchema } from "@/schemas/forum/getAnswerById.schema";
import { getAnswersSchema } from "@/schemas/forum/getAnswers.schema";
import { getQuestionByIdSchema } from "@/schemas/forum/getQuestionById.schema";
import { type GetQuestionsSchema, getQuestionsSchema } from "@/schemas/forum/getQuestions.schema";
import { markAnswerAsCorrectSchema } from "@/schemas/forum/markAnswerAsCorrect.schema";
import { postAnswerSchema } from "@/schemas/forum/postAnswer.schema";
import { postQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { updateAnswerSchema } from "@/schemas/forum/updateAnswer.schema";
import { updateQuestionSchema } from "@/schemas/forum/updateQuestion.schema";
import { upvoteAnswerSchema } from "@/schemas/forum/upvoteAnswer.schema";
import { upvoteQuestionSchema } from "@/schemas/forum/upvoteQuestion.schema";
import { getAllLegalFields, getAllSubfields, getAllTopics } from "@/server/api/services/caisy.services";
import { getAnswers, getQuestions } from "@/server/api/services/forum.services";
import { createTRPCRouter, forumModProcedure, protectedProcedure } from "@/server/api/trpc";
import { createForumQuestionSearchIndexItem, forumQuestionSearchIndexItemPrimaryKey, type ForumQuestionSearchItemUpdate, searchIndices } from "@/utils/search";
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError } from "@/utils/serverError";
import { removeHtmlTagsFromString } from "@/utils/utils";

import { type inferProcedureOutput } from "@trpc/server";
import {
  and, count, eq, inArray, or 
} from "drizzle-orm";
import slugify from "slugify";

const createSlug = (title: string): string =>
{
  return slugify(title, {
    locale: "de",
    lower: true,
    replacement: "-",
    trim: true,
  });
};

export const forumRouter = createTRPCRouter({
  deleteAnswer: protectedProcedure
    .input(deleteAnswerSchema)
    .mutation(async ({ ctx: { userId }, input: { answerId } }) =>
    {
      const answer = await db.query.forumAnswers.findFirst({
        where: eq(forumAnswers.id, answerId),
      });

      if(!answer)
      {
        throw new NotFoundError();
      }

      if(answer.userId !== userId)
      {
        throw new ForbiddenError();
      }

      return db
        .delete(forumAnswers)
        .where(
          or(
            eq(forumAnswers.id, answerId),
            inArray(
              forumAnswers.parentAnswerId,
              db
                .select({ id: forumAnswers.id })
                .from(forumAnswers)
                .where(eq(forumAnswers.id, answerId))
            )
          )
        )
        .returning({
          id: forumAnswers.id,
          parentAnswerId: forumAnswers.parentAnswerId,
          parentQuestionId: forumAnswers.parentQuestionId
        });
    }),
  deleteQuestion: protectedProcedure
    .input(deleteQuestionSchema)
    .mutation(async ({ ctx: { userId }, input: { questionId } }) =>
    {
      const question = await db.query.forumQuestions.findFirst({
        where: eq(forumQuestions.id, questionId),
      });

      if(!question)
      {
        throw new NotFoundError();
      }

      if(question.userId !== userId)
      {
        throw new ForbiddenError();
      }

      await db.transaction(async transaction =>
      {
        // upvotes are deleted automatically due to the foreign key constraint (on delete cascade)

        await transaction
          .delete(forumAnswers)
          .where(
            or(
              eq(forumAnswers.parentQuestionId, questionId),
              inArray(
                forumAnswers.parentAnswerId,
                transaction
                  .select({ id: forumAnswers.id })
                  .from(forumAnswers)
                  .where(eq(forumAnswers.parentQuestionId, questionId))
              )
            )
          );

        await transaction
          .delete(forumQuestions)
          .where(eq(forumQuestions.id, questionId));
      });

      const removeDeletedQuestionFromIndex = await meiliSearchAdmin
        .index(searchIndices.forumQuestions)
        .deleteDocuments({
          filter: `id = ${questionId}`
        });

      const removeQuestionFromIndexResult = await meiliSearchAdmin.waitForTask(removeDeletedQuestionFromIndex.taskUid);

      if(removeQuestionFromIndexResult.status !== "succeeded")
      {
        console.error("failed to remove question from index", removeQuestionFromIndexResult);
      }
    }),
  getAnswerById: protectedProcedure
    .input(getAnswerByIdSchema)
    .query(async ({ ctx: { userId }, input: { answerId } }) =>
    {
      const [answer] = await getAnswers({
        answerId,
        getAnswersType: "byId",
        userId
      });

      return answer ?? null;
    }),
  getAnswers: protectedProcedure
    .input(getAnswersSchema)
    .query(async ({ ctx: { userId }, input }) =>
    {
      const answers = await getAnswers({
        ...input,
        getAnswersType: "all",
        userId,
      });

      return answers;
    }),
  getQuestionById: protectedProcedure
    .input(getQuestionByIdSchema)
    .query(async ({ ctx: { userId }, input: { questionId } }) =>
    {
      const [question] = await getQuestions({
        getQuestionsType: "byId",
        questionId,
        userId
      });

      return question ?? null;
    }),
  getQuestions: protectedProcedure
    .input(getQuestionsSchema)
    .query(async ({ ctx: { userId }, input: { cursor, limit, questionIds } }) =>
    {
      const questions = await getQuestions({
        cursor,
        getQuestionsType: "infinite",
        limit,
        questionIds,
        userId
      });
      const hasNextPage = questions.length > limit;
      let nextCursor: GetQuestionsSchema["cursor"] | null = null;

      if(hasNextPage)
      {
        // remove the last element since it's only used to determine if there's a next page
        const nextQuestion = questions.pop();

        if(nextQuestion == null)
        {
          throw new InternalServerError(new Error("nextQuestion is null"));
        }

        switch (cursor.cursorType)
        {
          case "newest":
            nextCursor = {
              cursorType: "newest",
              index: nextQuestion.index
            };
            break;
          case "upvotes":
            nextCursor = {
              cursorType: "upvotes",
              index: nextQuestion.index,
              upvotes: nextQuestion.upvotesCount
            };
            break;
        }
      }

      return { nextCursor, questions };
    }),
  getTotalAmountOfQuestions: protectedProcedure
    .query(async () =>
    {
      const [totalAmountQuery] = await db
        .select({ count: count() })
        .from(forumQuestions);

      return { count: totalAmountQuery?.count };
    }),
  markAnswerAsCorrect: forumModProcedure
    .input(markAnswerAsCorrectSchema)
    .mutation(async ({ ctx: { userId }, input: { answerId } }) =>
    {
      const answer = await db.query.forumAnswers.findFirst({
        where: eq(forumAnswers.id, answerId),
      });

      if(!answer)
      {
        throw new NotFoundError();
      }

      if(!answer.parentQuestionId)
      {
        throw new BadRequestError(new Error("Answer is not a child of a question"));
      }

      await db
        .insert(correctAnswers)
        .values({
          answerId,
          confirmedByUserId: userId,
          questionId: answer.parentQuestionId
        })
        .onConflictDoNothing();
    }),
  postAnswer: protectedProcedure
    .input(postAnswerSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const answerInsert: ForumAnswerInsert = {
        parentAnswerId: input.parent.parentType === "answer" ? input.parent.answerId : null,
        parentQuestionId: input.parent.parentType === "question" ? input.parent.questionId : null,
        text: input.text,
        userId
      };

      return db.insert(forumAnswers).values(answerInsert).returning();
    }),
  postQuestion: protectedProcedure
    .input(postQuestionSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const questionInsert: ForumQuestionInsert = {
        legalFieldId: input.legalFieldId,
        slug: createSlug(input.title),
        subfieldId: input.subfieldId,
        text: input.text,
        title: input.title,
        topicId: input.topicId,
        userId
      };

      const allLegalFields = await getAllLegalFields();
      const allSubfields = await getAllSubfields();
      const allTopics = await getAllTopics();

      const subfield = allSubfields.find(legalArea => legalArea.id === questionInsert.subfieldId);
      const legalField = allLegalFields.find(mainCategory => mainCategory.id === questionInsert.legalFieldId);
      const topic = allTopics.find(topic => topic.id === questionInsert.topicId);

      const [insertedQuestion] = await db.insert(forumQuestions).values(questionInsert).returning();

      if(!insertedQuestion)
      {
        throw new InternalServerError(new Error("Question was null after insertion"));
      }

      const searchIndexItem = createForumQuestionSearchIndexItem({
        id: insertedQuestion.id,
        legalFieldName: legalField?.mainCategory ?? undefined,
        slug: questionInsert.slug,
        subfieldName: subfield?.legalAreaName ?? undefined,
        text: questionInsert.text,
        title: questionInsert.title,
        topicName: topic?.topicName ?? undefined,
        userId,
      });

      const addQuestionToIndexTask = await meiliSearchAdmin
        .index(searchIndices.forumQuestions)
        .addDocuments([searchIndexItem], { primaryKey: forumQuestionSearchIndexItemPrimaryKey });

      const addQuestionToIndexResult = await meiliSearchAdmin.waitForTask(addQuestionToIndexTask.taskUid);

      if(addQuestionToIndexResult.status !== "succeeded")
      {
        console.error("failed to add question to index", addQuestionToIndexResult);
      }

      return insertedQuestion;
    }),
  removeAnswerUpvote: protectedProcedure
    .input(upvoteAnswerSchema)
    .mutation(async ({ ctx: { userId }, input: { answerId } }) =>
    {
      await db.delete(answerUpvotes).where(
        and(
          eq(answerUpvotes.answerId, answerId),
          eq(answerUpvotes.userId, userId)
        )
      );
    }),
  removeQuestionUpvote: protectedProcedure
    .input(upvoteQuestionSchema)
    .mutation(async ({ ctx: { userId }, input: { questionId } }) =>
    {
      await db.delete(questionUpvotes).where(
        and(
          eq(questionUpvotes.questionId, questionId),
          eq(questionUpvotes.userId, userId)
        )
      );
    }),
  unmarkAnswerAsCorrect: forumModProcedure
    .input(markAnswerAsCorrectSchema)
    .mutation(async ({ input: { answerId } }) =>
    {
      await db
        .delete(correctAnswers)
        .where(eq(correctAnswers.answerId, answerId));
    }),
  updateAnswer: protectedProcedure
    .input(updateAnswerSchema)
    .mutation(async ({ ctx: { userId }, input: { answerId, text } }) =>
    {
      const answer = await db
        .query
        .forumAnswers
        .findFirst({
          where: eq(forumAnswers.id, answerId),
        });

      if(!answer)
      {
        throw new NotFoundError();
      }

      if(answer.userId !== userId)
      {
        throw new ForbiddenError();
      }

      const [updatedAnswer] = await db
        .update(forumAnswers)
        .set({ text })
        .where(eq(forumAnswers.id, answerId))
        .returning();

      return updatedAnswer;
    }),
  updateQuestion: protectedProcedure
    .input(updateQuestionSchema)
    .mutation(async ({ ctx: { userId }, input: { id: questionId, updatedValues } }) =>
    {
      const _updatedValues: Partial<ForumQuestionInsert> = {
        ...(updatedValues.title != null && {
          slug: createSlug(updatedValues.title)
        } satisfies Partial<ForumQuestionInsert>),
        legalFieldId: updatedValues.legalFieldId,
        subfieldId: updatedValues.subfieldId,
        text: updatedValues.text,
        title: updatedValues.title,
        topicId: updatedValues.topicId,
        updatedAt: new Date(),
      };
      
      const [updatedQuestion] = await db
        .update(forumQuestions)
        .set(_updatedValues)
        .where(and(
          eq(forumQuestions.id, questionId),
          eq(forumQuestions.userId, userId)
        ))
        .returning();

      if(!updatedQuestion)
      {
        throw new InternalServerError(new Error("updatedQuestion was null after update"));
      }

      if(updatedValues.text != null)
      {
        updatedValues.text = removeHtmlTagsFromString(updatedValues.text, true);
      }

      const searchIndexQuestionUpdate: ForumQuestionSearchItemUpdate = {
        ...updatedValues,
        id: questionId,
      };

      const updateQuestionInIndexTask = await meiliSearchAdmin.index(searchIndices.forumQuestions).updateDocuments([searchIndexQuestionUpdate]);
      const updateQuestionInIndexResult = await meiliSearchAdmin.waitForTask(updateQuestionInIndexTask.taskUid);

      if(updateQuestionInIndexResult.status !== "succeeded")
      {
        console.error("failed to update question in index", updateQuestionInIndexResult);
      }

      return updatedQuestion;
    }),
  upvoteAnswer: protectedProcedure
    .input(upvoteAnswerSchema)
    .mutation(async ({ ctx: { userId }, input: { answerId } }) =>
    {
      await db
        .insert(answerUpvotes)
        .values({ answerId, userId })
        .onConflictDoNothing();
    }),
  upvoteQuestion: protectedProcedure
    .input(upvoteQuestionSchema)
    .mutation(async ({ ctx: { userId }, input: { questionId } }) =>
    {
      await db
        .insert(questionUpvotes)
        .values({ questionId, userId })
        .onConflictDoNothing();
    }),
});

export type Question = NonNullable<inferProcedureOutput<typeof forumRouter.getQuestionById>>;
