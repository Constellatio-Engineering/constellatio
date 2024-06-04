import type { IGenSubCategory } from "@/services/graphql/__generated/sdk";
import type { Nullable } from "@/utils/types";

export type SubCategorySearchIndexItem = {
  id: Nullable<string>;
  parentMainCategoryId: Nullable<string>;
  subCategory: Nullable<string>;
};

export type SubCategorySearchItemNodes = keyof SubCategorySearchIndexItem;
export type SubCategorySearchItemUpdate = SubCategorySearchIndexItem;

export const createSubCategorySearchIndexItem = ({ id, mainCategory, subCategory }: IGenSubCategory): SubCategorySearchIndexItem =>
{
  const subCategorySearchIndexItem: SubCategorySearchIndexItem = {
    id,
    parentMainCategoryId: mainCategory?.[0]?.id,
    subCategory 
  };

  return subCategorySearchIndexItem; 
};

export const subCategorySearchIndexItemPrimaryKey: keyof SubCategorySearchIndexItem = "id";
