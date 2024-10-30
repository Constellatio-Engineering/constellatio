import { type Values } from "@constellatio/utility-types";

export const searchIndices = {
  articles: "articles",
  cases: "cases",
  forumQuestions: "forum-questions",
  tags: "tags",
  userDocuments: "user-documents",
  userUploads: "user-uploads",
} as const;

export type SearchIndex = Values<typeof searchIndices>;
