import { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import { type IGenAsset } from "@/services/graphql/__generated/sdk";

export const categoriesHelper = (favCategoryData: {
  BookmarkIconSvg: IGenAsset;
  FavCategoryId: string;
  bookmarkedCasesLength: number;
}, caterialsCategoryData: {
  FileIconSvg: IGenAsset;
  MaterialsCategoryId: string;
  uploadedFilesLength: number;
}): ICasesOverviewProps["allMainCategories"] => 
{
  return [
    {
      __typename: "MainCategory",
      //   casesPerCategory: favCategoryData?.bookmarkedCases?.length ?? 0,
      casesPerCategory: favCategoryData?.bookmarkedCasesLength ?? 0,
      icon: {
        src: favCategoryData?.BookmarkIconSvg.src,
        title: "bookmark-icon"
      },
      id: favCategoryData?.FavCategoryId,
      mainCategory: "Favourites"
    }, {
      __typename: "MainCategory",
      casesPerCategory: caterialsCategoryData?.uploadedFilesLength ?? 0,
      icon: {
        src: caterialsCategoryData?.FileIconSvg.src,
        title: "file-category-icon"
      },
      id: caterialsCategoryData?.MaterialsCategoryId,
      mainCategory: "Materials"
    }
  ];
};
