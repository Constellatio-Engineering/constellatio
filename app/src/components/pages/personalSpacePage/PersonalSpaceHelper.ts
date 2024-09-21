import type { GetOverviewPagePropsResult } from "@/services/content/getOverviewPageProps";
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
): GetOverviewPagePropsResult["allMainCategories"] =>
{
  return [
    {
      __typename: "MainCategory",
      icon: {
        src: materialsCategoryData?.FileIconSvg.src,
        title: "file-category-icon"
      },
      id: materialsCategoryData?.MaterialsCategoryId,
      itemsPerCategory: materialsCategoryData?.uploadedFilesLength ?? 0,
      mainCategory: "Deine Dateien",
      slug: materialsCategoryData.slug
    },
    {
      __typename: "MainCategory",
      icon: {
        src: favCategoryData?.BookmarkIconSvg.src,
        title: "bookmark-icon"
      },
      id: favCategoryData?.FavCategoryId,
      itemsPerCategory: favCategoryData?.bookmarkedCasesLength ?? 0,
      mainCategory: "Favoriten",
      slug: favCategoryData.slug
    },
  ];
};
