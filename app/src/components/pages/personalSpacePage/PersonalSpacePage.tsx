/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import DummyFileViewer from "@/components/pages/personalSpacePage/dummyFileViewer/DummyFileViewer";
import uploadsProgressStore from "@/stores/uploadsProgress.store";
import { api } from "@/utils/api";
import { getRandomUuid, removeItemsByIndices } from "@/utils/utils";

import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import React, { type FormEvent, type FunctionComponent, useState } from "react";

import * as styles from "./PersonalSpacePage.styles";

type FileWithClientSideUuid = {
  clientSideUuid: string;
  file: File;
};

const PersonalSpacePage: FunctionComponent = () =>
{
  const ctx = api.useContext();
  const { data: allCases = [], isLoading: areCasesLoading } = api.caisy.getAllCases.useQuery();
  const { data: bookmarks = [], isLoading: areBookmarksLoading } = api.bookmarks.getAllBookmarks.useQuery();
  const { data: uploadedFiles = [], isLoading: isGetUploadedFilesLoading } = api.uploads.getUploadedFiles.useQuery();
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { setUploadState, uploads } = uploadsProgressStore();
  const [selectedFiles, setSelectedFiles] = useState<FileWithClientSideUuid[]>([]);
  const [selectedFileIdForPreview, setSelectedFileIdForPreview] = useState<string>();

  const { mutate: removeBookmark } = api.bookmarks.removeBookmark.useMutation({
    onError: e => console.log("error while removing bookmark:", e),
    onSuccess: async () => ctx.bookmarks.getAllBookmarks.invalidate(),
  });

  const { mutateAsync: createSignedUploadUrl } = api.uploads.createSignedUploadUrl.useMutation();
  const { mutateAsync: saveFileToDatabase } = api.uploads.saveFileToDatabase.useMutation();

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
        await ctx.uploads.getUploadedFiles.invalidate();
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

  const areUploadsInProgress = uploads.some(u => u.state.type === "uploading");

  return (
    <div css={styles.wrapper}>
      <h1 style={{ fontSize: 40, marginBottom: 30 }}>Personal Space</h1>
      <p style={{ fontSize: 26, marginBottom: 10 }}><strong>Your bookmarked cases:</strong></p>
      {(areBookmarksLoading || areCasesLoading) ? (
        <p>Loading...</p>
      ) : (
        bookmarkedCases.map(bookmarkedCase => (
          <div key={bookmarkedCase.id} style={{ margin: "20 0" }}>
            <p style={{ fontSize: 20 }}>Case {bookmarkedCase.title}</p>
            <Button<"button">
              styleType="primary"
              onClick={() => openDeleteBookmark(bookmarkedCase.id!)}>
              Remove bookmark
            </Button>
          </div>
        ))
      )}
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
    </div>
  );
};

export default PersonalSpacePage;