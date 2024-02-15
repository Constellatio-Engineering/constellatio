/* eslint-disable max-lines */
import { db } from "@/db/connection";
import {
  answerUpvotes,
  type ForumAnswerInsert, forumAnswers, type ForumQuestionInsert, forumQuestions, questionUpvotes
} from "@/db/schema";
import { deleteAnswerSchema } from "@/schemas/forum/deleteAnswer.schema";
import { deleteQuestionSchema } from "@/schemas/forum/deleteQuestion.schema";
import { getAnswerByIdSchema } from "@/schemas/forum/getAnswerById.schema";
import { type GetAnswersSchema, getAnswersSchema } from "@/schemas/forum/getAnswers.schema";
import { getQuestionByIdSchema } from "@/schemas/forum/getQuestionById.schema";
import { type GetQuestionsSchema, getQuestionsSchema } from "@/schemas/forum/getQuestions.schema";
import { postAnswerSchema } from "@/schemas/forum/postAnswer.schema";
import { postQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { updateQuestionSchema } from "@/schemas/forum/updateQuestion.schema";
import { upvoteAnswerSchema } from "@/schemas/forum/upvoteAnswer.schema";
import { upvoteQuestionSchema } from "@/schemas/forum/upvoteQuestion.schema";
import { getAnswers, getQuestions } from "@/server/api/services/forum.services";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ForbiddenError, InternalServerError, NotFoundError } from "@/utils/serverError";
import { sleep } from "@/utils/utils";

import { type inferProcedureOutput } from "@trpc/server";
import {
  and, count, eq, inArray, or 
} from "drizzle-orm";
import slugify from "slugify";

export const forumRouter = createTRPCRouter({
  deleteAnswer: protectedProcedure
    .input(deleteAnswerSchema)
    .mutation(async ({ ctx: { userId }, input: { answerId } }) =>
    {
      await sleep(500);

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
      await sleep(500);

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
      console.log("getAnswers", input);

      await sleep(500);

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
    .query(async ({ ctx: { userId }, input: { cursor, limit } }) =>
    {
      await sleep(500);

      const questions = await getQuestions({
        cursor,
        getQuestionsType: "infinite",
        limit,
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
  postAnswer: protectedProcedure
    .input(postAnswerSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      await sleep(500);

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
      await sleep(500);

      const questionInsert: ForumQuestionInsert = {
        legalFieldId: input.legalFieldId,
        slug: slugify(input.title, {
          locale: "de",
          lower: true,
          replacement: "-",
          trim: true,
        }),
        subfieldId: input.subfieldId,
        text: input.text,
        title: input.title,
        topicId: input.topicId,
        userId
      };

      return db.insert(forumQuestions).values(questionInsert).returning();
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
  updateQuestion: protectedProcedure
    .input(updateQuestionSchema)
    .mutation(async ({ ctx: { userId }, input: { id: questionId, updatedValues } }) =>
    {
      await sleep(500);

      const [updatedQuestion] = await db
        .update(forumQuestions)
        .set(updatedValues)
        .where(and(
          eq(forumQuestions.id, questionId),
          eq(forumQuestions.userId, userId)
        ))
        .returning();

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
export type Answer = NonNullable<inferProcedureOutput<typeof forumRouter.getAnswerById>>;
