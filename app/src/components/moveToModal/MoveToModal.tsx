import { useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState, type FunctionComponent } from "react";

import * as styles from "./MoveToModal.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import CustomRadio from "../customRadio/CustomRadio";
import { FolderIcon } from "../Icons/Folder";
import { Modal } from "../molecules/Modal/Modal";

const MoveToModal: FunctionComponent = () => 
{ 
  const theme = useMantineTheme();
  // const selected = true;
  const [selectedNewFolder, setSelectedNewFolder] = useState("");
  const [opened, { close }] = useDisclosure(false);
  const existingFolders = ["folder1", "folder2"];
  return (
    <Modal
      onClose={close}
      opened={opened}
      lockScroll={false}
      title="Move item to:" 
      radius={12}
      styles={{
        body: {
          padding: "0"
        },
        close: {
          height: "32px",
          svg: {
            color: "black",
            height: "26px !important",
            width: "26px !important",
          },
          width: "32px",
        },
        title: {
          fontFamily: theme.headings.fontFamily,
          fontSize: theme.fontSizes["spacing-24"],
          fontWeight: 400,
          lineHeight: theme.spacing["spacing-36"],
        }
      }}
      centered>
      {existingFolders?.map((folder, folderIndex) => (
        <div
          css={styles.item({ selected: selectedNewFolder === folder, theme })}
          key={folderIndex}
          onClick={(e) => 
          {
            const checkbox = e.currentTarget?.firstChild?.firstChild?.firstChild?.firstChild;
            if(checkbox && "checked" in checkbox) 
            {
              checkbox.checked = true;
              setSelectedNewFolder(folder);
            }
          }}>
          <CustomRadio name="check" value={folder}/>
          <FolderIcon/>
          <BodyText styleType="body-01-medium" htmlFor={folder} component="label">{folder}</BodyText>
        </div>
      ))}
      <div css={styles.callToAction}>
        <Button<"button">
          styleType="secondarySimple"
          size="large"
          onClick={close}>
          Cancel
        </Button>
        <Button<"button">
          styleType="primary"
          size="large"
          onClick={close}>
          Move
        </Button>
      </div>
    </Modal>
  );
};

export default MoveToModal;
