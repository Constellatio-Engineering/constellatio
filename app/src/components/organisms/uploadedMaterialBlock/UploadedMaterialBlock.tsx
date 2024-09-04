/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { Cross } from "@/components/Icons/Cross";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
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
  readonly selectedFolderId: string | null | undefined;
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
  const { isGetFilesLoading, uploadedFilesWithNotesInAllFolders, uploadedFilesWithNotesInSelectedFolder } = useUploadedFilesWithNotes();
  const { invalidateUploadedFiles } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutateAsync: saveFileToDatabase } = api.uploads.saveFileToDatabase.useMutation();
  const { mutateAsync: createSignedUploadUrl } = api.uploads.createSignedUploadUrl.useMutation();
  const [isUploadFormVisible, setIsUploadFormVisible] = useState<boolean>(false);

  const uploadFile = async ({ clientSideUuid, file, fileProps }: SelectedFile): Promise<void> =>
  {
    if(selectedFolderId === undefined)
    {
      console.error("Cannot upload file without selected folder");
      return;
    }

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
      <div css={styles.uploadedMaterialBlockHead} id="uploads">
        <Title order={4}>
          Hochgeladene Dateien{" "}
          <SubtitleText
            css={styles.filesCount}
            className="count"
            component="span"
            styleType="subtitle-01-medium">
            ({uploadedFilesWithNotesInSelectedFolder.length ?? 0})
          </SubtitleText>
        </Title>
        <div style={{ height: 40 }}>
          {(uploadedFilesWithNotesInSelectedFolder.length > 0 && selectedFolderId !== undefined) && (
            <Button<"button">
              styleType="secondarySimple"
              leftIcon={isUploadFormVisible ? <Cross/> : <DownloadIcon/>}
              onClick={() => setIsUploadFormVisible((isVisible) => !isVisible)}>
              {isUploadFormVisible ? "Schließen" : "Dateien hochladen"}
            </Button>
          )}
        </div>
      </div>
      <div css={styles.uploader((uploadedFilesWithNotesInSelectedFolder.length === 0 || isUploadFormVisible) && selectedFolderId !== undefined)}>
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
                Hochladen
              </Button>
            </div>
          )}
        </form>
      </div>
      <div css={styles.content}>
        {uploadedFilesWithNotesInSelectedFolder.length > 0 ? (
          <UploadedMaterialTable
            isGetUploadedFilesLoading={isGetFilesLoading}
            uploadedFiles={uploadedFilesWithNotesInSelectedFolder}
          />
        ) : uploadedFilesWithNotesInAllFolders.length > 0 ? (
          <EmptyStateCard
            variant="For-tiny-areas"
            title="Keine hochgeladenen Dateien in diesem Ordner"
            text="Hier kannst du all deine Lernmaterialien wie zum Beispiel Vorlesungsfolien, Screenshots, Scans oder Word-Dateien an einem Ort speichern und verlinken."
          />
        ) : (
          <EmptyStateCard
            variant="For-tiny-areas"
            title={selectedFolderId === undefined ? "Wähle einen Ordner aus, um deine ersten Dateien hochzuladen." : "Du hast noch keine Dateien hochgeladen"}
            text="Hier kannst du all deine Lernmaterialien wie zum Beispiel Vorlesungsfolien, Screenshots, Scans oder Word-Dateien an einem Ort speichern und verlinken."
          />
        )}
      </div>
    </div>
  );
};

export default UploadedMaterialBlock;
