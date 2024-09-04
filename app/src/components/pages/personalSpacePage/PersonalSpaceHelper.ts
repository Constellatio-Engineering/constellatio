import { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import { type IGenAsset } from "@/services/graphql/__generated/sdk";

export const categoriesHelper = (
  materialsCategoryData: {
    FileIconSvg: IGenAsset;
    MaterialsCategoryId: string;
    slug: string;
    uploadedFilesLength: number;
  },
  favCategoryData: {
    BookmarkIconSvg: IGenAsset;
    FavCategoryId: string;
    bookmarkedCasesLength: number;
    slug: string;
  },
): ICasesOverviewProps["allMainCategories"] =>
{
  return [
    {
      __typename: "MainCategory",
      casesPerCategory: materialsCategoryData?.uploadedFilesLength ?? 0,
      icon: {
        src: materialsCategoryData?.FileIconSvg.src,
        title: "file-category-icon"
      },
      id: materialsCategoryData?.MaterialsCategoryId,
      mainCategory: "Dateien & Docs",
      slug: materialsCategoryData.slug
    },
    {
      __typename: "MainCategory",
      //   casesPerCategory: favCategoryData?.bookmarkedCases?.length ?? 0,
      casesPerCategory: favCategoryData?.bookmarkedCasesLength ?? 0,
      icon: {
        src: favCategoryData?.BookmarkIconSvg.src,
        title: "bookmark-icon"
      },
      id: favCategoryData?.FavCategoryId,
      mainCategory: "Favoriten",
      slug: favCategoryData.slug
    }
  ];
};
