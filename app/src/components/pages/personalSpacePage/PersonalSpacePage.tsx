/* eslint-disable max-lines */
import { Svg } from "@/basic-components/SVG/Svg";
import { Button } from "@/components/atoms/Button/Button";
import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import FavoriteCasesList from "@/components/organisms/favoriteCasesList/FavoriteCasesList";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import PersonalSpaceNavBar from "@/components/organisms/personalSpaceNavBar/PersonalSpaceNavBar";
import DummyFileViewer from "@/components/pages/personalSpacePage/dummyFileViewer/DummyFileViewer";
import { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import { type IGenArticleOverviewFragment, IGenCase, type IGenFullCaseFragment, type IGenMainCategory } from "@/services/graphql/__generated/sdk";
import uploadsProgressStore from "@/stores/uploadsProgress.store";
import { api } from "@/utils/api";
import { getRandomUuid, removeItemsByIndices } from "@/utils/utils";

import { Container, Loader, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import Link from "next/link";
import React, { type FormEvent, type FunctionComponent, useState } from "react";

// import { isFloat32Array } from "util/types";

import * as styles from "./PersonalSpacePage.styles";
import BookmarkIconSvg from "../../../../public/images/icons/bookmark.svg";
import FileIconSvg from "../../../../public/images/icons/file.svg";

type FileWithClientSideUuid = {
  clientSideUuid: string;
  file: File;
};

const PersonalSpacePage: FunctionComponent = () =>
{
  const apiContext = api.useContext();
  const { data: allCases = [], isLoading: areCasesLoading } = api.caisy.getAllCases.useQuery();
  const { data: bookmarks = [], isLoading: areBookmarksLoading } = api.bookmarks.getAllBookmarks.useQuery();
  const { data: uploadedFiles = [], isLoading: isGetUploadedFilesLoading } = api.uploads.getUploadedFiles.useQuery();
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  // const bookmarkedCasesSubcategories = bookmarkedCases.map(bookmarkedCase => bookmarkedCase.subCategoryField);
  const mainCategoriesInBookmarkedCases = bookmarkedCases.map(bookmarkedCase => bookmarkedCase?.subCategoryField?.[0]?.mainCategory?.[0]);
  const bookmarkedCasesMainCategoriesUnique = mainCategoriesInBookmarkedCases.reduce<IGenMainCategory[]>((acc, current) => 
  {
    if(current !== null && current !== undefined) 
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

  const { mutate: removeBookmark } = api.bookmarks.removeBookmark.useMutation({
    onError: e => console.log("error while removing bookmark:", e),
    onSuccess: async () => apiContext.bookmarks.getAllBookmarks.invalidate(),
  });

  const categories: ICasesOverviewProps["allMainCategories"] = [{
    __typename: "MainCategory",
    casesPerCategory: bookmarkedCases?.length ?? 0,
    icon: {
      src: BookmarkIconSvg.src,
      title: "bookmark-icon"
    },
    id: "0",
    mainCategory: "Favourites"
  }, {
    __typename: "MainCategory",
    casesPerCategory: 999,
    icon: {
      src: FileIconSvg.src,
      title: "file-category-icon"
    },
    id: "1",
    mainCategory: "Materials"
  }];

  const [selectedCategoryId, setSelectedCategoryId] = useState<IGenMainCategory["id"]>(categories?.[0]?.id as IGenMainCategory["id"]);
  const { mutateAsync: createSignedUploadUrl } = api.uploads.createSignedUploadUrl.useMutation();
  const { mutateAsync: saveFileToDatabase } = api.uploads.saveFileToDatabase.useMutation();

  // Function To Delete a Bookmarked Case with the Case Id
  const openDeleteBookmark = (caseId: string): void =>
  {
    modals.openConfirmModal({
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this case from your favorites?
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: { cancel: "No don't delete it", confirm: "Delete bookmark" },
      onConfirm: () => removeBookmark({ resourceId: caseId, resourceType: "case" }),
      title: "Remove from favorites",
    });
  };

  const uploadFile = async (file: File, clientSideUuid: string): Promise<void> =>
  {
    if(selectedFiles.length === 0)
    {
      console.log("no files selected");
      return;
    }

    const originalFileName = file.name;

    console.log("uploading file '", `${originalFileName}'...`);

    setUploadState(clientSideUuid, {
      progressInPercent: 0,
      type: "uploading"
    });

    const { filename, uploadUrl } = await createSignedUploadUrl({
      contentType: file.type,
      fileSizeInBytes: file.size,
      filename: originalFileName,
    });

    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": file.type },
      onUploadProgress: ({ progress = 0 }) =>
      {
        setUploadState(clientSideUuid, progress === 1 ? {
          type: "completed"
        } : {
          progressInPercent: progress * 100,
          type: "uploading"
        });
      }
    });

    await saveFileToDatabase({
      clientSideUuid,
      fileSizeInBytes: file.size,
      filename,
      originalFilename: originalFileName
    });

    console.log("file uploaded successfully");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> =>
  {
    e.preventDefault();

    if(fileInputRef.current)
    {
      fileInputRef.current.value = "";
    }

    const uploads: Array<Promise<void>> = selectedFiles.map(async ({ clientSideUuid, file }) =>
    {
      try
      {
        await uploadFile(file, clientSideUuid);
        await apiContext.uploads.getUploadedFiles.invalidate();
      }
      catch (e: unknown)
      {
        console.log("error while uploading file", e);
        setUploadState(clientSideUuid, { type: "failed" });
        return Promise.reject(e);
      }
    });

    const uploadResults = await Promise.allSettled(uploads);

    const indicesOfSuccessfulUploads: number[] = [];

    uploadResults.forEach((result, index) =>
    {
      if(result.status === "fulfilled")
      {
        indicesOfSuccessfulUploads.push(index);
      }
    });

    const newSelectedFiles = removeItemsByIndices<FileWithClientSideUuid>(selectedFiles, indicesOfSuccessfulUploads);
    setSelectedFiles(newSelectedFiles);
  };

  const isFlavoriteTab = (id: string): boolean => 
  {
    if(id === categories?.[0]?.id) { return true; }
    return false;
  };

  const areUploadsInProgress = uploads.some(u => u.state.type === "uploading");
  
  const favoriteCategoryNavTabs = [{ id: "0", itemsPerTab: bookmarkedCases?.length ?? 0, title: "CASES" }, { id: "1", itemsPerTab: 999, title: "DICTIONARY" }, { id: "2", itemsPerTab: 999, title: "FORUM" }, { id: "3", itemsPerTab: 999, title: "HIGHLIGHTS" }];
  const [selectedTabId, setSelectedTabId] = useState<string>(favoriteCategoryNavTabs?.[0]?.id as string);

  // FUNCTION RETURNING ALL CASES USING THEIR SUBCATEGORY WITH THE SUBCATEGORY ID
  // const casesBySubcategoryId = (id: string) => 
  // {
  //   return bookmarkedCases.filter(bookmarkedCase => bookmarkedCase.subCategoryField?.[0]?.id === id);
  // };

  const casesByMainCategory = (id: string): Array<({ _typename?: "Case" | undefined } & IGenFullCaseFragment) | null | undefined> | IGenArticleOverviewFragment[] | undefined =>
  {
    const cases = bookmarkedCases?.filter(bookmarkedCase => bookmarkedCase.subCategoryField?.[0]?.mainCategory?.[0]?.id === id);
    return cases;
  };

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
      {isFlavoriteTab(selectedCategoryId ?? "") && <PersonalSpaceNavBar setSelectedTabId={setSelectedTabId} selectedTabId={selectedTabId} tabs={favoriteCategoryNavTabs}/>}
      {isFlavoriteTab(selectedCategoryId ?? "") ? (selectedTabId === "0" ? (
        <> 
          {(areBookmarksLoading || areCasesLoading) ? (
            <Loader sx={{ margin: "50px" }}/>
          ) : (
            bookmarkedCases?.length > 0 ? (
              <FavoriteCasesList 
                bookmarkedCasesMainCategoriesUnique={bookmarkedCasesMainCategoriesUnique} 
                casesByMainCategory={casesByMainCategory}
              />
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
      ) : (
        <>
          <div style={{ alignItems: "center", display: "flex", marginTop: 100 }}>
            <h2 style={{ fontSize: 22, marginRight: 10 }}>Test signed upload url</h2>
          </div>
          <form onSubmit={onSubmit}>
            Select File:{" "}
            <input
              ref={fileInputRef}
              type="file"
              disabled={areUploadsInProgress}
              multiple
              onChange={e =>
              {
                const files = Array.from(e.target.files ?? []);
                const filesWithUuid: FileWithClientSideUuid[] = files.map(file => ({ clientSideUuid: getRandomUuid(), file }));
                setSelectedFiles(filesWithUuid);
              }}
            />
            <Button<"button">
              styleType="primary"
              disabled={selectedFiles.length === 0 || areUploadsInProgress}
              type="submit">
              Upload
            </Button>
          </form>
          Selected Files:
          {selectedFiles.map(({ clientSideUuid, file }) => (
            <p key={clientSideUuid}>{file.name}</p>
          ))}
          <h2 style={{ fontSize: 22, marginRight: 10, marginTop: 100 }}>Current Uploads</h2>
          {uploads.filter(u => u.state.type !== "completed").map((upload, index) =>
          {
            return (
              <div key={index} style={{ margin: "10px 0" }}>
                <strong>File Client Side UUID: {upload.fileClientSideUuid}</strong>
                {upload.state.type === "uploading" ? (
                  <div
                    style={{
                      border: "1px solid black",
                      height: 30,
                      width: 200,
                    }}>
                    <div style={{ backgroundColor: "red", height: "100%", width: `${upload.state.progressInPercent}%` }}/>
                  </div>
                ) : (
                  <p>{upload.state.type}</p>
                )}
              </div>
            );
          })}
          <h2 style={{ fontSize: 22, marginRight: 10, marginTop: 100 }}>Uploaded Files</h2>
          {isGetUploadedFilesLoading && <p>Loading...</p>}
          {uploadedFiles.slice(0, 5).map(file =>
          {
            const uploadedDate = file.createdAt?.toLocaleDateString();
            const uploadedTime = file.createdAt?.toLocaleTimeString();

            return (
              <div key={file.id} style={{ cursor: "pointer", margin: "10px 0" }} onClick={() => setSelectedFileIdForPreview(file.uuid)}>
                <strong>{file.originalFilename}.{file.fileExtension}</strong>
                <p>Uploaded: {uploadedDate} {uploadedTime}</p>
                <p>FileId: {file.id}</p>
                <p>File UUID: {file.uuid}</p>
                <p>File client side UUID: {file.clientSideUuid}</p>
              </div>
            );
          })}
          {uploadedFiles.length > 5 && (
            <p>{uploadedFiles.length - 5} more files...</p>
          )}
          {selectedFileIdForPreview && (
            <DummyFileViewer fileId={selectedFileIdForPreview}/>
          )}
        </>
      )) : (
        <div>Category Id: {selectedCategoryId} - MATERIALS</div>
      )}
      
    </div>
  );
};

export default PersonalSpacePage;
