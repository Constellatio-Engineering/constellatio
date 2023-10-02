import { type UploadedFile } from "@/db/schema";
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

type UploadedMaterialBlockProps = {
  readonly areUploadsInProgress: boolean;
  readonly fileInputRef: React.RefObject<HTMLInputElement>;
  readonly isGetUploadedFilesLoading: boolean;
  readonly onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  readonly selectedFiles: FileWithClientSideUuid[];
  readonly setSelectedFileIdForPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly setSelectedFiles: React.Dispatch<React.SetStateAction<FileWithClientSideUuid[]>>;
  readonly uploadedFiles: UploadedFile[];
};

const UploadedMaterialBlock: FunctionComponent<UploadedMaterialBlockProps> = ({
  areUploadsInProgress,
  fileInputRef,
  onSubmit,
  selectedFiles,
  setSelectedFiles,
  uploadedFiles,
  ...props
}) => 
{
  
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
