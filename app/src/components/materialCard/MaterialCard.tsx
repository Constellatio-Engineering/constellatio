import React, { type FunctionComponent } from "react";

import * as styles from "./MaterialCard.styles";
import { SubtitleText } from "../atoms/SubtitleText/SubtitleText";
import MaterialsLabel from "../materialsLabel/MaterialsLabel";

interface MaterialCardProps
{
  readonly fileExtension: string;
  readonly materialType: "file" | "paper";
  readonly title: string;
}

const MaterialCard: FunctionComponent<MaterialCardProps> = ({ fileExtension, materialType, title }) => 
{
  return (
    <div css={styles.wrapper}>
      <div css={styles.tag}>
        <MaterialsLabel title={`.${fileExtension}`} variant={materialType}/>
      </div>
      {title && <SubtitleText styleType="subtitle-01-medium">{title.slice(0, 57)}{title?.length > 45 && "..."}</SubtitleText>}
    </div>
  );
};

export default MaterialCard;
