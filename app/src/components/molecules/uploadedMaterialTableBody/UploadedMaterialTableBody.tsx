/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { FileIcon } from "@/components/Icons/FileIcon";
import { ImageIcon } from "@/components/Icons/image";
import { Notepad } from "@/components/Icons/Notepad";
import { VideoIcon } from "@/components/Icons/Video";
import MaterialOptionsMenu from "@/components/materialsOptionsMenu/MaterialsOptionsMenu";
import { type UploadedFile } from "@/db/schema";
import useMaterialsStore from "@/stores/materials.store";

import {
  useMantineTheme 
} from "@mantine/core";
// import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialTableBody.styles";
interface UploadedMaterialTableBodyProps
{
  // readonly selectedFolderId: string | null;
  readonly setSelectedFileNote: React.Dispatch<React.SetStateAction<UploadedFile | undefined>>;
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

const UploadedMaterialTableBody: FunctionComponent<UploadedMaterialTableBodyProps> = ({
  // selectedFolderId,
  setSelectedFileNote,
  setShowNoteDrawer,
  showingFiles,
  uploadedFiles,
  variant = "personalSpace"
}) => 
{
  const theme = useMantineTheme();
  const { setSelectedFileIdForPreview, setShowFileViewerModal } = useMaterialsStore();
  return (
    <>
      {uploadedFiles?.slice(0, showingFiles).map((file, index) => (
        <tr
          key={index}>
          {variant === "personalSpace" && <td><Checkbox/></td>}
          <td
            css={styles.docName({ clickable: true, theme })}
            className="primaryCell"
            onClick={() => 
            {
              if(file?.id)
              {
                console.log("file", file);
                setSelectedFileIdForPreview(file.id);
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
          {variant === "searchPapers" && <td/>}
          {file && <MaterialOptionsMenu file={file}/>}
        </tr>
      ))}
    </>
  );
};

export default UploadedMaterialTableBody;
