
import { Edit } from "@/components/Icons/Edit";
import { MoveDownIcon } from "@/components/Icons/MoveDown";
import { Trash } from "@/components/Icons/Trash";
import { type Document } from "@/db/schema";

import { Menu } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./DocsTable.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { DotsIcon } from "../../Icons/dots";

const formatDate = (date: Date): string => `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

export const DocsTableData: FunctionComponent<Document> = ({ name, updatedAt }) =>
{
  return (
    <>
      <td css={styles.callToActionCell}><Checkbox/></td>
      <td css={styles.docName} className="primaryCell">
        <BodyText styleType="body-01-medium" component="p">{name}</BodyText>
      </td>
      <td css={styles.docDate}><BodyText styleType="body-01-medium" component="p">{formatDate(updatedAt)}</BodyText></td>
      <td css={styles.docTags}><BodyText styleType="body-02-medium" component="p">TODO</BodyText></td>
      <td css={styles.callToActionCell}>
        
        <Menu>
          <Menu.Target>
            <DotsIcon/>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item><span className="label"><Edit/>Rename</span></Menu.Item>
            <Menu.Divider/>
            <Menu.Item><span className="label"><MoveDownIcon/>Download</span></Menu.Item>
            <Menu.Divider/>
            <Menu.Item onClick={() => {}}><span className="label"><Trash/>Delete</span></Menu.Item>
          </Menu.Dropdown>
    
        </Menu>
        
      </td>
 
    </>
  );
};
