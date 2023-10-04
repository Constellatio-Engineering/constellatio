import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button, type TButton } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import MenuListItem from "@/components/atoms/menuListItem/MenuListItem";
import { Cross } from "@/components/Icons/Cross";
import { FolderIcon } from "@/components/Icons/Folder";
import { Plus } from "@/components/Icons/Plus";
import CutomAlertCard from "@/components/molecules/cutomAlertCard/CutomAlertCard";
import { type UploadFolder } from "@/db/schema";
import { api } from "@/utils/api";

import { Title, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
  const [err, setErr] = React.useState<{message: string;type: "create"|"delete"|null}>({ message: "", type: null });
  const [opened, { close, open }] = useDisclosure(false);

  const apiContext = api.useContext();
  const { mutate: createFolder } = api.uploads.createFolder.useMutation({
    onError: (error) => 
    {
      setErr({ message: error.message, type: "create" });
      console.error("error while creating folder", error);
    },
    onSuccess: async () => 
    {
      setErr({ message: "", type: null });
      await apiContext.uploads.getFolders.invalidate();
    }
  });
  const { mutate: deleteFolder } = api.uploads.deleteFolder.useMutation({
    onError: (error) => 
    {
      setErr(({ message: error.message, type: "delete" }));
      console.error("error while deleting folder", error);
    },
    onSuccess: async () => 
    {
      setErr({ message: "", type: null });
      await apiContext.uploads.getFolders.invalidate();
    }
  });
  const [newFolderName, setNewFolderName] = React.useState<string>("");
  
  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <Title order={4}>Your folders</Title>
      </div>      
      <div css={styles.content}>
        <MenuListItem
          key="default-folder"
          title="Default folder"
          onClick={() => setSelectedFolderId(null)}
          active={selectedFolderId == null}
          onDelete={() => window.alert("Default folder cannot be deleted for now")}
          icon={<FolderIcon/>}
        />
        {folders?.map((folder, folderIndex) => (
          <MenuListItem
            onClick={() => setSelectedFolderId(folder.id)}
            onDelete={() => deleteFolder({ folderId: folder.id })}
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
          <span className="close-btn">
            <Cross size={32}/>
          </span>
          <Title order={3}>Create folder</Title>
          {err.type && <CutomAlertCard variant="error" message={err.message}/>}
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
        </Modal>
      </div>
    </div>
  );
};

export default MaterialMenu;
