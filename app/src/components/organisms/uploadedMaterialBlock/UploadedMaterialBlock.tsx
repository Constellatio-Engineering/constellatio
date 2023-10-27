/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import {
  type FileExtension, fileExtensions, type FileMimeType, fileMimeTypes
} from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useUploadedFilesWithNotes from "@/hooks/useUploadedFilesWithNotes";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type CreateSignedUploadUrlSchema, generateCreateSignedUploadUrlSchema, type UploadableFile } from "@/schemas/uploads/createSignedUploadUrl.schema";
import { type UploadState } from "@/stores/uploadsProgress.store";
import { api } from "@/utils/api";
import { getIndicesOfSucceededPromises, getRandomUuid, removeItemsByIndices } from "@/utils/utils";

import { Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { type ChangeEvent, type FormEvent, type FunctionComponent, useState } from "react";

import * as styles from "./UploadedMaterialBlock.styles";
import BadgeCard from "../badgeCard/BadgeCard";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";
import UploadedMaterialTable from "../uploadedMaterialTable/UploadedMaterialTable";

export type SelectedFile = {
  clientSideUuid: string;
  file: File;
  fileProps: UploadableFile<FileExtension, FileMimeType>;
};

type UploadedMaterialBlockProps = {
  readonly areUploadsInProgress: boolean;
  readonly fileInputRef: React.RefObject<HTMLInputElement>;
  readonly selectedFolderId: string | null;
  readonly setUploadState: (newState: UploadState) => void;
};

const UploadedMaterialBlock: FunctionComponent<UploadedMaterialBlockProps> = ({
  areUploadsInProgress,
  fileInputRef,
  selectedFolderId,
  setUploadState,
}) =>
{
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const { isLoading: isGetUploadedFilesLoading, uploadedFilesWithNotes: uploadedFiles } = useUploadedFilesWithNotes(selectedFolderId);
  const { invalidateUploadedFiles } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutateAsync: saveFileToDatabase } = api.uploads.saveFileToDatabase.useMutation();
  const { mutateAsync: createSignedUploadUrl } = api.uploads.createSignedUploadUrl.useMutation();

  const uploadFile = async ({ clientSideUuid, file, fileProps }: SelectedFile): Promise<void> =>
  {
    if(selectedFiles.length === 0) 
    {
      console.log("no files selected");
      return;
    }

    setUploadState({
      clientSideUuid,
      fileNameWithExtension: fileProps.filename,
      state: {
        progressInPercent: 0,
        type: "uploading"
      }
    });

    const { serverFilename, uploadUrl } = await createSignedUploadUrl(fileProps);

    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": fileProps.contentType },
      onUploadProgress: ({ progress = 0 }) =>
      {
        setUploadState({
          clientSideUuid,
          fileNameWithExtension: fileProps.filename,
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
      contentType: fileProps.contentType,
      fileExtensionLowercase: fileProps.fileExtensionLowercase,
      fileSizeInBytes: fileProps.fileSizeInBytes,
      folderId: selectedFolderId,
      id: clientSideUuid,
      originalFilename: fileProps.filename,
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

    const uploads: Array<Promise<void>> = selectedFiles.map(async (selectedFile) =>
    {
      try
      {
        await uploadFile(selectedFile);
        await invalidateUploadedFiles();
      }
      catch (e: unknown)
      {
        console.log("error while uploading file", e);
        setUploadState({
          clientSideUuid: selectedFile.clientSideUuid,
          fileNameWithExtension: selectedFile.fileProps.filename,
          state: { type: "failed" }
        });
        return Promise.reject(e);
      }
    });
    const uploadResults = await Promise.allSettled(uploads);
    const indicesOfSuccessfulUploads = getIndicesOfSucceededPromises(uploadResults);
    const newSelectedFiles = removeItemsByIndices<SelectedFile>(selectedFiles, indicesOfSuccessfulUploads);
    setSelectedFiles(newSelectedFiles);
  };

  const onFilesSelected = (e: ChangeEvent<HTMLInputElement>): void =>
  {
    const selectedFiles: File[] = Array.from(e.target.files ?? []);
    const invalidFiles: File[] = [];
    let validFiles: SelectedFile[] = [];

    selectedFiles.forEach(file =>
    {
      const fileProps: CreateSignedUploadUrlSchema = {
        contentType: file.type,
        fileSizeInBytes: file.size,
        filename: file.name
      };

      const parsedFileProps = generateCreateSignedUploadUrlSchema(fileExtensions, fileMimeTypes).safeParse(fileProps);

      if(parsedFileProps.success)
      {
        validFiles.push({
          clientSideUuid: getRandomUuid(),
          file,
          fileProps: parsedFileProps.data
        });
      }
      else
      {
        invalidFiles.push(file);
      }
    });

    if(invalidFiles.length > 0)
    {
      notifications.show({
        autoClose: false,
        color: "red",
        message: `Die folgenden Dateien konnten nicht hochgeladen werden, da sie zu groß sind oder ein ungültiges Format haben: ${invalidFiles.map(file => file.name).join(", ")}`,
        title: "Ungültige Dateien"
      });
    }

    if(validFiles.length > 10)
    {
      validFiles = validFiles.slice(0, 10);
      notifications.show({
        autoClose: false,
        color: "red",
        message: "Du kannst maximal 10 Dateien gleichzeitig hochladen.",
        title: "Zu viele Dateien"
      });
    }

    setSelectedFiles(validFiles);
  };

  return (
    <div css={styles.wrapper}>
      <div css={styles.uploadedMaterialBlockHead}>
        <Title order={4}>
          Uploaded materials{" "}
          <SubtitleText className="count" component="span" styleType="subtitle-01-medium">
            ({uploadedFiles.length ?? 0})
          </SubtitleText>
        </Title>
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
            accept={fileExtensions.map(ext => `.${ext}`).join(", ")}
            onChange={onFilesSelected}
          />
          {selectedFiles.length > 0 && (
            <div className="uploadBtn">
              <Button<"button">
                styleType="primary"
                disabled={areUploadsInProgress}
                type="submit">
                Upload
              </Button>
            </div>
          )}
        </form>
      </div>
      <div css={styles.content}>
        {uploadedFiles?.length > 0 ? (
          <UploadedMaterialTable
            isGetUploadedFilesLoading={isGetUploadedFilesLoading}
            uploadedFiles={uploadedFiles}
            selectedFolderId={selectedFolderId}
          />
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
