
import { type FunctionComponent } from "react";

import * as styles from "./DocsTable.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Checkbox } from "../atoms/Checkbox/Checkbox";
import { DotsIcon } from "../Icons/dots";

const formatDate = (date: Date): string => `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
export interface IDoc 
{
  readonly lastModified: Date;
  readonly name: string;
  readonly tagsNumber: number;
}
export const DocsTableData: FunctionComponent<IDoc> = ({ lastModified, name, tagsNumber }) => (
  <>
    <td css={styles.callToActionCell}><Checkbox/></td>
    <td css={styles.docName} className="primaryCell">
      <BodyText styleType="body-01-medium" component="p">{name}</BodyText>
    </td>
    <td css={styles.docDate}> <BodyText styleType="body-01-medium" component="p">{formatDate(lastModified)}</BodyText></td>
    <td css={styles.docTags}> <BodyText styleType="body-02-medium" component="p">Tags({tagsNumber})</BodyText></td>
    <td css={styles.callToActionCell}><DotsIcon/></td>
  </>
);
