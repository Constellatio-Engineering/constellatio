import { db } from "@/db/connection";
import { type ForumQuestionInsert, forumQuestions } from "@/db/schema";
import { postQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { sleep } from "@/utils/utils";

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
      await sleep(300);

      const questionInsert: ForumQuestionInsert = {
        legalArea: input.legalArea,
        legalField: input.legalField,
        legalTopic: input.legalTopic,
        questionHtml: input.question.html,
        questionText: input.question.text,
        title: input.title,
        userId
      };

      return db.insert(forumQuestions).values(questionInsert).returning();
    }),
});
