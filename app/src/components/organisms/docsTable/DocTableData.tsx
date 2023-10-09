import { Button, type TButton } from "@/components/atoms/Button/Button";
import { DropdownItem } from "@/components/atoms/Dropdown/DropdownItem";
import { Cross } from "@/components/Icons/Cross";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Edit } from "@/components/Icons/Edit";
// import { FolderIcon } from "@/components/Icons/Folder";
import { FolderIcon } from "@/components/Icons/Folder";
import { Trash } from "@/components/Icons/Trash";
// import MoveToModal from "@/components/moveToModal/MoveToModal";
import { type Document } from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useDocumentEditorStore from "@/stores/documentEditor.store";
import { api } from "@/utils/api";
import { paths } from "@/utils/paths";

import {
  Menu, Modal, Title 
} from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { type FunctionComponent } from "react";

import * as styles from "./DocsTable.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { DotsIcon } from "../../Icons/dots";

const formatDate = (date: Date): string => `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

export const DocsTableData: FunctionComponent<Document> = (doc) =>
{
  const {
    folderId,
    id: documentId,
    name,
    updatedAt
  } = doc;

  const { invalidateDocuments } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { setEditDocumentState, setViewDocumentState } = useDocumentEditorStore(s => s);
  const { mutate: deleteDocument } = api.documents.deleteDocument.useMutation({
    onError: (error) => console.error("Error while deleting document:", error),
    onSuccess: async () => invalidateDocuments({ folderId }),
  });

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
  
  const [showDeleteDocModal, setShowDeleteDocModal] = useState<boolean>(false);
  // const [showMoveToModal, setShowMoveToModal] = useState(false);
  return (
    <>
      <td><Checkbox/></td>
      <td
        css={styles.docName}
        className="primaryCell"
        onClick={() => setViewDocumentState(doc)}>
        <BodyText styleType="body-01-medium" component="p">{name}</BodyText>
      </td>
      <td css={styles.docDate}><BodyText styleType="body-01-medium" component="p">{formatDate(updatedAt)}</BodyText></td>
      <td css={styles.docTags}><BodyText styleType="body-02-medium" component="p"/></td>
      <td
        css={styles.callToActionCell}> 
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <button type="button" className="dots-btn"><DotsIcon/></button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item><DropdownItem onClick={() => { setEditDocumentState(doc); }} icon={<Edit/>} label="Rename and edit"/></Menu.Item>
            <Menu.Divider/>
            {/* <Menu.Item><DropdownItem icon={<FolderIcon/>} label="Move to" onClick={() => { }}/></Menu.Item>
            <Menu.Divider/> */}
            <Menu.Item><DropdownItem icon={<DownloadIcon/>} label="Download" onClick={download}/></Menu.Item>
            <Menu.Divider/>
            <Menu.Item><DropdownItem icon={<Trash/>} label="Delete" onClick={() => setShowDeleteDocModal(true)}/></Menu.Item>
          </Menu.Dropdown>
        </Menu>
        {/* Modal */}
        <Modal
          lockScroll={false}
          opened={showDeleteDocModal}
          withCloseButton={false}
          centered
          styles={styles.deleteModalStyle()}
          onClose={() => { setShowDeleteDocModal(false); }}>
          <span className="close-btn" onClick={() => setShowDeleteDocModal(false)}>
            <Cross size={32}/>
          </span>
          <Title order={3}>Delete document</Title>
          <BodyText styleType="body-01-regular" component="p" className="delete-folder-text">Are you sure you want to document <strong>{doc?.name}</strong>?</BodyText>
          <div className="modal-call-to-action">
            <Button<"button">
              styleType={"secondarySimple" as TButton["styleType"]}
              onClick={() => setShowDeleteDocModal(false)}>
              No, Keep
            </Button>
            <Button<"button">
              styleType="primary"
              onClick={() => 
              {
                deleteDocument({ id: documentId });
                setShowDeleteDocModal(false);
              }}>
              Yes, Delete
            </Button>
          </div>
        </Modal>
        {/* Modal */}
        {/* <MoveToModal
          close={function(): void 
          {
            setShowMoveToModal(false);
          }}
          action={function(): void 
          {
            throw new Error("Function not implemented.");
          }}
          isOpened={showMoveToModal}
        /> */}
      </td>
    </>
  );
};
