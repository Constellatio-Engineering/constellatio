import React, { type FunctionComponent } from "react";

import * as styles from "./BadgeCard.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import IconButton from "../../atoms/iconButton/IconButton";
import { DownloadIcon } from "../../Icons/DownloadIcon";
import { type FileWithClientSideUuid } from "../../pages/personalSpacePage/PersonalSpacePage";
interface BadgeCardProps
{
  readonly selectedFiles: FileWithClientSideUuid[];
}

const BadgeCard: FunctionComponent<BadgeCardProps> = ({ selectedFiles }) => 
{
  return (
    <div css={styles.wrapper}>
      <IconButton icon={<DownloadIcon/>} size="big"/>
      <BodyText styleType="body-01-medium">Drag & drop file here or click to upload</BodyText>
      <div className="text">
        {selectedFiles?.length <= 0 && <BodyText styleType="body-01-regular">Supported formats: JPG, PNG, MP4, PDF, DOCX, XLSX</BodyText>}
        <BodyText styleType="body-01-regular">{selectedFiles?.length !== null && selectedFiles?.length !== undefined && selectedFiles?.length > 0 ? selectedFiles.map((x, i) => <p key={i}>{`${i + 1}. ${x?.file?.name} `}</p>) : "Maximum file size: 10 MB"}</BodyText>
      </div>
    </div>
  );
};

export default BadgeCard;
