/* eslint-disable react/jsx-newline */
import { getRandomUuid } from "@/utils/utils";

import { Title } from "@mantine/core";
import React, { type FormEvent, type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialBlock.styles";
import { Button } from "../atoms/Button/Button";
import BadgeCard from "../badgeCard/BadgeCard";
import FileUploader from "../organisms/fileUploader/FileUploader";
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
interface UploadedMaterialBlockProps 
{
  readonly areUploadsInProgress: boolean;
  readonly fileInputRef: React.RefObject<HTMLInputElement>;
  readonly onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  readonly selectedFiles: FileWithClientSideUuid[];
  readonly setSelectedFiles: React.Dispatch<React.SetStateAction<FileWithClientSideUuid[]>>;
  readonly uploadedMaterial?: IFile[];
}

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
        <Title order={4}>Uploaded materials <span>({props?.uploadedMaterial?.length ?? 0})</span></Title>
      </div>
      <div css={styles.uploader}>
        <form
          onSubmit={onSubmit}
          css={styles.badge}>
          <BadgeCard/>
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
      </div>

      <div css={styles.content}>
        <UploadedMaterialTable {...props}/>
      </div>

    </div>
  );
};

export default UploadedMaterialBlock;
