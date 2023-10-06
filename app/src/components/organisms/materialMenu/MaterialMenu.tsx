import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button, type TButton } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import MaterialsMenuListItem from "@/components/atoms/materialMenuListItem/MaterialsMenuListItem";
import { Cross } from "@/components/Icons/Cross";
import { FolderIcon } from "@/components/Icons/Folder";
import { Plus } from "@/components/Icons/Plus";
import { type UploadFolder } from "@/db/schema";
import { api } from "@/utils/api";

import { Title, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent } from "react";

import * as styles from "./MaterialMenu.styles";

interface MaterialMenuProps
{
  readonly folders: UploadFolder[];
  readonly selectedFolderId: string | null;
  readonly setSelectedFolderId: (folderId: string | null) => void;
}

const MaterialMenu: FunctionComponent<MaterialMenuProps> = ({ folders, selectedFolderId, setSelectedFolderId }) =>
{
  const [opened, { close, open }] = useDisclosure(false);
  const apiContext = api.useContext();
  const { mutate: createFolder } = api.folders.createFolder.useMutation({
    onError: (error) => 
    {
      console.error("error while creating folder", error);
      notifications.show({
        color: "red",
        message: "Der Ordner konnte nicht erstellt werden",
      });
    },
    onSuccess: async () => apiContext.folders.getFolders.invalidate()
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
    onSuccess: async () => apiContext.folders.getFolders.invalidate()
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
      await apiContext.folders.getFolders.invalidate();
      setSelectedFolderId(null);
      notifications.show({
        color: "green",
        message: "Der Ordner wurde erfolgreich gelöscht",
        title: "Ordner gelöscht"
      });
    }
  });
  const [newFolderName, setNewFolderName] = React.useState<string>("");
  
  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <Title order={4}>Your folders</Title>
      </div>      
      <div css={styles.content}>
        <MaterialsMenuListItem
          key="default-folder"
          title="Default folder"
          onClick={() => setSelectedFolderId(null)}
          active={selectedFolderId == null}
          icon={<FolderIcon/>}
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
      </div>
      <div css={styles.callToAction}>
        <LinkButton
          icon={<Plus/>}
          onClick={open}
          title="Create new folder"   
        />
        <Modal
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
    </div>
  );
};

export default MaterialMenu;
