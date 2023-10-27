import { env } from "@/env.mjs";

import React, { type FunctionComponent } from "react";

import * as styles from "./BadgeCard.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import IconButton from "../../atoms/iconButton/IconButton";
import { DownloadIcon } from "../../Icons/DownloadIcon";
import { type SelectedFile } from "../../pages/personalSpacePage/PersonalSpacePage";
interface BadgeCardProps
{
  readonly selectedFiles: SelectedFile[];
}

const BadgeCard: FunctionComponent<BadgeCardProps> = ({ selectedFiles }) => 
{
  return (
    <div css={styles.wrapper}>
      <IconButton icon={<DownloadIcon/>} size="big"/>
      <BodyText styleType="body-01-medium">Drag & drop file here or click to upload</BodyText>
      <div className="text">
        {selectedFiles?.length <= 0 && <BodyText styleType="body-01-regular">Supported formats: JPG, PNG, MP4, PDF, DOCX, XLSX</BodyText>}
        <BodyText styleType="body-01-regular">
          {selectedFiles?.length > 0 ? selectedFiles.map(({ clientSideUuid, file }, i) => (
            <p key={clientSideUuid}>
              {`${i + 1}. ${file?.filename}`}
            </p>
          )) : (
            `Maximum file size: ${env.NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB} MB`
          )}
        </BodyText>
      </div>
    </div>
  );
};

export default BadgeCard;
