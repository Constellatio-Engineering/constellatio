import { db } from "@/db/connection";
import { type ForumQuestionInsert, forumQuestions, questionUpvotes } from "@/db/schema";
import { type GetQuestionsSchema, getQuestionsSchema } from "@/schemas/forum/getQuestions.schema";
import { postQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { upvoteQuestionSchema } from "@/schemas/forum/upvoteQuestion.schema";
import { getQuestions } from "@/server/api/services/forum.services";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { InternalServerError } from "@/utils/serverError";

import type { inferProcedureOutput } from "@trpc/server";
import { and, eq } from "drizzle-orm";

export const forumRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(getQuestionsSchema)
    .query(async ({ ctx: { userId }, input: { cursor, limit } }) =>
    {
      const questions = await getQuestions({ cursor, limit, userId });
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
  postQuestion: protectedProcedure
    .input(postQuestionSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const questionInsert: ForumQuestionInsert = {
        legalArea: input.legalArea,
        legalField: input.legalField,
        legalTopic: input.legalTopic,
        question: input.question,
        title: input.title,
        userId
      };

      return db.insert(forumQuestions).values(questionInsert).returning();
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

      return undefined;

      /* const [question] = await getQuestions(userId, 1, 1, [eq(forumQuestions.id, questionId)]);
      return question;*/
    }),
  upvoteQuestion: protectedProcedure
    .input(upvoteQuestionSchema)
    .mutation(async ({ ctx: { userId }, input: { questionId } }) =>
    {
      await db
        .insert(questionUpvotes)
        .values({ questionId, userId })
        .onConflictDoNothing();

      return undefined;

      /* const [question] = await getQuestions(userId, 1, 1, [eq(forumQuestions.id, questionId)]);
      return question;*/
    }),
});

export type getQuestionsResult = inferProcedureOutput<typeof forumRouter.getQuestions>;
