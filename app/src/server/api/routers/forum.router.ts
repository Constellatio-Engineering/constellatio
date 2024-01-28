import { db } from "@/db/connection";
import { bookmarks, type ForumQuestionInsert, forumQuestions, questionUpvotes } from "@/db/schema";
import { postQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { upvoteQuestionSchema } from "@/schemas/forum/upvoteQuestion.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { and, eq } from "drizzle-orm";

export const forumRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .query(async () =>
    {
      return db.select().from(forumQuestions);
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
      const result = await db.delete(questionUpvotes).where(
        and(
          eq(questionUpvotes.questionId, questionId),
          eq(bookmarks.userId, userId)
        )
      );
      
      console.log("removeQuestionUpvote", result);
    }),
  upvoteQuestion: protectedProcedure
    .input(upvoteQuestionSchema)
    .mutation(async ({ ctx: { userId }, input: { questionId } }) =>
    {
      const result = await db
        .insert(questionUpvotes)
        .values({ questionId, userId })
        .onConflictDoNothing();

      console.log("upvoteQuestion", result);
    }),
});
