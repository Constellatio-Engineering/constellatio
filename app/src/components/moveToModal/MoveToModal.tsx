import { Title, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";

import * as styles from "./MoveToModal.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import CustomRadio from "../customRadio/CustomRadio";
import { FolderIcon } from "../Icons/Folder";
import { Modal } from "../molecules/Modal/Modal";

const MoveToModal: FunctionComponent = () => 
{ 
  const theme = useMantineTheme();
  const selected = true;
  const [opened, { close }] = useDisclosure(true);
  
  return (
    <Modal
      onClose={close}
      opened={opened}
      title={<Title order={3}>Move item to: </Title>}
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
      }}
      centered>
      <div css={styles.item({ selected, theme })}>
        <CustomRadio name="check" value="check1" checked/>
        <FolderIcon/>
        <BodyText styleType="body-01-medium" htmlFor="check1" component="label">Default folder</BodyText>
      </div>
      <div css={styles.item({ selected: false, theme })}>
        <CustomRadio name="check" value="check2"/>
        <FolderIcon/>
        <BodyText styleType="body-01-medium" htmlFor="check2" component="label">Folder</BodyText>
      </div> 
      <div css={styles.item({ selected: false, theme })}>
        <CustomRadio name="check" value="check3"/>
        <FolderIcon/>
        <BodyText styleType="body-01-medium" htmlFor="check3" component="label">Folder</BodyText>
      </div>
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
