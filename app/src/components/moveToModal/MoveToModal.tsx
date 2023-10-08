import { Group, Modal, Radio, Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./MoveToModal.styles";
import { Button } from "../atoms/Button/Button";
import { DropdownItem } from "../atoms/Dropdown/DropdownItem";
import { FolderIcon } from "../Icons/Folder";

interface MoveToModalProps
{
  readonly action: () => void;
  readonly close: () => void;
  readonly isOpened: boolean;
}

const MoveToModal: FunctionComponent<MoveToModalProps> = ({ action, close, isOpened }) => 
{
  return (
    <Modal
      centered
      onClose={close}
      title={<Title order={3}>Move item to</Title>}
      opened={isOpened}>
     
      <Radio.Group
        name="folder"
        withAsterisk>
        <Group mt="xs">
          <Radio
            style={{ borderBottom: "1px solid #e0e0e0", padding: "18px 0", width: "100%" }}
            color="gray"
            label={<DropdownItem icon={<FolderIcon/>} label="Default Folder"/>}
            value="Default Folder"
          />
          <Radio
            style={{ borderBottom: "1px solid #e0e0e0", padding: "18px 0", width: "100%" }}
            color="gray"
            label={<DropdownItem icon={<FolderIcon/>} label="Default Folder1"/>}
            value="Default Folder1"
          />
          <Radio
            style={{ borderBottom: "1px solid #e0e0e0", padding: "18px 0", width: "100%" }}
            color="gray"
            label={<DropdownItem icon={<FolderIcon/>} label="Default Folder2"/>}
            value="Default Folder2"
          />
        </Group>
      </Radio.Group>
      <div style={{ marginTop: "32px" }}>
        <Button<"button"> styleType="primary">Click me</Button>
      </div>

    </Modal>
  );
};

export default MoveToModal;
