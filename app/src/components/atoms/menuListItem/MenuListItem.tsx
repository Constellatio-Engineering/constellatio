import { Cross } from "@/components/Icons/Cross";
import { DotsIcon } from "@/components/Icons/dots";
import { Edit } from "@/components/Icons/Edit";
import { MoveDownIcon } from "@/components/Icons/MoveDown";
import { Trash } from "@/components/Icons/Trash";
import CutomAlertCard from "@/components/molecules/cutomAlertCard/CutomAlertCard";

import {
  Menu, Modal, Title, useMantineTheme 
} from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./MenuListItem.styles";
import { BodyText } from "../BodyText/BodyText";
import { Button, type TButton } from "../Button/Button";
import { Input } from "../Input/Input";

interface MenuListItemProps
{
  readonly active?: boolean;
  readonly icon: React.ReactNode;
  readonly onClick: () => void;
  readonly onDelete: () => void;
  readonly title: string;
}

const MenuListItem: FunctionComponent<MenuListItemProps & React.HTMLProps<HTMLButtonElement>> = ({
  active,
  icon,
  onClick,
  onDelete,
  title,
}) =>
{
  const [showRenameModal, setShowRenameModal] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [newFolderName, setNewFolderName] = React.useState<string>("");
  const theme = useMantineTheme();
  return (
    <>
      <button type="button" onClick={onClick} css={styles.wrapper({ active, theme })}>
        <Menu width={250} position="left-start">
          <BodyText styleType="body-01-medium" component="p">
            <span css={styles.label} title={title}>{icon}{title}</span><Menu.Target><span className="dots"><DotsIcon/></span></Menu.Target>
          </BodyText>
          {/* Menu content */}
          <Menu.Dropdown>
            <Menu.Item><span css={styles.dropDownLabel} onClick={() => setShowRenameModal(true)}><Edit/>Rename</span></Menu.Item>
            <Menu.Item><span css={styles.dropDownLabel}><MoveDownIcon/>Download</span></Menu.Item>
            <Menu.Item>
              <span
                onClick={() => setShowDeleteModal(true)}
                css={styles.dropDownLabel}><Trash/>Delete
              </span>
            </Menu.Item>
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
        {/* {err.type && <CutomAlertCard variant="error" message={err.message}/>} */}
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
            disabled={newFolderName?.trim()?.length <= 0}
            onClick={() => {}}>
            Save
          </Button>
        </div>
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
        {/* {err.type && <CutomAlertCard variant="error" message={err.message}/>} */}
        <BodyText styleType="body-01-regular" component="p">Are you sure you want to delete <strong>Folder name</strong>?</BodyText>
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
              onDelete();
            }}>
            Yes, Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MenuListItem;
