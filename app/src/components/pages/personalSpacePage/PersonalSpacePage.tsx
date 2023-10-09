import OverviewHeader, { slugFormatter } from "@/components/organisms/OverviewHeader/OverviewHeader";
import PersonalSpaceFavoriteTab from "@/components/organisms/personalSpaceFavoriteTab/PersonalSpaceFavoriteTab";
import PersonalSpaceMaterialsTab from "@/components/organisms/personalSpaceMaterialsTab/PersonalSpaceMaterialsTab";
import useArticles from "@/hooks/useArticles";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useDocuments from "@/hooks/useDocuments";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import { type IGenArticle, type IGenMainCategory } from "@/services/graphql/__generated/sdk";
import useMaterialsStore from "@/stores/materials.store";

import { useRouter } from "next/router";
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
  // const { folders = [] } = useUploadFolders();
  const { allCases = [] } = useCases();
  const { allArticles = [] } = useArticles(); 
  const { bookmarks } = useBookmarks(undefined);
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);
  const { documents } = useDocuments(selectedFolderId);
  const { uploadedFiles } = useUploadedFiles(selectedFolderId);

  // const allItemsInMaterialsTab = [];
  // for(const folder of folders)
  // {
  //   const { documents } = useDocuments(folder.id);
  //   allItemsInMaterialsTab.push(...documents);
  // }

  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const allArticlesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "article") ?? [];
  const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => allArticlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));
  const FavCategoryId = useId();
  const MaterialsCategoryId = useId();
  const categories = categoriesHelper({
    BookmarkIconSvg,
    FavCategoryId,
    bookmarkedCasesLength: (bookmarkedCases?.length + bookmarkedArticles?.length) ?? 0
  }, {
    FileIconSvg,
    MaterialsCategoryId,
    uploadedFilesLength: (uploadedFiles?.length + documents?.length) ?? 0,
  });
  const [selectedCategory, setSelectedCategory] = useState<IGenMainCategory | undefined>(categories?.[0]);
  const isFavoriteTab = (id: string): boolean => id === categories?.[0]?.id;
  const router = useRouter();
  React.useEffect(() => 
  {
    if(router.query.q)
    {
      setSelectedCategory(categories.filter((x) => slugFormatter(x.mainCategory ?? "") === router.query.q)?.[0] ?? categories?.[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q]);

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
          <PersonalSpaceMaterialsTab/>
      }
    </div>
  );
};
export default PersonalSpacePage;
