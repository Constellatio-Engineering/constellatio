import MaterialsLabel from "@/components/atoms/materialsLabel/MaterialsLabel";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { type Document } from "@/db/schema";
import useDocumentEditorStore from "@/stores/documentEditor.store";
import useMaterialsStore from "@/stores/materials.store";

import React, { type FunctionComponent } from "react";

import * as styles from "./MaterialCard.styles";

type PaperCard =
{
  readonly doc: Document;
  readonly materialType: "paper";
  readonly materialsLabelTitle: string;
  readonly title: string;
};

type FileCard =
{
  readonly id: string;
  readonly materialType: "file";
  readonly materialsLabelTitle: string;
  readonly title: string;
};

type Props = PaperCard | FileCard;

const MaterialCard: FunctionComponent<Props> = (props) =>
{
  const { materialsLabelTitle, materialType, title } = props;

  const setViewDocumentState = useDocumentEditorStore(s => s.setViewDocumentState);
  const { setSelectedFileIdForPreview, setShowFileViewerModal } = useMaterialsStore();

  return (
    <div
      css={styles.wrapper}
      onClick={() => 
      {
        if(materialType === "paper")
        {
          const { doc } = props;
          setViewDocumentState(doc);
        }
        else
        {
          const { id } = props;
          setSelectedFileIdForPreview(id);
          setShowFileViewerModal(true);
        }
      }}>
      <div css={styles.tag}>
        <MaterialsLabel title={materialsLabelTitle} variant={materialType}/>
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
