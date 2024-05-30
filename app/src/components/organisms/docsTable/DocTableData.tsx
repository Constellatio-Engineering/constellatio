/* eslint-disable max-lines */
import { Button, type TButton } from "@/components/atoms/Button/Button";
import { DropdownItem } from "@/components/atoms/Dropdown/DropdownItem";
import { Cross } from "@/components/Icons/Cross";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Edit } from "@/components/Icons/Edit";
import { FolderIcon } from "@/components/Icons/Folder";
import { Trash } from "@/components/Icons/Trash";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { useOnDocumentMutation } from "@/hooks/useOnDocumentMutation";
import useUploadFolders from "@/hooks/useUploadFolders";
import { type GetDocumentResult } from "@/server/api/routers/documents.router";
import useDocumentEditorStore from "@/stores/documentEditor.store";
import { useTagsEditorStore } from "@/stores/tagsEditor.store";
import { api } from "@/utils/api";
import { getFolderName } from "@/utils/folders";
import { apiPaths } from "@/utils/paths";
import { downloadFileFromUrl } from "@/utils/utils";

import { Menu, Modal, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { type FunctionComponent } from "react";

import * as styles from "./DocsTable.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { DotsIcon } from "../../Icons/dots";
import MoveToModal from "../moveToModal/MoveToModal";

const formatDate = (date: Date): string => `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

export const DocsTableData: FunctionComponent<GetDocumentResult> = (doc) =>
{
  const {
    folderId,
    id: documentId,
    name,
    tags,
    updatedAt
  } = doc;

  const openTagsDrawer = useTagsEditorStore(s => s.openEditor);
  const { onDocumentMutation } = useOnDocumentMutation();
  const downloadDocumentNotificationId = `downloading-document${documentId}`;
  const { setEditDocumentState, setViewDocumentState } = useDocumentEditorStore(s => s);
  const { folders } = useUploadFolders();
  const folderName = getFolderName(folderId, folders);
  const [showDeleteDocModal, setShowDeleteDocModal] = useState<boolean>(false);
  const [showMoveToModal, setShowMoveToModal] = useState(false);
  const { mutate: updateDocument } = api.documents.updateDocument.useMutation({
    onError: (error) => console.log("error while updating document", error),
    onSuccess: async (_data) =>
    {
      setShowMoveToModal(false);
      await onDocumentMutation();
    },
  });
  const { mutate: deleteDocument } = api.documents.deleteDocument.useMutation({
    onError: (error) => console.error("Error while deleting document:", error),
    onSuccess: onDocumentMutation
  });

  const { isPending: isDownloading, mutate: downloadDocument } = useMutation({
    mutationFn: async () =>
    {
      const response = await axios.post(apiPaths.downloadDocument, { documentId, }, { responseType: "blob" });
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      await downloadFileFromUrl(url, `${name}.pdf`);
    },
    onError: (error) =>
    {
      console.error("Error while downloading pdf:", error);
      notifications.update({
        autoClose: false,
        color: "red",
        id: downloadDocumentNotificationId,
        loading: false,
        message: "Es ist ein Fehler beim Herunterladen der Datei aufgetreten.",
        title: "Fehler",
      });
    },
    onMutate: () =>
    {
      notifications.show({
        autoClose: false,
        color: "blue",
        id: downloadDocumentNotificationId,
        loading: true,
        message: "Bitte warte, während die Datei heruntergeladen wird.",
        title: "Datei wird heruntergeladen",
      });
    },
    onSuccess: () =>
    {
      notifications.update({
        autoClose: 3000,
        color: "green",
        id: downloadDocumentNotificationId,
        loading: false,
        message: "Die Datei wurde erfolgreich heruntergeladen.",
        title: "Erfolgreich heruntergeladen",
      });
    },
    retry: false
  });

  return (
    <>
      {/* <td><Checkbox/></td> */}
      <td
        css={styles.docName}
        className="primaryCell"
        onClick={() => setViewDocumentState(doc)}>
        <BodyText styleType="body-01-medium" component="p">{name}</BodyText>
      </td>
      <td css={styles.docDate}>
        <BodyText styleType="body-01-medium" component="p">{formatDate(updatedAt)}</BodyText>
      </td>
      <td css={styles.docTags}>
        <UnstyledButton onClick={() => openTagsDrawer({
          data: doc,
          entityType: "document"
        })}>
          <BodyText styleType="body-02-medium" component="p">Tags ({tags.length ?? 0})</BodyText>
        </UnstyledButton>
      </td>
      <td css={styles.cellFolder}>
        <BodyText
          styleType="body-02-medium"
          c="neutrals-01.9"
          component="p">
          <FolderIcon/>
          {folderName.length > 0 ? folderName : "Standard Ordner"}
        </BodyText>
      </td>
      <td
        css={styles.callToActionCell}> 
        <Menu
          shadow="elevation-big"
          width={200}
          radius="12px">
          <Menu.Target>
            <button type="button" className="dots-btn"><DotsIcon/></button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setEditDocumentState(doc)}>
              <DropdownItem icon={<Edit/>} label="Bearbeiten"/>
            </Menu.Item>
            <Menu.Item>
              <DropdownItem icon={<FolderIcon/>} label="Verschieben" onClick={() => setShowMoveToModal(true)}/>
            </Menu.Item> 
            <Menu.Item style={{ display: "none" }} disabled={isDownloading} onClick={() => downloadDocument()}>
              <DropdownItem icon={<DownloadIcon/>} label="Herunterladen"/>
            </Menu.Item>
            <Menu.Item onClick={() => setShowDeleteDocModal(true)}>
              <DropdownItem icon={<Trash/>} label="Löschen"/>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
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
        <Title order={3}>Dokument löschen</Title>
        <BodyText styleType="body-01-regular" component="p" className="delete-folder-text">
          Bist du sicher, dass du das Dokument <strong>{doc?.name}</strong> löschen möchtest?
        </BodyText>
        <div className="modal-call-to-action">
          <Button<"button">
            styleType={"secondarySimple" as TButton["styleType"]}
            onClick={() => setShowDeleteDocModal(false)}>
            Nein, behalten
          </Button>
          <Button<"button">
            styleType="primary"
            onClick={() => 
            {
              deleteDocument({ id: documentId });
              setShowDeleteDocModal(false);
            }}>
            Ja, löschen
          </Button>
        </div>
      </Modal>
      <MoveToModal
        title="Constellatio Doc verschieben nach"
        onSubmit={(newFolderId) =>
        {
          updateDocument({
            id: documentId,
            updatedValues: { folderId: newFolderId }
          });
        }}
        close={() => setShowMoveToModal(false)}
        currentFolderId={folderId}
        isOpened={showMoveToModal}
      />
    </>
  );
};
