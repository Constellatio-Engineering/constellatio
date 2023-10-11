import CaisyImg from "@/basic-components/CaisyImg";

import { Modal, Tabs, Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./EditProfileImgModal.styles";
import FlagImgPlaceholder from "../../../public/images/placeholder-flag.png";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import IconButton from "../atoms/iconButton/IconButton";
import { SwitcherTab } from "../atoms/Switcher-tab/SwitcherTab";
import { Cross } from "../Icons/Cross";
import { DownloadIcon } from "../Icons/DownloadIcon";
import { Palette } from "../Icons/Palette";
import { Trash } from "../Icons/Trash";
import { Switcher } from "../molecules/Switcher/Switcher";

interface EditProfileImgModalProps
{
  readonly onClose: () => void;
  readonly opened: boolean;
}

const EditProfileImgModal: FunctionComponent<EditProfileImgModalProps> = ({ onClose, opened }) => 
{
  const tabs = [{ icon: <DownloadIcon/>, title: "Upload image" }, { icon: <Palette/>, title: "Constellatio library" }];
  const [selectedTab, setSelectedTab] = React.useState<string>(tabs?.[0]?.title ?? "");
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      lockScroll={false}
      title={<><Title order={3}>Change profile image</Title><button type="button" onClick={() => onClose()} css={styles.closeButton}><Cross/></button></>}
      styles={styles.modalStyles()}
      withCloseButton={false}
      centered>
      <CaisyImg
        onClick={() => {}}
        css={styles.profileImage}
        src="https://via.placeholder.com/120"
        width={120}
        height={120}
      />
      <Switcher
        className="switcher"
        size="big"
        defaultValue={selectedTab}
        tabStyleOverwrite={{ flex: "1" }}>
        <Tabs.List>
          {tabs && tabs?.map((tab, tabIndex) => (
            <React.Fragment key={tabIndex}>
              <SwitcherTab
                icon={tab?.icon ?? <Trash/>}
                value={tab.title}
                onClick={() => { setSelectedTab(tab.title); }}>{tab.title}
              </SwitcherTab>
            </React.Fragment>
          ))}
        </Tabs.List>
        {selectedTab === tabs[0]?.title && (
          <div css={styles.uploadImgCard} onClick={() => inputRef.current?.click()}>
            <IconButton
              icon={<DownloadIcon/>}
              size="big"
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
            />
            <BodyText styleType="body-01-bold" component="p">Drag & drop image here or click to upload</BodyText>
            <input type="file" accept="image/*" css={styles.uploadImgInput}/>
          </div>
        )}
        {selectedTab === tabs[1]?.title && (
          <div css={styles.libraryArea}>{
            [...new Array(3)].map((_, i) => (
              <CaisyImg
                key={i}
                onClick={() => { console.log(`clicked img: ${i + 1} from library`); }}
                css={styles.profileImage}
                src={FlagImgPlaceholder.src}
                width={90}
                height={90}
              />
            ))
          }
          </div>
        )}
        <Button<"button">
          css={styles.saveButton}
          styleType="primary"
          type="button"
          onClick={() => { console.log("Save image changes button clicked"); }}>Save changes
        </Button>
      </Switcher>
    </Modal>
  );
};

export default EditProfileImgModal;
