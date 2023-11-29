import MaterialsLabel from "@/components/atoms/materialsLabel/MaterialsLabel";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import useMaterialsStore from "@/stores/materials.store";

import React, { type FunctionComponent } from "react";

import * as styles from "./MaterialCard.styles";

interface MaterialCardProps
{
  readonly fileExtension: string;
  readonly id: string;
  readonly materialType: "file" | "paper";
  readonly title: string;
}

const MaterialCard: FunctionComponent<MaterialCardProps> = ({
  fileExtension,
  id,
  materialType,
  title
}) => 
{
  const { setSelectedFileIdForPreview, setShowFileViewerModal } = useMaterialsStore();
  return (
    <div
      css={styles.wrapper}
      onClick={() => 
      {
        setShowFileViewerModal(true);
        setSelectedFileIdForPreview(id);
      }}>
      <div css={styles.tag}>
        <MaterialsLabel title={`.${fileExtension}`} variant={materialType}/>
      </div>
      {title && (
        <SubtitleText styleType="subtitle-01-medium" style={{ wordBreak: "break-word" }}>
          {title.slice(0, 57)}{title?.length > 45 && "..."}
        </SubtitleText>
      )}
    </div>
  );
};

export default MaterialCard;
