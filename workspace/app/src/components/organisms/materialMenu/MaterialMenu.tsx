import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button, type TButton } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import MaterialsMenuListItem from "@/components/atoms/materialMenuListItem/MaterialsMenuListItem";
import { Cross } from "@/components/Icons/Cross";
import { FolderIcon } from "@/components/Icons/Folder";
import { Plus } from "@/components/Icons/Plus";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useDeleteFolder from "@/hooks/useDeleteFolder";
import useUploadFolders from "@/hooks/useUploadFolders";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useMaterialsStore from "@/stores/materials.store";
import { api } from "@/utils/api";
import { defaultFolderName, everythingFolderName } from "@/utils/translations";

import { Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { type FunctionComponent, useState } from "react";

import * as styles from "./MaterialMenu.styles";

const MaterialMenu: FunctionComponent = () =>
{
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);
  const setSelectedFolderId = useMaterialsStore(s => s.setSelectedFolderId);
  const { folders = [] } = useUploadFolders();
  const { invalidateFolders } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const [opened, { close, open }] = useDisclosure(false);
  const { mutate: deleteFolder } = useDeleteFolder();
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
  const [newFolderName, setNewFolderName] = useState<string>("");
  
  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <Title order={4}>Deine Ordner</Title>
      </div>      
      <div css={styles.content}>
        <MaterialsMenuListItem
          key="everything-folder"
          title={everythingFolderName}
          useItalicFont
          onClick={() => setSelectedFolderId(undefined)}
          active={selectedFolderId === undefined}
          icon={<FolderIcon/>}
          hideContextMenu
        />
        <MaterialsMenuListItem
          key="default-folder"
          title={defaultFolderName}
          useItalicFont
          onClick={() => setSelectedFolderId(null)}
          active={selectedFolderId === null}
          icon={<FolderIcon/>}
          hideContextMenu
        />
        {folders?.map((folder) => (
          <MaterialsMenuListItem
            onClick={() => setSelectedFolderId(folder.id)}
            useItalicFont={false}
            onDelete={() => deleteFolder({ folderId: folder.id })}
            onRename={(newName) => renameFolder({
              folderId: folder.id,
              newName
            })}
            key={folder.id}
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
          title="Neuen Ordner erstellen"   
        />
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
          <Title order={3}>Ordner erstellen</Title>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="new-folder-input">
              <BodyText styleType="body-01-regular" component="label">Ordnername</BodyText>
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
                Abbrechen
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
                }}>Erstellen
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default MaterialMenu;
