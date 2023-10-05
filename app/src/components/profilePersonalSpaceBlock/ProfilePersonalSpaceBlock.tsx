import React, { type FunctionComponent,useState } from "react";

import * as styles from "./ProfilePersonalSpaceBlock.styles";
import IconButton from "../atoms/iconButton/IconButton";
import { FolderIcon } from "../Icons/Folder";
import { CaptionText } from "../atoms/CaptionText/CaptionText";
import { SubtitleText } from "../atoms/SubtitleText/SubtitleText";
import { Tabs } from "@mantine/core";
import { Trash } from "../Icons/Trash";
import { Bookmark } from "../Icons/Bookmark";
import { FileIcon } from "../Icons/FileIcon";
import { Switcher } from "../molecules/Switcher/Switcher";
import { SwitcherTab } from "../atoms/Switcher-tab/SwitcherTab";

interface ProfilePersonalSpaceBlockProps
{

}

const ProfilePersonalSpaceBlock: FunctionComponent<ProfilePersonalSpaceBlockProps> = ({  }) => {
  
  const tabs = [{title:"favorites",number:0, icon:{src: <Bookmark/>}},{title:" materials",number:0,icon:{src:<FileIcon/>}}];
  const [selectedTab, setSelectedTab] = useState<number>(0)
  return (
    <div css={styles.wrapper}>
      <div css={styles.blockHead}>
       <div css={styles.blockHeadText}>
       <IconButton icon={<FolderIcon />} css={styles.blockHeadIcon} onClick={() => { } } size={"big"}/>
        <div>
          <div css={styles.blockHeadDescription}><CaptionText styleType={"caption-01-medium"} component="p">PERSONAL SPACE</CaptionText></div>
          <div css={styles.blockHeadTitle}><SubtitleText styleType="subtitle-01-medium" component="p">{tabs[selectedTab]?.number} {tabs[selectedTab]?.title}</SubtitleText></div>
        </div>
       </div>
       <div css={styles.blockHeadCallToAction}>
         {/* <Switch */}
         <Switcher
          className="switcher"
          size="medium"
          defaultValue={tabs[selectedTab]?.title}
          tabStyleOverwrite={{ flex: "1" }}>
         
            <Tabs.List>
              {tabs && tabs?.map((tab, tabIndex) => (
                <React.Fragment key={tabIndex}>
                  <SwitcherTab
                    icon={tab?.icon?.src ?? <Trash/>}
                    value={tab.title}
                    onClick={() => setSelectedTab(tabIndex)}
                    >{tab.title}
                  </SwitcherTab>
                </React.Fragment>
              ))}
            </Tabs.List>
          
        
        </Switcher>

       </div>
      </div>
    </div>
  );
};

export default ProfilePersonalSpaceBlock;
