import type { ForumQuestion } from "@/db/schema";
import type { Prettify } from "@/utils/types";
import { removeHtmlTagsFromString } from "@/utils/utils";

export type ForumQuestionSearchIndexItem = Pick<ForumQuestion, "id" | "text" | "title" | "slug" | "userId"> & {
  legalFields: Array<{
    id: string;
    name: string;
  }>;
  subfields: Array<{
    id: string;
    name: string;
  }>;
  topics: Array<{
    id: string;
    name: string;
  }>;
};
export type ForumQuestionSearchItemNodes = keyof ForumQuestionSearchIndexItem;
export type ForumQuestionSearchItemUpdate = Prettify<Partial<Omit<ForumQuestionSearchIndexItem, "id" | "userId">> & Pick<ForumQuestionSearchIndexItem, "id">>;

export const createForumQuestionSearchIndexItem = ({
  id,
  legalFields,
  slug,
  subfields,
  text,
  title,
  topics,
  userId
}: ForumQuestionSearchIndexItem): ForumQuestionSearchIndexItem =>
{
  return ({
    id,
    legalFields,
    slug,
    subfields,
    text: removeHtmlTagsFromString(text, true),
    title,
    topics,
    userId
  });
};

export const forumQuestionSearchIndexItemPrimaryKey: keyof ForumQuestionSearchIndexItem = "id";
