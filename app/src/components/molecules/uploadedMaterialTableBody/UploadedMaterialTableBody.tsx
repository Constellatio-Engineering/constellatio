import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { DropdownItem } from "@/components/atoms/Dropdown/DropdownItem";
import { DotsIcon } from "@/components/Icons/dots";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Edit } from "@/components/Icons/Edit";
import { FileIcon } from "@/components/Icons/FileIcon";
import { FolderIcon } from "@/components/Icons/Folder";
import { ImageIcon } from "@/components/Icons/image";
import { Notepad } from "@/components/Icons/Notepad";
import { Trash } from "@/components/Icons/Trash";
import { VideoIcon } from "@/components/Icons/Video";
import { type UploadedFile } from "@/db/schema";
import { api } from "@/utils/api";

import { Menu, useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialTableBody.styles";

interface UploadedMaterialTableBodyProps
{
  readonly setSelectedFileIdForPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly setSelectedFileNote: React.Dispatch<React.SetStateAction<UploadedFile | undefined>>;
  readonly setShowFileViewerModal: React.Dispatch<React.SetStateAction<boolean>>; 
  readonly setShowNoteDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  readonly showingFiles: number;
  readonly uploadedFiles?: Partial<UploadedFile[]>;
  readonly variant: "personalSpace" | "searchPapers";
}

const fileNameIcon = (file: UploadedFile): React.ReactNode =>
{
  switch (file?.fileExtension?.toLowerCase())
  {
    case "png":
      return <ImageIcon/>;
    case "jpeg":
    case "jpg":
      return <ImageIcon/>;
    case "pdf":
      return <FileIcon/>;
    case "docx":
      return <FileIcon/>;
    case "xls":
      return <FileIcon/>;
    case "xlsx":
      return <FileIcon/>;
    case "mp4":
      return <VideoIcon/>;
    default:
      console.error(`Unknown file extension ${file.fileExtension}`);
      return null;
  }
};
const formatDate = (date: Date): string => `${String(date?.getDate()).padStart(2, "0")}.${String(date?.getMonth() + 1).padStart(2, "0")}.${date?.getFullYear()}`;

const UploadedMaterialTableBody: FunctionComponent<Partial<UploadedMaterialTableBodyProps>> = ({
  setSelectedFileIdForPreview,
  setSelectedFileNote,
  setShowFileViewerModal,
  setShowNoteDrawer,
  showingFiles,
  uploadedFiles,
  variant = "personalSpace"
}) => 
{
  const apiContext = api.useContext();
  const { mutate: deleteFile } = api.uploads.deleteUploadedFiles.useMutation({
    onError: (e) => console.log("error while deleting file", e),
    onSuccess: async () => apiContext.uploads.getUploadedFiles.invalidate()
  });
  const theme = useMantineTheme();
  return (
    <>
      {uploadedFiles?.slice(0, showingFiles).map((file, index) => (
        <tr
          key={index}>
          {variant === "personalSpace" && <td css={styles.callToActionCell}><Checkbox/></td>}
          <td
            css={styles.docName({ clickable: setSelectedFileIdForPreview && setShowFileViewerModal ? true : false, theme })}
            className="primaryCell"
            onClick={() => 
            {
              if(setSelectedFileIdForPreview && setShowFileViewerModal)
              {
                setSelectedFileIdForPreview(file?.id);
                setShowFileViewerModal(true);
              }  
            }}>
            <BodyText styleType="body-01-medium" component="p" title={file?.originalFilename}>
              {file && file.fileExtension && fileNameIcon(file)}{file?.originalFilename}
            </BodyText>
          </td>
          <td css={styles.docDate}> <BodyText styleType="body-01-medium" component="p">{file && file.createdAt && formatDate(file.createdAt)}</BodyText></td>
          <td css={styles.docTags}> <BodyText styleType="body-02-medium" component="p"/></td>
          {variant === "personalSpace" && (
            <td css={styles.cellNote}>
              <BodyText
                styleType="body-02-medium"
                component="p"
                onClick={() => 
                {
                  if(setSelectedFileNote && setShowNoteDrawer)
                  {
                    setSelectedFileNote(file);
                    setShowNoteDrawer(true);
                  }
                }}><Notepad/>Add Notes
              </BodyText>
            </td>
          )}
          <Menu shadow="elevation-big" radius="12px" width={200}>
            <Menu.Target>
              <td
                onClick={() => file && deleteFile({ fileIds: [file.id] })}
                css={styles.callToActionCell}>
                <span>
                  <button type="button" css={styles.callToActionCell}>
                    <DotsIcon/>
                  </button>
                </span>  
              </td>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item><DropdownItem icon={<Edit/>} label="Rename" onClick={() => { }}/></Menu.Item>
              <Menu.Divider/>
              <Menu.Item><DropdownItem icon={<FolderIcon/>} label="Move to" onClick={() => { }}/></Menu.Item>
              <Menu.Divider/>
              <Menu.Item><DropdownItem icon={<DownloadIcon/>} label="Download" onClick={() => { }}/></Menu.Item>
              <Menu.Divider/>
              <Menu.Item><DropdownItem icon={<Trash/>} label="Delete" onClick={() => { }}/></Menu.Item>
            </Menu.Dropdown>
          </Menu>
        
        </tr>
      ))}
    </>
  );
};

export default UploadedMaterialTableBody;
