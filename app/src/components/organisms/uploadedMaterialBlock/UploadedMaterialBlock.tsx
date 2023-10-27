/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { type SelectedFile } from "@/components/pages/personalSpacePage/PersonalSpacePage";
import { fileExtensions } from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useUploadedFilesWithNotes from "@/hooks/useUploadedFilesWithNotes";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type CreateSignedUploadUrlSchema, createSignedUploadUrlSchema, type UploadableFile } from "@/schemas/uploads/createSignedUploadUrl.schema";
import { type UploadState } from "@/stores/uploadsProgress.store";
import { api } from "@/utils/api";
import { getFileExtensionLowercase } from "@/utils/files";
import { getIndicesOfSucceededPromises, getRandomUuid, removeItemsByIndices } from "@/utils/utils";

import { Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { type ChangeEvent, type FormEvent, type FunctionComponent, useState } from "react";

import * as styles from "./UploadedMaterialBlock.styles";
import BadgeCard from "../badgeCard/BadgeCard";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";
import UploadedMaterialTable from "../uploadedMaterialTable/UploadedMaterialTable";

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

  const uploadFile = async (file: UploadableFile, clientSideUuid: string): Promise<void> =>
  {
    if(selectedFiles.length === 0)
    {
      console.log("no files selected");
      return;
    }

    const originalFileName = file.filename;

    setUploadState({
      clientSideUuid,
      fileNameWithExtension: originalFileName,
      state: {
        progressInPercent: 0,
        type: "uploading"
      }
    });

    const { serverFilename, uploadUrl } = await createSignedUploadUrl(file);

    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": file.contentType },
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
      contentType: file.contentType,
      fileExtensionLowercase: file.fileExtensionLowercase,
      fileSizeInBytes: file.fileSizeInBytes,
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
        await invalidateUploadedFiles();
      }
      catch (e: unknown)
      {
        console.log("error while uploading file", e);
        setUploadState({
          clientSideUuid,
          fileNameWithExtension: file.filename,
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
    const files: CreateSignedUploadUrlSchema[] = Array.from(e.target.files ?? []).map(file => ({
      contentType: file.type,
      fileExtensionLowercase: getFileExtensionLowercase(file.name),
      fileSizeInBytes: file.size,
      filename: file.name
    }));

    const invalidFiles: CreateSignedUploadUrlSchema[] = [];
    let validFiles: UploadableFile[] = [];

    files.forEach(file =>
    {
      const parseIsValidFile = createSignedUploadUrlSchema.safeParse(file);

      if(parseIsValidFile.success)
      {
        validFiles.push(parseIsValidFile.data);
      }
      else
      {
        invalidFiles.push(file);
      }
    });

    if(invalidFiles.length > 0)
    {
      notifications.show({
        color: "red",
        message: "Die folgenden Dateien konnten nicht hochgeladen werden, da sie zu groß sind oder ein ungültiges Format haben: " + invalidFiles.map(file => file.filename).join(", "),
        title: "Ungültige Dateien"
      });
    }

    if(validFiles.length > 10)
    {
      validFiles = validFiles.slice(0, 10);
      notifications.show({
        color: "red",
        message: "Du kannst maximal 10 Dateien gleichzeitig hochladen.",
        title: "Zu viele Dateien"
      });
    }

    const filesWithUuid: SelectedFile[] = validFiles
      .map(file => ({
        clientSideUuid: getRandomUuid(),
        file
      }));

    setSelectedFiles(filesWithUuid);
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
            accept={fileExtensions.join(", ")}
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
