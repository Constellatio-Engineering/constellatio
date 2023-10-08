import { DropdownItem } from "@/components/atoms/Dropdown/DropdownItem";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Edit } from "@/components/Icons/Edit";
import { FolderIcon } from "@/components/Icons/Folder";
import { Trash } from "@/components/Icons/Trash";
import { type Document } from "@/db/schema";
import useDocumentEditorStore from "@/stores/documentEditor.store";
import { paths } from "@/utils/paths";

import { Menu } from "@mantine/core";
import axios from "axios";
import { type FunctionComponent } from "react";

import * as styles from "./DocsTable.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { DotsIcon } from "../../Icons/dots";

const formatDate = (date: Date): string => `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

export const DocsTableData: FunctionComponent<Document> = (doc) =>
{
  const { id: documentId, name, updatedAt } = doc;
  const { setEditDocumentState, setViewDocumentState } = useDocumentEditorStore(s => s);

  const download = async (): Promise<void> =>
  {
    let pdfBlob: Blob;

    try 
    {
      const response = await axios.post(paths.downloadDocument, { documentId, }, {
        responseType: "blob",
      });

      pdfBlob = new Blob([response.data], { type: "application/pdf" });
    }
    catch (error) 
    {
      console.error("Error while downloading pdf:", error);
      return;
    }

    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${name}.pdf`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <td css={styles.callToActionCell}><Checkbox/></td>
      <td
        css={styles.docName}
        className="primaryCell"
        onClick={() => setViewDocumentState(doc)}>
        <BodyText styleType="body-01-medium" component="p">{name}</BodyText>
      </td>
      <td css={styles.docDate}><BodyText styleType="body-01-medium" component="p">{formatDate(updatedAt)}</BodyText></td>
      <td css={styles.docTags}><BodyText styleType="body-02-medium" component="p">Tags (999)</BodyText></td>
      <td
        css={styles.callToActionCell}> 
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <button type="button" css={styles.callToActionCell}><DotsIcon/></button>
          </Menu.Target>
          <Menu.Dropdown>
            
            <Menu.Item><DropdownItem onClick={() => { setEditDocumentState(doc); }} icon={<Edit/>} label="Rename and edit"/></Menu.Item>
            <Menu.Divider/>
            <Menu.Item><DropdownItem icon={<FolderIcon/>} label="Move to" onClick={() => { }}/></Menu.Item>
            <Menu.Divider/>
            <Menu.Item><DropdownItem icon={<DownloadIcon/>} label="Download" onClick={download}/></Menu.Item>
            <Menu.Divider/>
            <Menu.Item><DropdownItem icon={<Trash/>} label="Delete" onClick={() => { }}/></Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </>
  );
};
