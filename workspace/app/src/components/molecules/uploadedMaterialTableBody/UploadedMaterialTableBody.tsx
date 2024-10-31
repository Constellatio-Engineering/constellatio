/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { FileWhiteIcon } from "@/components/Icons/FileWhite";
import { FolderIcon } from "@/components/Icons/Folder";
import { ImageIcon } from "@/components/Icons/image";
import { Notepad } from "@/components/Icons/Notepad";
import { NotepadFilled } from "@/components/Icons/NotepadFilled";
import { VideoIcon } from "@/components/Icons/Video";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { type UploadedFileWithNote } from "@/hooks/useUploadedFilesWithNotes";
import useUploadFolders from "@/hooks/useUploadFolders";
import useMaterialsStore from "@/stores/materials.store";
import useNoteEditorStore from "@/stores/noteEditor.store";
import { useTagsEditorStore } from "@/stores/tagsEditor.store";
import { getFolderName } from "@/utils/folders";

import { type UploadedFile } from "@constellatio/db/schema";
import { type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialTableBody.styles";
import MaterialOptionsMenu from "../materialsOptionsMenu/MaterialsOptionsMenu";

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
      return <FileWhiteIcon/>;
    case "docx":
      return <FileWhiteIcon/>;
    case "xls":
      return <FileWhiteIcon/>;
    case "xlsx":
      return <FileWhiteIcon/>;
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
  readonly showingFiles: number;
  readonly uploadedFiles?: UploadedFileWithNote[];
  readonly variant: "personalSpace" | "searchPapers";
}

const UploadedMaterialTableBody: FunctionComponent<UploadedMaterialTableBodyProps> = ({
  showingFiles,
  uploadedFiles,
  variant = "personalSpace",
}) => 
{
  const openTagsDrawer = useTagsEditorStore(s => s.openEditor);
  const { setSelectedFileIdForPreview, setShowFileViewerModal } = useMaterialsStore();
  const setViewNoteState = useNoteEditorStore(s => s.setViewNoteState);
  const setCreateNoteState = useNoteEditorStore(s => s.setCreateNoteState);
  const { folders } = useUploadFolders();

  return (
    <>
      {uploadedFiles?.slice(0, showingFiles).filter(Boolean).map((file) =>
      {
        const { note } = file;
        const folderName = getFolderName(file.folderId, folders);

        return (
          <tr key={file.id}>
            {variant === "personalSpace" && 
            // <td><Checkbox/></td>
            <></>}
            <td
              css={styles.docName({ clickable: true })}
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
            <td css={styles.docDate}>
              <BodyText styleType="body-01-medium" component="p">
                {file && file.createdAt && formatDate(file.createdAt)}
              </BodyText>
            </td>
            <td css={styles.docTags}>
              <UnstyledButton onClick={() => openTagsDrawer({
                data: file,
                entityType: "user-uploads"
              })}>
                <BodyText styleType="body-02-medium" component="p">
                  {file.tags.length === 0 && "Hinzufügen"}
                  {file.tags.length > 0 && `Tags (${file.tags.length})`}
                </BodyText>
              </UnstyledButton>
            </td>
            {variant === "personalSpace" && (
              <td
                css={styles.cellNote}
                onClick={() =>
                {
                  if(note)
                  {
                    setViewNoteState(note);
                  }
                  else
                  {
                    setCreateNoteState({ fileId: file.id });
                  }
                }}>
                <BodyText
                  styleType="body-02-medium"
                  component="p"
                  tt="capitalize">
                  {note ? (
                    <>
                      <NotepadFilled/>
                      Ansehen
                    </>
                  ) : (
                    <>
                      <Notepad/>
                      Erstellen
                    </>
                  )}
                </BodyText>
              </td>
            )}
            {variant === "searchPapers" && (
              <td css={styles.cellFolder}>
                <BodyText
                  styleType="body-02-medium"
                  c="neutrals-01.9"
                  component="p">
                  <FolderIcon/>
                  {folderName}
                </BodyText>
              </td>
            )}
            {file && (
              <MaterialOptionsMenu file={file}/>
            )}
          </tr>
        );
      })}
    </>
  );
};

export default UploadedMaterialTableBody;
