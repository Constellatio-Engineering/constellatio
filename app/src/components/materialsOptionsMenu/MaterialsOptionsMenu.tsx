/* eslint-disable max-lines */
import { type UploadedFile } from "@/db/schema";
import { useOnUploadedFileMutation } from "@/hooks/useOnUploadedFileMutation";
import useRenameFileModalStore from "@/stores/renameFileModal.store";
import { api } from "@/utils/api";
import { downloadFileFromUrl } from "@/utils/utils";

import { Menu, Modal, Title } from "@mantine/core";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./MaterialsOptionsMenu.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button, type TButton } from "../atoms/Button/Button";
import { DropdownItem } from "../atoms/Dropdown/DropdownItem";
import { Input } from "../atoms/Input/Input";
import { Cross } from "../Icons/Cross";
import { DotsIcon } from "../Icons/dots";
import { DownloadIcon } from "../Icons/DownloadIcon";
import { Edit } from "../Icons/Edit";
import { FolderIcon } from "../Icons/Folder";
import { Trash } from "../Icons/Trash";
import MoveToModal from "../moveToModal/MoveToModal";

interface MaterialOptionsMenuProps 
{
  readonly file: UploadedFile;
  readonly selectedFolderId: string | null;
}

const MaterialOptionsMenu: FunctionComponent<MaterialOptionsMenuProps> = ({ file, selectedFolderId }) => 
{
  const renameFileModalState = useRenameFileModalStore((s) => s.renameFileModal);
  const openRenameFileModal = useRenameFileModalStore((s) => s.openRenameFileModal);
  const closeRenameFileModal = useRenameFileModalStore((s) => s.closeRenameFileModal);
  const updateFilename = useRenameFileModalStore((s) => s.updateFilename);
  const hasUnsavedChanges = useRenameFileModalStore((s) => s.getHasUnsavedChanges());
  const [isDeleteMaterialModalOpen, setIsDeleteMaterialModalOpen] = useState<boolean>(false);
  const { onUploadedFileMutation } = useOnUploadedFileMutation();
  const isRenameFileModalOpen = renameFileModalState.modalState === "open" && renameFileModalState.fileId === file.id;
  const [showMoveToModal, setShowMoveToModal] = useState(false);
  const { mutateAsync: createSignedGetUrl } = api.uploads.createSignedGetUrl.useMutation({
    onError: (e) => console.log("error while creating signed get url", e),
  });
  const { mutate: updateFile } = api.uploads.updateFile.useMutation({
    onError: (e) => console.log("error while renaming file", e),
    onSuccess: async (_data, variables) =>
    {
      const newFolderId = variables.updatedValues.folderId;

      if(newFolderId)
      {
        await onUploadedFileMutation({ folderId: newFolderId });
      }

      closeRenameFileModal();
      setShowMoveToModal(false);
      await onUploadedFileMutation({ folderId: selectedFolderId });
    },
  });
  const { mutate: deleteFile } = api.uploads.deleteUploadedFiles.useMutation({
    onError: (e) => console.log("error while deleting file", e),
    onSuccess: async () => onUploadedFileMutation({ folderId: selectedFolderId }),
  });

  // we need an update material function like updateDocument function inside DocTableData.tsx

  // const { mutate: updateUploadedMaterial } = api.uploads..useMutation({
  //   onError: (error) => console.log("error while updating material", error),
  //   onSuccess: async (_data, variables) => {},
  // });

  return (
    <>
      <td
        css={styles.optionsCell}
        onClick={(e) => 
        {
          const menuTarget = e.currentTarget.firstChild;
          if(menuTarget instanceof HTMLElement) 
          {
            menuTarget.click();
          }
        }}>
        <Menu shadow="elevation-big" radius="12px" width={200}>
          <Menu.Target>
            <button type="button" css={styles.callToActionCell}>
              <DotsIcon/>
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => openRenameFileModal(file)}>
              <DropdownItem icon={<Edit/>} label="Rename"/>
            </Menu.Item>
            <Menu.Item onClick={() => setShowMoveToModal(true)}>
              <DropdownItem icon={<FolderIcon/>} label="Move to"/>
            </Menu.Item>
            <Menu.Item
              onClick={async () => 
              {
                const url = await createSignedGetUrl({ fileId: file.id });
                await downloadFileFromUrl(url, file.originalFilename);
              }}>
              <DropdownItem icon={<DownloadIcon/>} label="Download"/>
            </Menu.Item>
            <Menu.Item onClick={() => setIsDeleteMaterialModalOpen(true)}>
              <DropdownItem icon={<Trash/>} label="Delete"/>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
      {/* POP UPS ------------------------------------------------------------------------------------- */}
      <Modal
        lockScroll={false}
        opened={isDeleteMaterialModalOpen}
        withCloseButton={false}
        centered
        styles={styles.modalStyles()}
        onClose={() => 
        {
          setIsDeleteMaterialModalOpen(false);
        }}>
        <span
          className="close-btn"
          onClick={() => setIsDeleteMaterialModalOpen(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3}>Datei löschen</Title>
        <BodyText
          styleType="body-01-regular"
          component="p"
          className="delete-folder-text">
          Bist du sicher?{" "}
          <strong>{file.originalFilename}</strong>?
        </BodyText>
        <div className="modal-call-to-action">
          <Button<"button">
            styleType={"secondarySimple" as TButton["styleType"]}
            onClick={() => setIsDeleteMaterialModalOpen(false)}>
            Nein, behalten
          </Button>
          <Button<"button">
            styleType="primary"
            onClick={() => 
            {
              if(file) 
              {
                deleteFile({ fileIds: [file.id] });
              }
              setIsDeleteMaterialModalOpen(false);
            }}>
            Ja, löschen
          </Button>
        </div>
      </Modal>
      <Modal
        lockScroll={false}
        opened={isRenameFileModalOpen}
        withCloseButton={false}
        centered
        styles={styles.modalStyles()}
        onClose={closeRenameFileModal}>
        {isRenameFileModalOpen && (
          <>
            <span className="close-btn" onClick={closeRenameFileModal}>
              <Cross size={32}/>
            </span>
            <Title order={3}>Datei umbenennen</Title>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="new-folder-input">
                <BodyText styleType="body-01-regular" component="label">
                  Dateiname
                </BodyText>
                <Input
                  inputType="text"
                  value={renameFileModalState.newFilename}
                  onChange={(e) => updateFilename(e.target.value)}
                />
              </div>
              <div className="modal-call-to-action">
                <Button<"button">
                  styleType={"secondarySimple" as TButton["styleType"]}
                  onClick={closeRenameFileModal}>
                  Abbrechen
                </Button>
                <Button<"button">
                  styleType="primary"
                  type="submit"
                  disabled={!hasUnsavedChanges}
                  onClick={() =>
                    updateFile({
                      id: renameFileModalState.fileId,
                      updatedValues: {
                        name: `${renameFileModalState.newFilename}.${file.fileExtension}`
                      },
                    })}>
                  Speichern
                </Button>
              </div>
            </form>
          </>
        )}
      </Modal>
      <MoveToModal
        onSubmit={(newFolderId) => 
        {
          updateFile({
            id: file.id,
            updatedValues: { folderId: newFolderId }
          });
        }}
        close={() => setShowMoveToModal(false)}
        currentFolderId={file.id}
        isOpened={showMoveToModal}
      />
    </>
  );
};

export default MaterialOptionsMenu;
