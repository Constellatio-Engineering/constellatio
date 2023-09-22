import React, { type FunctionComponent } from "react";

import * as styles from "./MaterialMenu.styles";
import { Title } from "@mantine/core";
import MenuListItem from "@/components/atoms/menuListItem/MenuListItem";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { Plus } from "@/components/Icons/Plus";
import { FolderIcon } from "@/components/Icons/Folder";

interface IFolder {
  title:string;
}

interface MaterialMenuProps
{
  readonly folders: Array<IFolder>;
}

const MaterialMenu: FunctionComponent<MaterialMenuProps> = ({ folders }) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <Title order={4}>Your folders</Title>
      </div>      
      <div css={styles.content}>
        {folders?.map((folder,folderIndex) => (
         <MenuListItem key={folderIndex} title={folder.title} active={folderIndex === 0 ? true : false} icon={<FolderIcon/>}/>
        ))}
      </div>
      <div css={styles.callToAction}>
        <LinkButton icon={<Plus/>} title={"Create new folder"}>View all</LinkButton>
      </div>
    </div>
  );
};

export default MaterialMenu;
