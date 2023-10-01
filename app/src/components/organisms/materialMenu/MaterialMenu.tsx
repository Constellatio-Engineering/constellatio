import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import MenuListItem from "@/components/atoms/menuListItem/MenuListItem";
import { FolderIcon } from "@/components/Icons/Folder";
import { Plus } from "@/components/Icons/Plus";
import { type UploadFolder } from "@/db/schema";
import { api } from "@/utils/api";

import { Title } from "@mantine/core";
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
  const apiContext = api.useContext();
  const { mutate: createFolder } = api.uploads.createFolder.useMutation({
    onError: (error) => console.error("error while creating folder", error),
    onSuccess: async () => apiContext.uploads.getFolders.invalidate()
  });
  const { mutate: deleteFolder } = api.uploads.deleteFolder.useMutation({
    onError: (error) => console.error("error while deleting folder", error),
    onMutate: () => console.log("deleting folder"),
    onSuccess: async () => apiContext.uploads.getFolders.invalidate()
  });

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
          onClick={() => createFolder({ name: `New Folder ${Date.now()}` })}
          title="Create new folder">View all
        </LinkButton>
      </div>
    </div>
  );
};

export default MaterialMenu;
