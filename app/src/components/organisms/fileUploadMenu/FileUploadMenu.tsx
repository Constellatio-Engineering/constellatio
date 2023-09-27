
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { Cross } from "@/components/Icons/Cross";
import { FileIcon } from "@/components/Icons/FileIcon";
import FileUploadListItem from "@/components/molecules/fileUploadListItem/FileUploadListItem";
import { type UploadState } from "@/stores/uploadsProgress.store";

import { ScrollArea } from "@mantine/core";
import React, { useEffect, type FunctionComponent } from "react";

import * as styles from "./FileUploadMenu.styles";

interface FileUploadMenuProps
{
  readonly uploads: UploadState[];
}

const FileUploadMenu: FunctionComponent<FileUploadMenuProps> = ({ uploads }) => 
{
  const [isShowMenu, setIsShowMenu] = React.useState<boolean>(false);

  const areUploadsInProgress = uploads.some(u => u.state.type === "uploading");
  // const theme = useMantineTheme();

  useEffect(() =>
  {
    if(areUploadsInProgress) 
    {
      setIsShowMenu(true);
    }
  }, [areUploadsInProgress]);

  return (
    <div css={styles.wrapper({ isShowMenu })}>
      <div css={styles.menuHeader}>
        <SubtitleText styleType="subtitle-01-medium">Upload {uploads?.length} files</SubtitleText>
        {areUploadsInProgress ? "Cancel" : <span onClick={() => setIsShowMenu(false)}><Cross/></span>}
      </div>
      <div css={styles.menuList}>
        <ScrollArea
          h={200}
          sx={{ borderRadius: "12px" }}>
          {
            uploads?.map((upload: UploadState, index: number) => upload && (
              <React.Fragment key={index}>
                <FileUploadListItem
                  file={upload}
                  title={upload.fileClientSideUuid}
                  fileIcon={<FileIcon/>}
                  progress={upload.state.type === "uploading" ? upload.state.progressInPercent : 100}
                />
              </React.Fragment>
            ))
          }
        </ScrollArea>
      </div>
    </div>
  );
};

export default FileUploadMenu;
