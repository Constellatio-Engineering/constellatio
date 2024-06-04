import type { IGenTags } from "@/services/graphql/__generated/sdk";
import type { Nullable } from "@/utils/types";

export type TagSearchIndexItem = {
  id: Nullable<string>;
  tagName: Nullable<string>;
};

export type TagSearchItemNodes = keyof TagSearchIndexItem;
export type TagSearchItemUpdate = TagSearchIndexItem;

export const createTagSearchIndexItem = ({ id, tagName }: IGenTags): TagSearchIndexItem =>
{
  const tagSearchIndexItem: TagSearchIndexItem = {
    id,
    tagName
  };

  return tagSearchIndexItem;
};

export const tagSearchIndexItemPrimaryKey: keyof TagSearchIndexItem = "id";
