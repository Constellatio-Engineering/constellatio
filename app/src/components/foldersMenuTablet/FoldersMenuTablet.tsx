import { Menu, Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./FoldersMenuTablet.styles";
import { Button } from "../atoms/Button/Button";
import IconButton from "../atoms/iconButton/IconButton";
import { LinkButton } from "../atoms/LinkButton/LinkButton";
import MaterialsMenuListItem from "../atoms/materialMenuListItem/MaterialsMenuListItem";
import { ArrowDown } from "../Icons/ArrowDown";
import { DownloadIcon } from "../Icons/DownloadIcon";
import { Edit } from "../Icons/Edit";
import { FolderIcon } from "../Icons/Folder";
import { Plus } from "../Icons/Plus";
import { Trash } from "../Icons/Trash";

const FoldersMenuTablet: FunctionComponent = () => (
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
            <Title order={3}>Folder s name</Title>
            <ArrowDown size={28}/>
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <MaterialsMenuListItem
            onClick={() => {}}
            onDelete={() => {}}
            onRename={() => {}}
            title="folder.name"
            active={false}
            icon={<FolderIcon/>}
          />
          <MaterialsMenuListItem
            onClick={() => {}}
            onDelete={() => {}}
            onRename={() => {}}
            title="folder.name"
            active={false}
            icon={<FolderIcon/>}
          />
          <MaterialsMenuListItem
            onClick={() => {}}
            onDelete={() => {}}
            onRename={() => {}}
            title="folder.name"
            active={false}
            icon={<FolderIcon/>}
          />
          <div css={styles.createButton}>
            <LinkButton
              icon={<Plus/>}
              onClick={() => {}}
              title="Create new folder"
            />
          </div>
        </Menu.Dropdown>
      </Menu> 
      <div className="folder-options">
        <Button<"button"> styleType="secondarySubtle" size="medium" leftIcon={<Edit/>}>Rename</Button>
        <Button<"button"> styleType="secondarySubtle" size="medium" leftIcon={<DownloadIcon/>}>Download</Button>
        <Button<"button"> styleType="secondarySubtle" size="medium" leftIcon={<Trash/>}>Delete</Button>
      </div>
    </div>
  </div>
);

export default FoldersMenuTablet;
