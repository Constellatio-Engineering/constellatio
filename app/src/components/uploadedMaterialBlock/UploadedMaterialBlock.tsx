/* eslint-disable react/jsx-newline */
import { getRandomUuid } from "@/utils/utils";

import { Title } from "@mantine/core";
import React, { type FormEvent, type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialBlock.styles";
import { Button } from "../atoms/Button/Button";
import BadgeCard from "../organisms/badgeCard/BadgeCard";
// import FileUploader from "../organisms/fileUploader/FileUploader";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";
import { type FileWithClientSideUuid } from "../pages/personalSpacePage/PersonalSpacePage";
import UploadedMaterialTable from "../uploadedMaterialTable/UploadedMaterialTable";

export interface IFile 
{
  clientSideUuid: string;
  createdAt: Date | null;
  fileExtension: string;
  filename: string;
  id: number;
  originalFilename: string;
  sizeInBytes: number;
  userId: string;
  uuid: string;
}
// interface UploadedMaterialBlockProps 
// {
//   readonly areUploadsInProgress: boolean;
//   readonly fileInputRef: React.RefObject<HTMLInputElement>;
//   readonly onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
//   readonly selectedFiles: FileWithClientSideUuid[];
//   readonly setSelectedFiles: React.Dispatch<React.SetStateAction<FileWithClientSideUuid[]>>;
//   // readonly uploadedMaterial?: IFile[];
// }
  type UploadedMaterialBlockProps = {
    readonly areUploadsInProgress: boolean;
    readonly fileInputRef: React.RefObject<HTMLInputElement>;
    readonly isGetUploadedFilesLoading: boolean;
    readonly onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    readonly selectedFiles: FileWithClientSideUuid[];
    readonly setSelectedFileIdForPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
    readonly setSelectedFiles: React.Dispatch<React.SetStateAction<FileWithClientSideUuid[]>>;
    readonly uploadedFiles: IFile[];
  };

const UploadedMaterialBlock: FunctionComponent<UploadedMaterialBlockProps> = ({
  areUploadsInProgress,
  fileInputRef,
  onSubmit,
  selectedFiles,
  setSelectedFiles,
  ...props
}) => 
{
  return (
    <div css={styles.wrapper}>
      <div css={styles.uploadedMaterialBlockHead}>
        <Title order={4}>Uploaded materials <span>({props?.uploadedFiles?.length ?? 0})</span></Title>
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
        {props?.uploadedFiles?.length > 0 ? (
          <UploadedMaterialTable {...props}/>
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
