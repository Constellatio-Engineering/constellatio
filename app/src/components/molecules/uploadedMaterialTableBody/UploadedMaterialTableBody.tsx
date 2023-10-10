/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { FileIcon } from "@/components/Icons/FileIcon";
import { ImageIcon } from "@/components/Icons/image";
import { Notepad } from "@/components/Icons/Notepad";
import { NotepadFilled } from "@/components/Icons/NotepadFilled";
import { VideoIcon } from "@/components/Icons/Video";
import MaterialOptionsMenu from "@/components/materialsOptionsMenu/MaterialsOptionsMenu";
import { type UploadedFile } from "@/db/schema";
import useMaterialsStore from "@/stores/materials.store";
import useNoteEditorStore from "@/stores/noteEditor.store";

import {
  useMantineTheme 
} from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialTableBody.styles";

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

interface UploadedMaterialTableBodyProps
{
  readonly selectedFolderId: string | null;
  readonly showingFiles: number;
  readonly uploadedFiles?: Partial<UploadedFile[]>;
  readonly variant: "personalSpace" | "searchPapers";
}

const UploadedMaterialTableBody: FunctionComponent<UploadedMaterialTableBodyProps> = ({
  selectedFolderId,
  showingFiles,
  uploadedFiles,
  variant = "personalSpace",
}) => 
{
  const theme = useMantineTheme();
  const { setSelectedFileIdForPreview, setShowFileViewerModal } = useMaterialsStore();
  const setEditNoteState = useNoteEditorStore(s => s.setEditNoteState);
  const setViewNoteState = useNoteEditorStore(s => s.setViewNoteState);

  return (
    <>
      {uploadedFiles?.slice(0, showingFiles).filter(Boolean).map((file) =>
      {
        const { note } = file;

        console.log("file", file.originalFilename, "note", file.note);

        return (
          <tr key={file.id}>
            {variant === "personalSpace" && <td><Checkbox/></td>}
            <td
              css={styles.docName({ clickable: true, theme })}
              className="primaryCell"
              onClick={() =>
              {
                setSelectedFileIdForPreview(file.id);
                setShowFileViewerModal(true);
              }}>
              <BodyText styleType="body-01-medium" component="p" title={file?.originalFilename}>
                {file.fileExtension && fileNameIcon(file)}{file?.originalFilename}
              </BodyText>
            </td>
            <td css={styles.docDate}><BodyText styleType="body-01-medium" component="p">{file && file.createdAt && formatDate(file.createdAt)}</BodyText></td>
            <td css={styles.docTags}><BodyText styleType="body-02-medium" component="p"/></td>
            {variant === "personalSpace" && (
              <td css={styles.cellNote}>
                <BodyText
                  styleType="body-02-medium"
                  component="p"
                  onClick={() =>
                  {
                    if(note)
                    {
                      setViewNoteState(file);
                    }
                    else
                    {
                      setEditNoteState(file);
                    }
                  }}>
                  {note ? <NotepadFilled/> : <Notepad/>}
                  Add Notes
                </BodyText>
              </td>
            )}
            {variant === "searchPapers" && <td/>}
            {file && <MaterialOptionsMenu file={file}/>}
          </tr>
        );
      })}
    </>
  );
};

export default UploadedMaterialTableBody;
