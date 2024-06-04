import type { IGenMainCategory } from "@/services/graphql/__generated/sdk";
import type { Nullable } from "@/utils/types";

export type MainCategorySearchIndexItem = {
  id: Nullable<string>;
  mainCategory: Nullable<string>;
};

export type MainCategorySearchItemNodes = keyof MainCategorySearchIndexItem;
export type MainCategorySearchItemUpdate = MainCategorySearchIndexItem;

export const createMainCategorySearchIndexItem = ({ id, mainCategory }: IGenMainCategory): MainCategorySearchIndexItem =>
{
  const mainCategorySearchIndexItem: MainCategorySearchIndexItem = {
    id,
    mainCategory
  };

  return mainCategorySearchIndexItem;
};

export const mainCategorySearchIndexItemPrimaryKey: keyof MainCategorySearchIndexItem = "id";
