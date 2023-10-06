import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import PersonalSpaceFavoriteTab from "@/components/organisms/personalSpaceFavoriteTab/PersonalSpaceFavoriteTab";
import PersonalSpaceMaterialsTab from "@/components/organisms/personalSpaceMaterialsTab/PersonalSpaceMaterialsTab";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import { type IGenMainCategory } from "@/services/graphql/__generated/sdk";

import React, { type FunctionComponent, useState, useId } from "react";

import { categoriesHelper } from "./PersonalSpaceHelper";
import * as styles from "./PersonalSpacePage.styles";
import BookmarkIconSvg from "../../../../public/images/icons/bookmark.svg";
import FileIconSvg from "../../../../public/images/icons/file.svg";

export type FileWithClientSideUuid = {
  clientSideUuid: string;
  file: File;
};

const PersonalSpacePage: FunctionComponent = () =>
{
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const { allCases = [] } = useCases();
  const { bookmarks } = useBookmarks(undefined);
  const { uploadedFiles } = useUploadedFiles(selectedFolderId);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const FavCategoryId = useId();
  const MaterialsCategoryId = useId();
  const categories = categoriesHelper({
    BookmarkIconSvg,
    FavCategoryId,
    bookmarkedCasesLength: bookmarkedCases?.length ?? 0
  }, {
    FileIconSvg,
    MaterialsCategoryId,
    uploadedFilesLength: uploadedFiles?.length ?? 0,
  });
  const [selectedCategory, setSelectedCategory] = useState<IGenMainCategory | undefined>(categories?.[0]);
  const isFavoriteTab = (id: string): boolean => id === categories?.[0]?.id;
  const PersonalSpaceMaterialsTabProps = {
    selectedFolderId, setSelectedFolderId
  };

  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <OverviewHeader
          title="Personal Space"
          variant="red"
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      {  
        isFavoriteTab(selectedCategory?.id ?? "") ?
          <PersonalSpaceFavoriteTab/>
          : 
          <PersonalSpaceMaterialsTab {...PersonalSpaceMaterialsTabProps}/>
      }
    </div>
  );
};
export default PersonalSpacePage;
