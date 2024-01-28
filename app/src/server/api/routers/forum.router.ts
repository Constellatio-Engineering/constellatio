import { db } from "@/db/connection";
import { type ForumQuestionInsert, forumQuestions, questionUpvotes } from "@/db/schema";
import { postQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { upvoteQuestionSchema } from "@/schemas/forum/upvoteQuestion.schema";
import { getQuestions } from "@/server/api/services/forum.services";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { and, eq } from "drizzle-orm";

export const forumRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      return getQuestions(userId);
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

      const [question] = await getQuestions(userId, [eq(forumQuestions.id, questionId)]);
      return question;
    }),
  upvoteQuestion: protectedProcedure
    .input(upvoteQuestionSchema)
    .mutation(async ({ ctx: { userId }, input: { questionId } }) =>
    {
      await db
        .insert(questionUpvotes)
        .values({ questionId, userId })
        .onConflictDoNothing();

      const [question] = await getQuestions(userId, [eq(forumQuestions.id, questionId)]);
      return question;
    }),
});
