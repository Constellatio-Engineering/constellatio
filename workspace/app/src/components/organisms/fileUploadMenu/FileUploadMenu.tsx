import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { Cross } from "@/components/Icons/Cross";
import { FileIcon } from "@/components/Icons/FileIcon";
import FileUploadListItem from "@/components/molecules/fileUploadListItem/FileUploadListItem";
import { type UploadState } from "@/stores/uploadsProgress.store";

import { ScrollArea } from "@mantine/core";
import { Fragment, type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./FileUploadMenu.styles";

interface FileUploadMenuProps
{
  readonly uploads: UploadState[];
}

const FileUploadMenu: FunctionComponent<FileUploadMenuProps> = ({ uploads }) => 
{
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const areUploadsInProgress = uploads.some(u => u.state.type === "uploading");
  const uploadedFilesCount = uploads.length;

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
        <SubtitleText styleType="subtitle-01-medium">{uploadedFilesCount > 1 ? `${uploadedFilesCount} Uploads abgeschlossen` : `${uploadedFilesCount} Upload abgeschlossen`}</SubtitleText>
        {/* {areUploadsInProgress ? "Cancel" : <span onClick={() => setIsShowMenu(false)}><Cross/></span>} */}
        <span onClick={() => setIsShowMenu(false)}><Cross/></span>
      </div>
      <div css={styles.menuList}>
        <ScrollArea
          h={200}
          sx={{ borderRadius: "12px" }}>
          {uploads.map((upload: UploadState, index: number) => upload && (
            <Fragment key={index}>
              <FileUploadListItem
                file={upload}
                title={upload.fileNameWithExtension}
                fileIcon={<FileIcon/>}
                progress={upload.state.type === "uploading" ? upload.state.progressInPercent : 100}
              />
            </Fragment>
          )).reverse()}
        </ScrollArea>
      </div>
    </div>
  );
};

export default FileUploadMenu;
