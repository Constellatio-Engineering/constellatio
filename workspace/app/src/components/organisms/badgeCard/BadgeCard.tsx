import { type SelectedFile } from "@/components/organisms/uploadedMaterialBlock/UploadedMaterialBlock";
import { env } from "@/env.mjs";

import { fileExtensions } from "@constellatio/shared/validation";
import React, { type FunctionComponent } from "react";

import * as styles from "./BadgeCard.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import IconButton from "../../atoms/iconButton/IconButton";
import { DownloadIcon } from "../../Icons/DownloadIcon";

interface BadgeCardProps
{
  readonly selectedFiles: SelectedFile[];
}

const BadgeCard: FunctionComponent<BadgeCardProps> = ({ selectedFiles }) => 
{
  return (
    <div css={styles.wrapper}>
      <IconButton icon={<DownloadIcon/>} size="big"/>
      <BodyText styleType="body-01-medium">Klicke hier oder ziehe Dateien in das Feld, um sie hochzuladen</BodyText>
      <div className="text">
        {selectedFiles?.length <= 0 && (
          <BodyText styleType="body-01-regular">
            Unterstützte Dateiformate: {fileExtensions.map(ext => ext.toUpperCase()).join(", ")}
          </BodyText>
        )}
        <BodyText styleType="body-01-regular">
          {selectedFiles?.length > 0 ? selectedFiles.map(({ clientSideUuid, fileProps }, i) => (
            <p key={clientSideUuid}>
              {`${i + 1}. ${fileProps?.filename}`}
            </p>
          )) : (
            `Maximale Dateigröße: ${env.NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB} MB`
          )}
        </BodyText>
      </div>
    </div>
  );
};

export default BadgeCard;
