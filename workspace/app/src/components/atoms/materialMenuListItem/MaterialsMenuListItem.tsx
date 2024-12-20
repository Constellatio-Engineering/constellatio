import { Cross } from "@/components/Icons/Cross";
import { DotsIcon } from "@/components/Icons/dots";
import { Edit } from "@/components/Icons/Edit";
import { Trash } from "@/components/Icons/Trash";

import { Menu, Modal, Title } from "@mantine/core";
import { type FunctionComponent, type HTMLProps, type ReactNode, useState } from "react";

import { BodyText } from "../BodyText/BodyText";
import { Button, type TButton } from "../Button/Button";
import { DropdownItem } from "../Dropdown/DropdownItem";
import { Input } from "../Input/Input";
import * as styles from "./../materialMenuListItem/MenuListItem.styles";

interface MenuListItemProps
{
  readonly active?: boolean;
  readonly hideContextMenu?: boolean;
  readonly icon: ReactNode;
  readonly onClick: () => void;
  readonly onDelete?: () => void;
  readonly onRename?: (newName: string) => void;
  readonly title: string;
  readonly useItalicFont: boolean;
}

const MaterialsMenuListItem: FunctionComponent<MenuListItemProps & HTMLProps<HTMLButtonElement>> = ({
  active,
  hideContextMenu,
  icon,
  onClick,
  onDelete,
  onRename,
  title,
  useItalicFont,
}) =>
{
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>("");

  return (
    <>
      <div onClick={onClick} css={styles.wrapper({ active })}>
        <Menu
          width={200}
          position="bottom-end"
          offset={{
            crossAxis: 0,
            mainAxis: 0
          }}>
          <BodyText styleType={active ? "body-01-bold" : "body-01-medium"} component="p" italic={useItalicFont}>
            <span css={styles.label({ active })} title={title}>{icon}{title}</span>
            {!hideContextMenu && (
              <Menu.Target>
                <span className="dots" onClick={e => e.stopPropagation()}><DotsIcon/></span>
              </Menu.Target>
            )}
          </BodyText>
          <Menu.Dropdown>
            {onRename && (
              <Menu.Item onClick={e =>
              {
                e.stopPropagation();
                setShowRenameModal(true);
                setNewFolderName(title);
              }}>
                <DropdownItem icon={<Edit/>} label="Umbenennen"/>
              </Menu.Item>
            )}
            {/* <Menu.Item onClick={() => {}}>
              <DropdownItem icon={<MoveDownIcon/>} label="Herunterladen"/>
            </Menu.Item>*/}
            {onDelete && (
              <Menu.Item onClick={e =>
              {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}>
                <DropdownItem icon={<Trash/>} label="Löschen"/>
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </div>
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
        <Title order={3}>Datei umbenennen</Title>
        <form onSubmit={e => e.preventDefault()}>
          <div className="new-folder-input">
            <BodyText styleType="body-01-regular" component="label">Ordnername</BodyText>
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
              Abbrechen
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
              Speichern
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        lockScroll={false}
        keepMounted={false}
        opened={showDeleteModal}
        withCloseButton={false}
        centered
        styles={styles.modalStyles()}
        onClose={() => { setShowDeleteModal(false); }}>
        <span className="close-btn" onClick={() => setShowDeleteModal(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3}>Ordner löschen</Title>
        <BodyText styleType="body-01-regular" component="p" className="delete-folder-text">Bist du sicher, dass du den Ordner&nbsp;<strong>{title}</strong>&nbsp;löschen mächtest?</BodyText>
        <div className="modal-call-to-action">
          <Button<"button">
            styleType={"secondarySimple" as TButton["styleType"]}
            onClick={() => setShowDeleteModal(false)}>
            Nein, behalten
          </Button>
          <Button<"button">
            styleType="primary"
            onClick={() => 
            {
              setShowDeleteModal(false);
              onDelete?.();
            }}>
            Ja, löschen
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MaterialsMenuListItem;
