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
// import { FolderIcon } from "../Icons/Folder";
import { Trash } from "../Icons/Trash";

interface MaterialOptionsMenuProps
{
  readonly file: UploadedFile;
  readonly selectedFolderId: string | null;
}

const MaterialOptionsMenu: FunctionComponent<MaterialOptionsMenuProps> = ({ file, selectedFolderId }) =>
{
  const renameFileModalState = useRenameFileModalStore(s => s.renameFileModal);
  const openRenameFileModal = useRenameFileModalStore(s => s.openRenameFileModal);
  const closeRenameFileModal = useRenameFileModalStore(s => s.closeRenameFileModal);
  const updateFilename = useRenameFileModalStore(s => s.updateFilename);
  const hasUnsavedChanges = useRenameFileModalStore(s => s.getHasUnsavedChanges());
  const [isDeleteMaterialModalOpen, setIsDeleteMaterialModalOpen] = useState<boolean>(false);
  const { onUploadedFileMutation } = useOnUploadedFileMutation({ folderId: selectedFolderId });
  const isRenameFileModalOpen = renameFileModalState.modalState === "open" && renameFileModalState.fileId === file.id;
  const { mutateAsync: createSignedGetUrl } = api.uploads.createSignedGetUrl.useMutation({
    onError: (e) => console.log("error while creating signed get url", e)
  });
  const { mutate: renameFile } = api.uploads.renameFile.useMutation({
    onError: (e) => console.log("error while renaming file", e),
    onSuccess: async () =>
    {
      await onUploadedFileMutation();
      closeRenameFileModal();
    }
  });
  const { mutate: deleteFile } = api.uploads.deleteUploadedFiles.useMutation({
    onError: (e) => console.log("error while deleting file", e),
    onSuccess: onUploadedFileMutation
  });

  return (
    <> 
      <Menu
        shadow="elevation-big"
        radius="12px"
        width={200}>
        <Menu.Target>
          <button type="button" css={styles.callToActionCell}>
            <DotsIcon/>
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => openRenameFileModal(file)}>
            <DropdownItem icon={<Edit/>} label="Rename"/>
          </Menu.Item>
          {/* <Menu.Item>
            <DropdownItem icon={<FolderIcon/>} label="Move to"/>
          </Menu.Item> */}
          <Menu.Item
            onClick={async () =>
            {
              const url = await createSignedGetUrl({ fileId: file.id });
              await downloadFileFromUrl(url, file.originalFilename);
            }}>
            <DropdownItem icon={<DownloadIcon/>} label="Download"/>
          </Menu.Item>
          <Menu.Item onClick={() => setIsDeleteMaterialModalOpen(true)}><DropdownItem icon={<Trash/>} label="Delete"/></Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {/* POP UPS ------------------------------------------------------------------------------------- */}
      <Modal
        lockScroll={false}
        opened={isDeleteMaterialModalOpen}
        withCloseButton={false}
        centered
        styles={styles.modalStyles()}
        onClose={() => { setIsDeleteMaterialModalOpen(false); }}>
        <span className="close-btn" onClick={() => setIsDeleteMaterialModalOpen(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3}>Delete File</Title>
        <BodyText styleType="body-01-regular" component="p" className="delete-folder-text">Are you sure you want to delete <strong>{file.originalFilename}</strong>?</BodyText>
        <div className="modal-call-to-action">
          <Button<"button">
            styleType={"secondarySimple" as TButton["styleType"]}
            onClick={() => setIsDeleteMaterialModalOpen(false)}>
            No, Keep
          </Button>
          <Button<"button">
            styleType="primary"
            onClick={() => 
            {
              if(file) { deleteFile({ fileIds: [file.id] }); }
              setIsDeleteMaterialModalOpen(false);
            }}>
            Yes, Delete
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
            <Title order={3}>Rename file</Title>
            <form onSubmit={e => e.preventDefault()}>
              <div className="new-folder-input">
                <BodyText styleType="body-01-regular" component="label">File name</BodyText>
                <Input
                  inputType="text"
                  value={renameFileModalState.newFilename}
                  onChange={e => updateFilename(e.target.value)}
                />
              </div>
              <div className="modal-call-to-action">
                <Button<"button">
                  styleType={"secondarySimple" as TButton["styleType"]}
                  onClick={closeRenameFileModal}>
                  Cancel
                </Button>
                <Button<"button">
                  styleType="primary"
                  type="submit"
                  disabled={!hasUnsavedChanges}
                  onClick={() => renameFile({
                    id: renameFileModalState.fileId,
                    newFilename: `${renameFileModalState.newFilename}.${file.fileExtension}`
                  })}>
                  Save
                </Button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </>
  );
};

export default MaterialOptionsMenu;
