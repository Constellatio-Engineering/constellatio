import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import PersonalSpaceFavoriteTab from "@/components/organisms/personalSpaceFavoriteTab/PersonalSpaceFavoriteTab";
import PersonalSpaceMaterialsTab from "@/components/organisms/personalSpaceMaterialsTab/PersonalSpaceMaterialsTab";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import useArticles from "@/hooks/useArticles";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useDocuments from "@/hooks/useDocuments";
import useUploadedFiles from "@/hooks/useUploadedFiles";

import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent, useId } from "react";

import { categoriesHelper } from "./PersonalSpaceHelper";
import * as styles from "./PersonalSpacePage.styles";
import BookmarkIconSvg from "../../../../public/images/icons/bookmark.svg";
import FileIconSvg from "../../../../public/images/icons/file.svg";

import { type IGenArticle } from "@/services/graphql/__generated/sdk";

const PersonalSpacePageContent: FunctionComponent = () =>
{
  const { allCases } = useCases();
  const { allArticles } = useArticles();
  const { articlesBookmarks, casesBookmarks, questionsBookmarks } = useBookmarks(undefined);
  const { documentsInAllFolders } = useDocuments();
  const { uploadedFilesInAllFolders } = useUploadedFiles();
  const bookmarkedCases = allCases.filter(caisyCase => casesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => articlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));
  const FavCategoryId = useId();
  const MaterialsCategoryId = useId();
  const categories = categoriesHelper(
    {
      FileIconSvg,
      MaterialsCategoryId,
      slug: "materials",
      uploadedFilesLength: uploadedFilesInAllFolders.length + documentsInAllFolders.length,
    },
    {
      BookmarkIconSvg,
      FavCategoryId,
      bookmarkedCasesLength: bookmarkedCases.length + bookmarkedArticles.length + questionsBookmarks.length,
      slug: "favorites"
    }
  );
  const [selectedCategorySlug, setSelectedCategorySlug] = useQueryState("category", parseAsString.withDefault(categories?.[0]?.slug || ""));

  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <OverviewHeader
          title="Persönlicher Bereich"
          variant="red"
          categories={categories}
          selectedCategorySlug={selectedCategorySlug}
          setSelectedCategorySlug={setSelectedCategorySlug}
        />
      </div>
      {selectedCategorySlug === categories?.[0]?.slug && (
        <PersonalSpaceMaterialsTab/>
      )}
      {selectedCategorySlug === categories?.[1]?.slug && (
        <PersonalSpaceFavoriteTab/>
      )}
    </div>
  );
};

const PersonalSpacePage: FunctionComponent = () =>
{
  return (
    <UseQueryStateWrapper>
      <PersonalSpacePageContent/>
    </UseQueryStateWrapper>
  );
};

export default PersonalSpacePage;
