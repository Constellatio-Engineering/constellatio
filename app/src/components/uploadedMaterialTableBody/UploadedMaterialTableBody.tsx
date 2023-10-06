import { type UploadedFile } from "@/db/schema";
import { api } from "@/utils/api";

import { Checkbox, Menu } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialTableBody.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { DotsIcon } from "../Icons/dots";
import { DownloadIcon } from "../Icons/DownloadIcon";
import { Edit } from "../Icons/Edit";
import { FileIcon } from "../Icons/FileIcon";
import { FolderIcon } from "../Icons/Folder";
import { ImageIcon } from "../Icons/image";
import { Notepad } from "../Icons/Notepad";
import { Trash } from "../Icons/Trash";
import { VideoIcon } from "../Icons/Video";

interface UploadedMaterialTableBodyProps
{
  readonly setSelectedFileIdForPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly setSelectedFileNote: React.Dispatch<React.SetStateAction<UploadedFile | undefined>>;
  readonly setShowFileViewerModal: React.Dispatch<React.SetStateAction<boolean>>; 
  readonly setShowNoteDrewer: React.Dispatch<React.SetStateAction<boolean>>;
  readonly showingFiles: number;
  readonly uploadedFiles?: UploadedFile[];
}

const fileNameIcon = (file: UploadedFile): React.ReactNode =>
{
  switch (file.fileExtension.toLowerCase())
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
      console.error("Unknown file extension", file.fileExtension);
      return null;
  }
};
const formatDate = (date: Date): string => `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

const UploadedMaterialTableBody: FunctionComponent<UploadedMaterialTableBodyProps> = ({
  setSelectedFileIdForPreview,
  setSelectedFileNote,
  setShowFileViewerModal,
  setShowNoteDrewer,
  showingFiles,
  uploadedFiles
}) => 
{
  const apiContext = api.useContext();
  const { mutate: deleteFile } = api.uploads.deleteUploadedFiles.useMutation({
    onError: (e) => console.log("error while deleting file", e),
    onSuccess: async () => apiContext.uploads.getUploadedFiles.invalidate()
  });

  return (
    <>
      {uploadedFiles?.slice(0, showingFiles).map((file, index) => (
        <tr
          key={index}>
          <td css={styles.callToActionCell}><Checkbox/></td>
          <td
            css={styles.docName}
            className="primaryCell"
            onClick={() => 
            {
              setSelectedFileIdForPreview(file.id);
              setShowFileViewerModal(true);
            }}>
            <BodyText styleType="body-01-medium" component="p" title={file.originalFilename}>
              {fileNameIcon(file)}{file.originalFilename}
            </BodyText>
          </td>
          <td css={styles.docDate}> <BodyText styleType="body-01-medium" component="p">{formatDate(file.createdAt!)}</BodyText></td>
          <td css={styles.docTags}> <BodyText styleType="body-02-medium" component="p">Tags ({0})</BodyText></td>
          <td css={styles.cellNote}>
            <BodyText
              styleType="body-02-medium"
              component="p"
              onClick={() => 
              {
                setSelectedFileNote(file);
                setShowNoteDrewer(true);
              }}><Notepad/>Add Notes
            </BodyText>
          </td>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <td
                onClick={() => deleteFile({ fileIds: [file.id] })}
                css={styles.callToActionCell}>
                <span>
                  <button type="button" css={styles.callToActionCell}>
                    <DotsIcon/>
                  </button>
                </span>  
              </td>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item><span className="label" onClick={() => { }}><Edit/>Rename</span></Menu.Item>
              <Menu.Divider/>
              <Menu.Item><span className="label"><FolderIcon/>Move to</span></Menu.Item>
              <Menu.Divider/>
              <Menu.Item><span className="label"><DownloadIcon/>Download</span></Menu.Item>
              <Menu.Divider/>
              <Menu.Item onClick={() => {}}><span className="label"><Trash/>Delete</span></Menu.Item>
            </Menu.Dropdown>
          </Menu>
        
        </tr>
      ))}
    </>
  );
};

export default UploadedMaterialTableBody;
