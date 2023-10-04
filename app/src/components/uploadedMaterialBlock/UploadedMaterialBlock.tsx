import { type UploadedFile } from "@/db/schema";
import { type UploadState } from "@/stores/uploadsProgress.store";
import { api } from "@/utils/api";
import { getRandomUuid, removeItemsByIndices } from "@/utils/utils";

import { Title } from "@mantine/core";
import axios from "axios";
import React, { type FormEvent, type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialBlock.styles";
import { Button } from "../atoms/Button/Button";
import BadgeCard from "../organisms/badgeCard/BadgeCard";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";
import { type FileWithClientSideUuid } from "../pages/personalSpacePage/PersonalSpacePage";
import UploadedMaterialTable from "../uploadedMaterialTable/UploadedMaterialTable";

type UploadedMaterialBlockProps = {
  readonly areUploadsInProgress: boolean;
  readonly fileInputRef: React.RefObject<HTMLInputElement>;
  readonly isGetUploadedFilesLoading: boolean;
  readonly selectedFiles: FileWithClientSideUuid[];
  readonly selectedFolderId: string | null;
  readonly setSelectedFileIdForPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly setSelectedFiles: React.Dispatch<React.SetStateAction<FileWithClientSideUuid[]>>;
  readonly setShowFileViewerModal: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setUploadState: (newState: UploadState) => void;
  readonly uploadedFiles: UploadedFile[];
};

const UploadedMaterialBlock: FunctionComponent<UploadedMaterialBlockProps> = ({
  areUploadsInProgress,
  fileInputRef,
  selectedFiles,
  selectedFolderId,
  setSelectedFiles,
  setUploadState,
  uploadedFiles,
  ...props
}) => 
{
  const { mutateAsync: saveFileToDatabase } = api.uploads.saveFileToDatabase.useMutation();
  const apiContext = api.useContext();
  const { mutateAsync: createSignedUploadUrl } = api.uploads.createSignedUploadUrl.useMutation();
  const uploadFile = async (file: File, clientSideUuid: string): Promise<void> =>
  {
    if(selectedFiles.length === 0)
    {
      console.log("no files selected");
      return;
    }
    const originalFileName = file.name;

    setUploadState({
      clientSideUuid,
      fileNameWithExtension: originalFileName,
      state: {
        progressInPercent: 0,
        type: "uploading"
      }
    });
    const { serverFilename, uploadUrl } = await createSignedUploadUrl({
      contentType: file.type,
      fileSizeInBytes: file.size,
      filename: originalFileName,
    });
    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": file.type },
      onUploadProgress: ({ progress = 0 }) =>
      {
        setUploadState({
          clientSideUuid,
          fileNameWithExtension: originalFileName,
          state: progress === 1 ? {
            type: "completed"
          } : {
            progressInPercent: progress * 100,
            type: "uploading"
          }
        });
      }
    });
    await saveFileToDatabase({
      fileSizeInBytes: file.size,
      folderId: selectedFolderId,
      id: clientSideUuid,
      originalFilename: originalFileName,
      serverFilename
    });
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
        setUploadState({
          clientSideUuid,
          fileNameWithExtension: file.name,
          state: { type: "failed" }
        });
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
  return (
    <div css={styles.wrapper}>
      <div css={styles.uploadedMaterialBlockHead}>
        <Title order={4}>Uploaded materials <span>({uploadedFiles.length ?? 0})</span></Title>
      </div>
      <div css={styles.uploader}>
        <form
          onSubmit={onSubmit}
          css={styles.badge}>
          <BadgeCard selectedFiles={selectedFiles}/>
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
          <div className="uploadBtn">
            <Button<"button">
              styleType="primary"
              disabled={selectedFiles.length === 0 || areUploadsInProgress}
              type="submit">
              Upload
            </Button>
          </div>
        </form>
      </div>
      <div css={styles.content}>
        {uploadedFiles?.length > 0 ? (
          <UploadedMaterialTable uploadedFiles={uploadedFiles} {...props}/>
        ) : (
          <EmptyStateCard
            variant="For-small-areas"
            title="You haven’t uploaded any materials yet"
            text="You can upload different materials to keep important files at one place "
          />
        )}
      </div>
    </div>
  );
};

export default UploadedMaterialBlock;
