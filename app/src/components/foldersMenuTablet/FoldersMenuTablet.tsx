/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Input } from "@/components/atoms/Input/Input";
import { Cross } from "@/components/Icons/Cross";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useUploadFolders from "@/hooks/useUploadFolders";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useMaterialsStore from "@/stores/materials.store";
import { api } from "@/utils/api";
import { defaultFolderName } from "@/utils/translations";

import { Menu, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent } from "react";

import * as styles from "./FoldersMenuTablet.styles";
import { Button, type TButton } from "../atoms/Button/Button";
import IconButton from "../atoms/iconButton/IconButton";
import { LinkButton } from "../atoms/LinkButton/LinkButton";
import MaterialsMenuListItem from "../atoms/materialMenuListItem/MaterialsMenuListItem";
import { ArrowDown } from "../Icons/ArrowDown";
import { Edit } from "../Icons/Edit";
import { FolderIcon } from "../Icons/Folder";
import { Plus } from "../Icons/Plus";
import { Trash } from "../Icons/Trash";

const FoldersMenuTablet: FunctionComponent = () => 
{
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);
  const setSelectedFolderId = useMaterialsStore(s => s.setSelectedFolderId);
  const { folders = [] } = useUploadFolders();
  const { invalidateFolders } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const [opened, { close, open }] = useDisclosure(false);
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
          radius={12}
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
                onClick={open}
                title="Create new folder"
              />
            </div>
          </Menu.Dropdown>
        </Menu> 
        <div className="folder-options">
          {selectedFolderId && (
            <Button<"button"> 
              styleType="secondarySubtle" 
              onClick={() => { console.log("rename btn"); }} 
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
                onClick={() => { console.log("delete btn"); }} 
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
        opened={opened}
        onClose={close}
        title=""
        styles={styles.modalStyles()}
        withCloseButton={false}
        centered>
        <span className="close-btn" onClick={close}>
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
              onClick={close}>
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
                close();
              }}>Create
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FoldersMenuTablet;
