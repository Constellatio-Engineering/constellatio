import React, { type FunctionComponent } from "react";

import * as styles from "./BadgeCard.styles";
import { DownloadIcon } from "../Icons/DownloadIcon";
import { Title } from "@mantine/core";
import IconButton from "../atoms/iconButton/IconButton";
import { BodyText } from "../atoms/BodyText/BodyText";

interface BadgeCardProps
{

}

const BadgeCard: FunctionComponent<BadgeCardProps> = ({  }) => {
  return (
    <div css={styles.wrapper}>
      <IconButton icon={<DownloadIcon/>} size={"big"}/>
      <BodyText styleType={"body-01-medium"}>Drag & drop file here or click to upload</BodyText>
      <div className="text">
        <BodyText styleType="body-01-regular">Supported formats: JPG, PNG, MP4, PDF, DOCX, XLSX</BodyText>
        <BodyText styleType="body-01-regular">Maximum file size: 10 MB</BodyText>
      </div>
    </div>
  );
};

export default BadgeCard;
