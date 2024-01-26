import { db } from "@/db/connection";
import { type ForumQuestionInsert, NoteInsert, notes } from "@/db/schema";
import { postQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const forumRouter = createTRPCRouter({
  postQuestion: protectedProcedure
    .input(postQuestionSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const quesiotnInsert: ForumQuestionInsert = {
        question: input.question.html,
        userId
      };

      return db.insert(notes).values(noteInsert).returning();
    })
});
