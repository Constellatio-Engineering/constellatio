/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button, type TButton } from "@/components/atoms/Button/Button";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { Input } from "@/components/atoms/Input/Input";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import MaterialsMenuListItem from "@/components/atoms/materialMenuListItem/MaterialsMenuListItem";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { Cross } from "@/components/Icons/Cross";
import { Edit } from "@/components/Icons/Edit";
import { FolderIcon } from "@/components/Icons/Folder";
import { Plus } from "@/components/Icons/Plus";
import { Trash } from "@/components/Icons/Trash";
import { Modal } from "@/components/molecules/Modal/Modal";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useUploadFolders from "@/hooks/useUploadFolders";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useMaterialsStore from "@/stores/materials.store";
import { api } from "@/utils/api";
import { defaultFolderName } from "@/utils/translations";

import { Menu, Title } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent } from "react";

import * as styles from "./FoldersMenuTablet.styles";

const FoldersMenuTablet: FunctionComponent = () => 
{
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);
  const setSelectedFolderId = useMaterialsStore(s => s.setSelectedFolderId);
  const { folders = [] } = useUploadFolders();
  const { invalidateFolders } = useContextAndErrorIfNull(InvalidateQueriesContext);
  // const [opened, showCreateFolderModal close, open }] = useDisclosure(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = React.useState<boolean>(false);
  const [showRenameModal, setShowRenameModal] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const { mutate: createFolder } = api.folders.createFolder.useMutation({
    onError: (error) => 
    {
      console.error("error while creating folder", error);
      notifications.show({
        color: "red",
        message: "Der Ordner konnte nicht erstellt werden",
      });
    },
    onSuccess: invalidateFolders
  });
  const { mutate: renameFolder } = api.folders.renameFolder.useMutation({
    onError: (error) =>
    {
      console.error("error while creating folder", error);
      notifications.show({
        color: "red",
        message: "Der Name des Ordner konnte nicht geändert werden",
      });
    },
    onSuccess: invalidateFolders
  });
  const { mutate: deleteFolder } = api.folders.deleteFolder.useMutation({
    onError: (error) => 
    {
      console.error("error while deleting folder", error);
      notifications.show({
        color: "red",
        message: "Der Ordner konnte nicht gelöscht werden",
      });
    },
    onSuccess: async () => 
    {
      await invalidateFolders();
      setSelectedFolderId(null);
      notifications.show({
        color: "green",
        message: "Der Ordner wurde erfolgreich gelöscht",
        title: "Ordner gelöscht"
      });
    }
  });
  const currentFolder = selectedFolderId ? folders.find(x => x.id === selectedFolderId) : null;
  const [newFolderName, setNewFolderName] = React.useState<string>("");
  return (
    <div css={styles.wrapper}>
      <div css={styles.selectedFolder}>
        <Menu
          shadow="md"
          closeOnClickOutside={false}
          radius={12}
          zIndex={3}
          position="bottom-start"
          width={300}>
          <Menu.Target>
            <div css={styles.title}>
              <IconButton icon={<FolderIcon/>} size="big"/>
              <Title order={3}>{selectedFolderId == null ? defaultFolderName : currentFolder?.name ?? ""}</Title>
              <ArrowDown size={28}/>
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <MaterialsMenuListItem
              key="default-folder"
              title={defaultFolderName}
              onClick={() => setSelectedFolderId(null)}
              active={selectedFolderId == null}
              icon={<FolderIcon/>}
              hideContextMenu
            />
            {folders?.map((folder, folderIndex) => (
              <MaterialsMenuListItem
                onClick={() => setSelectedFolderId(folder.id)}
                onDelete={() => deleteFolder({ folderId: folder.id })}
                onRename={(newName) => renameFolder({
                  folderId: folder.id,
                  newName
                })}
                key={folderIndex}
                title={folder.name}
                active={folder.id === selectedFolderId}
                icon={<FolderIcon/>}
              />
            ))}
            <div css={styles.createButton}>
              <LinkButton
                icon={<Plus/>}
                onClick={() => setShowCreateFolderModal(true)}
                title="Create new folder"
              />
            </div>
          </Menu.Dropdown>
        </Menu> 
        <div className="folder-options">
          {selectedFolderId && (
            <Button<"button"> 
              styleType="secondarySubtle" 
              onClick={() => { setShowRenameModal(true); }} 
              size="medium" 
              leftIcon={<Edit/>}>
              Rename
            </Button>
          )}
          {/* TO BE IMPLEMENTED LATER */}
          {/* <Button<"button"> styleType="secondarySubtle" size="medium" leftIcon={<DownloadIcon/>}>Download</Button> */}
          {selectedFolderId && 
            (
              <Button<"button"> 
                styleType="secondarySubtle" 
                onClick={() => { setShowDeleteModal(true); }} 
                size="medium" 
                leftIcon={<Trash/>}>
                Delete
              </Button>
            )}
        </div>
      </div>
      {/* MODAL _____________________________ */}
      <Modal
        lockScroll={false}
        opened={showCreateFolderModal}
        onClose={() => setShowCreateFolderModal(false)}
        title=""
        styles={styles.modalStyles()}
        withCloseButton={false}
        centered>
        <span className="close-btn" onClick={() => setShowCreateFolderModal(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3}>Create folder</Title>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="new-folder-input">
            <BodyText styleType="body-01-regular" component="label">Folder name</BodyText>
            <Input
              inputType="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.currentTarget.value)}
            />
          </div>
          <div className="modal-call-to-action">
            <Button<"button">
              styleType={"secondarySimple" as TButton["styleType"]}
              onClick={() => setShowCreateFolderModal(false)}>
              Cancel
            </Button>
            <Button<"button">
              type="submit"
              styleType="primary"
              disabled={newFolderName.trim().length <= 0}
              onClick={() =>
              {
                setNewFolderName("");
                createFolder({ name: newFolderName });
                setShowCreateFolderModal(false);
              }}>Create
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        lockScroll={false}
        opened={showRenameModal}
        withCloseButton={false}
        centered
        styles={styles.modalStyles()}
        onClose={() => { setShowRenameModal(false); }}>
        <span className="close-btn" onClick={() => setShowRenameModal(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3}>Rename folder</Title>
        <form onSubmit={e => e.preventDefault()}>
          <div className="new-folder-input">
            <BodyText styleType="body-01-regular" component="label">Folder name</BodyText>
            <Input
              inputType="text"
              value={newFolderName}
              onChange={(e) => { setNewFolderName(e.target.value); }}
            />
          </div>
          <div className="modal-call-to-action">
            <Button<"button">
              styleType={"secondarySimple" as TButton["styleType"]}
              onClick={() => setShowRenameModal(false)}>
              Cancel
            </Button>
            <Button<"button">
              styleType="primary"
              type="submit"
              disabled={newFolderName?.trim()?.length <= 0}
              onClick={() =>
              {
                setShowRenameModal(false);
                // just a state this can be an empty string
                setNewFolderName(currentFolder?.name ?? "");
                if(currentFolder && currentFolder.id)
                {
                  renameFolder({ folderId: currentFolder?.id, newName: newFolderName });
                }
              }}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        lockScroll={false}
        opened={showDeleteModal}
        withCloseButton={false}
        centered
        styles={styles.modalStyles()}
        onClose={() => { setShowDeleteModal(false); }}>
        <span className="close-btn" onClick={() => setShowDeleteModal(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3}>Delete folder</Title>
        <BodyText
          mb={24}
          mt={16}
          styleType="body-01-regular"
          component="p"
          className="delete-folder-text">Are you sure you want to delete <strong>{currentFolder?.name}</strong>?
        </BodyText>
        <div className="modal-call-to-action">
          <Button<"button">
            styleType={"secondarySimple" as TButton["styleType"]}
            onClick={() => setShowDeleteModal(false)}>
            No, Keep
          </Button>
          <Button<"button">
            styleType="primary"
            onClick={() => 
            {
              setShowDeleteModal(false);
              if(currentFolder && currentFolder.id)
              {
                deleteFolder({ folderId: currentFolder?.id });
              }
            }}>
            Yes, Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FoldersMenuTablet;
