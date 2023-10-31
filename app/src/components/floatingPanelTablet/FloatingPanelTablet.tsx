import {
  Drawer, type ModalBaseStylesNames, type Styles, UnstyledButton 
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState, type FunctionComponent } from "react";

import * as styles from "./FloatingPanelTablet.styles";
import { BoxIcon } from "../Icons/BoxIcon";
import { FileIcon } from "../Icons/FileIcon";
// import { NotepadFilled } from "../Icons/NotepadFilled";
import SlidingPanelTitle from "../molecules/slidingPanelTitle/SlidingPanelTitle";
import FloatingPanel, { type IFloatingPanelProps } from "../organisms/floatingPanel/FloatingPanel";

const FloatingPanelTablet: FunctionComponent<IFloatingPanelProps> = (props) => 
{
  const [opened, { close, open }] = useDisclosure(false);
  const drawerStyles: Styles<ModalBaseStylesNames> = { body: { padding: 0 } };
  const { variant } = props;
  const [selectedTab, setSelectedTab] = useState<"Gliederung" | "Sachverhalt">("Gliederung");
  return (
    <div css={styles.wrapper}>
      <div css={styles.buttonsGroup}>
        {/* <UnstyledButton onClick={() => { console.log("floating panel tablet note button"); }}><NotepadFilled/>Notes</UnstyledButton> */}
        <UnstyledButton onClick={() => 
        {
          setSelectedTab("Gliederung");
          open();
        }}><FileIcon/>Gliederung
        </UnstyledButton>
        {variant === "case" && (
          <UnstyledButton onClick={() => 
          {
            setSelectedTab("Sachverhalt");
            open();
          }}><BoxIcon/>Sachverhalt
          </UnstyledButton>
        )}
      </div>
      <Drawer
        withCloseButton={false}
        lockScroll={false}
        opened={opened}
        position="right"
        size="lg"
        styles={drawerStyles}
        onClose={close}>
        <SlidingPanelTitle closeButtonAction={close} title="Gliederung & Sachverhalt" variant="default"/>
        <div className="custom-content">
          <FloatingPanel selectedTab={selectedTab} {...props}/>
        </div>
      </Drawer>
    </div>
  );
};

export default FloatingPanelTablet;
