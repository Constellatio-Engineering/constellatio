import { type Values } from "@/utils/types";

export const searchIndices = {
  articles: "articles",
  cases: "cases",
  forumQuestions: "forum-questions",
  legalAreas: "legal-areas",
  mainCategories: "main-categories",
  subCategories: "sub-categories",
  tags: "tags",
  topics: "topics",
  userDocuments: "user-documents",
  userUploads: "user-uploads",
} as const;

export type SearchIndex = Values<typeof searchIndices>;
