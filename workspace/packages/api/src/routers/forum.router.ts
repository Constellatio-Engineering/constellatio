/* eslint-disable max-lines */

import {
  and, count, eq, inArray, or 
} from "@constellatio/db";
import { db } from "@constellatio/db/client";
import {
  answerUpvotes, correctAnswers, type ForumAnswerInsert, forumAnswers, type ForumQuestionInsert, forumQuestions, notifications, questionUpvotes 
} from "@constellatio/db/schema";
import { searchIndices } from "@constellatio/db-to-search";
import { createForumQuestionSearchIndexItem, forumQuestionSearchIndexItemPrimaryKey, type ForumQuestionSearchItemUpdate } from "@constellatio/meilisearch/utils";
import { deleteAnswerSchema } from "@constellatio/schemas/routers/forum/deleteAnswer.schema";
import { deleteQuestionSchema } from "@constellatio/schemas/routers/forum/deleteQuestion.schema";
import { getAnswerByIdSchema } from "@constellatio/schemas/routers/forum/getAnswerById.schema";
import { getAnswersSchema } from "@constellatio/schemas/routers/forum/getAnswers.schema";
import { getQuestionByIdSchema } from "@constellatio/schemas/routers/forum/getQuestionById.schema";
import { type GetQuestionsSchema, getQuestionsSchema } from "@constellatio/schemas/routers/forum/getQuestions.schema";
import { markAnswerAsCorrectSchema } from "@constellatio/schemas/routers/forum/markAnswerAsCorrect.schema";
import { postAnswerSchema } from "@constellatio/schemas/routers/forum/postAnswer.schema";
import { postQuestionSchema } from "@constellatio/schemas/routers/forum/postQuestion.schema";
import { updateAnswerSchema } from "@constellatio/schemas/routers/forum/updateAnswer.schema";
import { updateQuestionSchema } from "@constellatio/schemas/routers/forum/updateQuestion.schema";
import { upvoteAnswerSchema } from "@constellatio/schemas/routers/forum/upvoteAnswer.schema";
import { upvoteQuestionSchema } from "@constellatio/schemas/routers/forum/upvoteQuestion.schema";
import { removeHtmlTagsFromString } from "@constellatio/utils/html";
import { type inferProcedureOutput } from "@trpc/server";
import slugify from "slugify";

import { meiliSearchAdmin } from "../lib/meilisearch";
import { getAllLegalFields, getAllSubfields, getAllTopics } from "../services/caisy.services";
import { getAnswers, getQuestions, insertLegalFieldsAndTopicsForQuestion, resetLegalFieldsAndTopicsForQuestion } from "../services/forum.services";
import { createTRPCRouter, forumModProcedure, protectedProcedure } from "../trpc";
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError } from "../utils/serverError";

const createSlug = (title: string): string =>
{
  return slugify(title, {
    locale: "de",
    lower: true,
    replacement: "-",
    trim: true,
  });
};

const getLegalFieldsAndTopics = async ({
  legalFieldId,
  subfieldsIds,
  topicsIds
}: {
  legalFieldId: string;
  subfieldsIds: string[];
  topicsIds: string[];
}) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  const allLegalFields = await getAllLegalFields();
  const allSubfields = await getAllSubfields();
  const allTopics = await getAllTopics();

  const legalField = allLegalFields
    .filter(legalField => legalField.id != null && legalField.mainCategory != null)
    .find(legalField => legalField.id === legalFieldId);
  const subfields = allSubfields
    .filter(subfield => subfield.id != null && subfield.legalAreaName != null)
    .filter(subfield => subfieldsIds.includes(subfield.id!));
  const topics = allTopics
    .filter(topic => topic.id != null && topic.topicName != null)
    .filter(topic => topicsIds.includes(topic.id!));

  return ({ legalField, subfields, topics });
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

        await resetLegalFieldsAndTopicsForQuestion(questionId, transaction);

        await transaction
          .delete(forumQuestions)
          .where(eq(forumQuestions.id, questionId));
      });

      const removeDeletedQuestionFromIndex = await meiliSearchAdmin.index(searchIndices.forumQuestions).deleteDocument(questionId);
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

      const [insertedAnswer] = await db.insert(forumAnswers).values(answerInsert).returning();

      if(input.parent.parentType === "answer")
      {
        const parentAnswer = await db.query.forumAnswers.findFirst({
          where: eq(forumAnswers.id, input.parent.answerId),
        });

        if(!parentAnswer)
        {
          throw new BadRequestError(new Error("parent answer not found"));
        }

        if(parentAnswer.userId !== userId)
        {
          await db.insert(notifications).values({
            recipientId: parentAnswer.userId,
            resourceId: input.parent.answerId,
            senderId: userId,
            typeIdentifier: "replyToForumAnswerPosted",
          });
        }
      }
      else if(input.parent.parentType === "question")
      {
        const parentQuestion = await db.query.forumQuestions.findFirst({
          where: eq(forumQuestions.id, input.parent.questionId),
        });

        if(!parentQuestion)
        {
          throw new BadRequestError(new Error("parent question not found"));
        }

        if(parentQuestion.userId !== userId)
        {
          await db.insert(notifications).values({
            recipientId: parentQuestion.userId,
            resourceId: input.parent.questionId,
            senderId: userId,
            typeIdentifier: "answerToForumQuestionPosted",
          });
        }
      }

      return insertedAnswer;
    }),
  postQuestion: protectedProcedure
    .input(postQuestionSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const questionInsert: ForumQuestionInsert = {
        slug: createSlug(input.title),
        text: input.text,
        title: input.title,
        userId
      };

      const insertedQuestion = await db.transaction(async transaction =>
      {
        const [insertedQuestion] = await transaction.insert(forumQuestions).values(questionInsert).returning();

        if(!insertedQuestion)
        {
          throw new InternalServerError(new Error("insertedQuestion was null after insertion"));
        }

        await insertLegalFieldsAndTopicsForQuestion({
          dbConnection: transaction,
          legalFieldId: input.legalFieldId,
          questionId: insertedQuestion.id,
          subfieldsIds: input.subfieldsIds,
          topicsIds: input.topicsIds
        });

        return insertedQuestion;
      });

      const { legalField, subfields, topics } = await getLegalFieldsAndTopics({
        legalFieldId: input.legalFieldId,
        subfieldsIds: input.subfieldsIds,
        topicsIds: input.topicsIds
      });

      const searchIndexItem = createForumQuestionSearchIndexItem({
        id: insertedQuestion.id,
        legalFields: legalField ? [{
          id: legalField.id!,
          name: legalField.mainCategory!
        }] : [],
        slug: questionInsert.slug,
        subfields: subfields.map(subfield => ({
          id: subfield.id!,
          name: subfield.legalAreaName!
        })),
        text: questionInsert.text,
        title: questionInsert.title,
        topics: topics.map(topic => ({
          id: topic.id!,
          name: topic.topicName!
        })),
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
        text: updatedValues.text,
        title: updatedValues.title
      };

      const updatedQuestion = await db.transaction(async transaction =>
      {
        const [_updatedQuestion] = await transaction
          .update(forumQuestions)
          .set(_updatedValues)
          .where(and(
            eq(forumQuestions.id, questionId),
            eq(forumQuestions.userId, userId)
          ))
          .returning();

        if(!_updatedQuestion)
        {
          throw new InternalServerError(new Error("updatedQuestion was null after update"));
        }

        await resetLegalFieldsAndTopicsForQuestion(questionId, transaction);
        await insertLegalFieldsAndTopicsForQuestion({
          dbConnection: transaction,
          legalFieldId: updatedValues.legalFieldId,
          questionId,
          subfieldsIds: updatedValues.subfieldsIds,
          topicsIds: updatedValues.topicsIds
        });

        return _updatedQuestion;
      });

      if(updatedValues.text != null)
      {
        updatedValues.text = removeHtmlTagsFromString(updatedValues.text, true);
      }

      const { legalField, subfields, topics } = await getLegalFieldsAndTopics({
        legalFieldId: updatedValues.legalFieldId,
        subfieldsIds: updatedValues.subfieldsIds,
        topicsIds: updatedValues.topicsIds
      });

      const searchIndexQuestionUpdate: ForumQuestionSearchItemUpdate = {
        ...updatedValues,
        id: questionId,
        legalFields: legalField ? [{
          id: legalField.id!,
          name: legalField.mainCategory!
        }] : [],
        subfields: subfields.map(subfield => ({
          id: subfield.id!,
          name: subfield.legalAreaName!
        })),
        topics: topics.map(topic => ({
          id: topic.id!,
          name: topic.topicName!
        })),
      };

      const updateQuestionInIndexTask = await meiliSearchAdmin.index(searchIndices.forumQuestions).updateDocuments([searchIndexQuestionUpdate]);
      const updateQuestionInIndexResult = await meiliSearchAdmin.waitForTask(updateQuestionInIndexTask.taskUid);

      if(updateQuestionInIndexResult.status !== "succeeded")
      {
        console.error("failed to update question in index", updateQuestionInIndexResult);
      }

      return {
        ...updatedQuestion,
        legalFieldId: updatedValues.legalFieldId,
        subfieldsIds: updatedValues.subfieldsIds,
        topicsIds: updatedValues.topicsIds
      };
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
