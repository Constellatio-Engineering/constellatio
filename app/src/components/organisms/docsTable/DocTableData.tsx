
import { type Document } from "@/db/schema";
import useDocumentEditorStore from "@/stores/documentEditor.store";

import { type FunctionComponent } from "react";

import * as styles from "./DocsTable.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { DotsIcon } from "../../Icons/dots";

const formatDate = (date: Date): string => `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

export const DocsTableData: FunctionComponent<Document> = (document) =>
{
  const { name, updatedAt } = document;
  const setEditDocumentState = useDocumentEditorStore(s => s.setEditDocumentState);

  return (
    <>
      <td css={styles.callToActionCell}><Checkbox/></td>
      <td css={styles.docName} className="primaryCell">
        <BodyText styleType="body-01-medium" component="p">{name}</BodyText>
      </td>
      <td css={styles.docDate}><BodyText styleType="body-01-medium" component="p">{formatDate(updatedAt)}</BodyText></td>
      <td css={styles.docTags}><BodyText styleType="body-02-medium" component="p">TODO</BodyText></td>
      <td
        css={styles.callToActionCell}
        onClick={(e) =>
        {
          e.stopPropagation();
          setEditDocumentState(document);
        }}>
        <DotsIcon/>
      </td>
    </>
  );
};
