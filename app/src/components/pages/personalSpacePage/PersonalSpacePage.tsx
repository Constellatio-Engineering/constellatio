import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import PersonalSpaceFavoriteTab from "@/components/organisms/personalSpaceFavoriteTab/PersonalSpaceFavoriteTab";
import PersonalSpaceMaterialsTab from "@/components/organisms/personalSpaceMaterialsTab/PersonalSpaceMaterialsTab";
import useArticles from "@/hooks/useArticles";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useDocuments from "@/hooks/useDocuments";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import { type IGenArticle } from "@/services/graphql/__generated/sdk";
import useMaterialsStore from "@/stores/materials.store";

import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent, useId } from "react";

import { categoriesHelper } from "./PersonalSpaceHelper";
import * as styles from "./PersonalSpacePage.styles";
import BookmarkIconSvg from "../../../../public/images/icons/bookmark.svg";
import FileIconSvg from "../../../../public/images/icons/file.svg";

const PersonalSpacePage: FunctionComponent = () =>
{
  const { allCases = [] } = useCases();
  const { allArticles = [] } = useArticles(); 
  const { bookmarks } = useBookmarks(undefined);
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);
  const { documents } = useDocuments(selectedFolderId);
  const { uploadedFiles } = useUploadedFiles(selectedFolderId);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const allArticlesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "article") ?? [];
  const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => allArticlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));
  const FavCategoryId = useId();
  const MaterialsCategoryId = useId();
  const categories = categoriesHelper({
    BookmarkIconSvg,
    FavCategoryId,
    bookmarkedCasesLength: (bookmarkedCases?.length + bookmarkedArticles?.length) ?? 0,
    slug: "favorites"
  }, {
    FileIconSvg,
    MaterialsCategoryId,
    slug: "materials",
    uploadedFilesLength: (uploadedFiles?.length + documents?.length) ?? 0,
  });
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
      {selectedCategorySlug === categories?.[0]?.slug && <PersonalSpaceFavoriteTab/>}
      {selectedCategorySlug === categories?.[1]?.slug && <PersonalSpaceMaterialsTab/>}
    </div>
  );
};
export default PersonalSpacePage;
