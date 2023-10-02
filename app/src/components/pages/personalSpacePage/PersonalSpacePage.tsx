import FileViewer from "@/components/fileViewer/FileViewer";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import FavoriteCasesList from "@/components/organisms/favoriteCasesList/FavoriteCasesList";
import FileUploadMenu from "@/components/organisms/fileUploadMenu/FileUploadMenu";
import MaterialMenu from "@/components/organisms/materialMenu/MaterialMenu";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import PersonalSpaceNavBar from "@/components/organisms/personalSpaceNavBar/PersonalSpaceNavBar";
import PapersBlock from "@/components/papersBlock/PapersBlock";
import UploadedMaterialBlock from "@/components/uploadedMaterialBlock/UploadedMaterialBlock";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useDocuments from "@/hooks/useDocuments";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import useUploadFolders from "@/hooks/useUploadFolders";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment, type IGenMainCategory } from "@/services/graphql/__generated/sdk";
import uploadsProgressStore from "@/stores/uploadsProgress.store";

import { Container, Loader } from "@mantine/core";
import Link from "next/link";
import React, { type FunctionComponent, useState, useId, useEffect } from "react";

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
  const { allCases = [], isLoading: areCasesLoading } = useCases();
  const { bookmarks, isLoading: areBookmarksLoading } = useBookmarks(undefined);
  const { folders = [] } = useUploadFolders();
  const { isLoading: isGetUploadedFilesLoading, uploadedFiles } = useUploadedFiles(selectedFolderId);
  const { documents, isLoading: isGetDocumentsLoading, isRefetching: isRefetchingDocuments } = useDocuments(selectedFolderId);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const mainCategoriesInBookmarkedCases = bookmarkedCases.map(bookmarkedCase => bookmarkedCase?.subCategoryField?.[0]?.mainCategory?.[0]);
  const bookmarkedCasesMainCategoriesUnique = mainCategoriesInBookmarkedCases.reduce<IGenMainCategory[]>((acc, current) => 
  {
    if(current != null)
    {
      const x = acc.find((item: IGenMainCategory) => item.mainCategory === current.mainCategory);
      if(!x) 
      {
        return acc.concat([current]);
      }
    }
    return acc;
  }, []);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { setUploadState, uploads } = uploadsProgressStore();
  const [selectedFiles, setSelectedFiles] = useState<FileWithClientSideUuid[]>([]);
  const [selectedFileIdForPreview, setSelectedFileIdForPreview] = useState<string>();
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<IGenMainCategory["id"]>(categories?.[1]?.id as IGenMainCategory["id"]);
  const FavCasesTabId = useId();
  const FavDictionaryTabId = useId();
  const FavForumsTabId = useId();
  const FavHighlightsTabId = useId();
  const isFavoriteTab = (id: string): boolean => id === categories?.[0]?.id;
  const areUploadsInProgress = uploads.some(u => u.state.type === "uploading");
  const favoriteCategoryNavTabs = [{ id: FavCasesTabId, itemsPerTab: bookmarkedCases?.length ?? 0, title: "CASES" }, { id: FavDictionaryTabId, itemsPerTab: 999, title: "DICTIONARY" }, { id: FavForumsTabId, itemsPerTab: 999, title: "FORUM" }, { id: FavHighlightsTabId, itemsPerTab: 999, title: "HIGHLIGHTS" }];
  const [selectedTabId, setSelectedTabId] = useState<string>(favoriteCategoryNavTabs?.[0]?.id as string);
  const casesByMainCategory = (id: string): Array<({ _typename?: "Case" | undefined } & IGenFullCaseFragment) | null | undefined> | IGenArticleOverviewFragment[] | undefined => bookmarkedCases?.filter(bookmarkedCase => bookmarkedCase.subCategoryField?.[0]?.mainCategory?.[0]?.id === id);
  const [showFileViewerModal, setShowFileViewerModal] = useState<boolean>(false);

  useEffect(() =>
  {
    if(selectedFileIdForPreview) { setShowFileViewerModal(true); }
    if(!selectedFileIdForPreview) { setShowFileViewerModal(false); }
  }, [selectedFileIdForPreview]);

  console.log("isLoading", isGetDocumentsLoading);
  console.log("isRefetching", isRefetchingDocuments);

  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <OverviewHeader
          title="Personal Space"
          variant="red"
          categories={categories}
          selectedCategoryId={selectedCategoryId ?? ""}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </div>
      {isFavoriteTab(selectedCategoryId ?? "") && <PersonalSpaceNavBar setSelectedTabId={setSelectedTabId} selectedTabId={selectedTabId} tabs={favoriteCategoryNavTabs}/>}
      <Container maw={1440}>
        {isFavoriteTab(selectedCategoryId ?? "") ? (selectedTabId === FavCasesTabId ? (
          <> 
            {(areBookmarksLoading || areCasesLoading) ? (
              <Loader sx={{ margin: "50px" }}/>
            ) : (
              bookmarkedCases?.length > 0 ? (
                <>  
                  <FavoriteCasesList 
                    bookmarkedCasesMainCategoriesUnique={bookmarkedCasesMainCategoriesUnique} 
                    casesByMainCategory={casesByMainCategory}
                  />
                </>
              ) : (
                <EmptyStateCard
                  button={<Link href="/cases">Explore Cases</Link>}
                  title="You haven’t saved any cases yet"
                  text="You can save cases, dictionary articles, forum questions and highlighted text to Favourites"
                  variant="For-large-areas"
                />
              )
            )}
        
          </>
        ) : selectedTabId === FavDictionaryTabId ? (
          <>
            <EmptyStateCard
              button={<Link href="/dictionary">Explore Articles</Link>}
              title="You haven’t saved any Articles yet"
              text="You can save cases, dictionary articles, forum questions and highlighted text to Favourites"
              variant="For-large-areas"
            />
          </>
        ) : selectedTabId === FavForumsTabId ? (
          <>
            <EmptyStateCard
              title="You haven’t saved any Forums yet"
              text="You can save cases, dictionary articles, forum questions and highlighted text to Favourites"
              variant="For-large-areas"
            />
          </>
        ) : selectedTabId === FavHighlightsTabId && (
          <>
            <EmptyStateCard
              title="You haven’t saved any Highlights yet"
              text="You can save cases, dictionary articles, forum questions and highlighted text to Favourites"
              variant="For-large-areas"
            />
          </>
        )) : (
          <>
            <div style={{
              alignItems: "flex-start", display: "flex", gap: "32px", justifyContent: "space-between", marginTop: "40px",
            }}>
              <MaterialMenu
                selectedFolderId={selectedFolderId}
                setSelectedFolderId={setSelectedFolderId}
                folders={folders}
              />
              <div style={{ flex: 1, maxWidth: "75%" }}>
                <PapersBlock docs={documents} selectedFolderId={selectedFolderId} isLoading={isGetDocumentsLoading}/>
                <UploadedMaterialBlock
                  areUploadsInProgress={areUploadsInProgress}
                  fileInputRef={fileInputRef}
                  isGetUploadedFilesLoading={isGetUploadedFilesLoading}
                  setUploadState={setUploadState}
                  selectedFiles={selectedFiles}
                  setSelectedFileIdForPreview={setSelectedFileIdForPreview}
                  setSelectedFiles={setSelectedFiles}
                  uploadedFiles={uploadedFiles}
                  selectedFolderId={selectedFolderId}
                />
                <FileUploadMenu uploads={uploads}/>
                {selectedFileIdForPreview && <FileViewer fileId={selectedFileIdForPreview} showFileViewerModal={showFileViewerModal}/>}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default PersonalSpacePage;
