import { Cross } from "@/components/Icons/Cross";
import { DotsIcon } from "@/components/Icons/dots";
import { Edit } from "@/components/Icons/Edit";
import { MoveDownIcon } from "@/components/Icons/MoveDown";
import { Trash } from "@/components/Icons/Trash";

import {
  Menu, Modal, Title, useMantineTheme 
} from "@mantine/core";
import React, { type HTMLProps, type ReactNode, useState, type FunctionComponent } from "react";

import * as styles from "./../materialMenuListItem/MenuListItem.styles";
import { BodyText } from "../BodyText/BodyText";
import { Button, type TButton } from "../Button/Button";
import { Input } from "../Input/Input";

interface MenuListItemProps
{
  readonly active?: boolean;
  readonly icon: ReactNode;
  readonly onClick: () => void;
  readonly onDelete?: () => void;
  readonly onRename?: (newName: string) => void;
  readonly title: string;
}

const MaterialsMenuListItem: FunctionComponent<MenuListItemProps & HTMLProps<HTMLButtonElement>> = ({
  active,
  icon,
  onClick,
  onDelete,
  onRename,
  title,
}) =>
{
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const theme = useMantineTheme();

  return (
    <div>
      <button type="button" onClick={onClick} css={styles.wrapper({ active, theme })}>
        <Menu
          width={200}
          position="bottom-end"
          offset={{
            crossAxis: 0,
            mainAxis: 0
          }}>
          <BodyText styleType="body-01-medium" component="p">
            <span css={styles.label} title={title}>{icon}{title}</span>
            <Menu.Target>
              <span className="dots" onClick={e => e.stopPropagation()}><DotsIcon/></span>
            </Menu.Target>
          </BodyText>
          <Menu.Dropdown>
            {onRename && (
              <Menu.Item>
                <span css={styles.dropDownLabel} onClick={() => setShowRenameModal(true)}><Edit/>Rename</span>
              </Menu.Item>
            )}
            <Menu.Item><span css={styles.dropDownLabel}><MoveDownIcon/>Download</span></Menu.Item>
            {onDelete && (
              <Menu.Item>
                <span
                  onClick={() => setShowDeleteModal(true)}
                  css={styles.dropDownLabel}><Trash/>Delete
                </span>
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </button>
      <Modal
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
                onRename?.(newFolderName);
              }}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        opened={showDeleteModal}
        withCloseButton={false}
        centered
        styles={styles.modalStyles()}
        onClose={() => { setShowDeleteModal(false); }}>
        <span className="close-btn" onClick={() => setShowDeleteModal(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3}>Delete folder</Title>
        <BodyText styleType="body-01-regular" component="p" className="delete-folder-text">Are you sure you want to delete <strong>Folder name</strong>?</BodyText>
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
              onDelete?.();
            }}>
            Yes, Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MaterialsMenuListItem;
