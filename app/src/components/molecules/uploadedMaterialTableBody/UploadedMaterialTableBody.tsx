/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button, type TButton } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { DropdownItem } from "@/components/atoms/Dropdown/DropdownItem";
import { Input } from "@/components/atoms/Input/Input";
import { Cross } from "@/components/Icons/Cross";
import { DotsIcon } from "@/components/Icons/dots";
// import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Edit } from "@/components/Icons/Edit";
import { FileIcon } from "@/components/Icons/FileIcon";
// import { FolderIcon } from "@/components/Icons/Folder";
import { ImageIcon } from "@/components/Icons/image";
import { Notepad } from "@/components/Icons/Notepad";
import { Trash } from "@/components/Icons/Trash";
import { VideoIcon } from "@/components/Icons/Video";
import { type UploadedFile } from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import {
  Menu, Modal, Title, useMantineTheme 
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialTableBody.styles";
interface UploadedMaterialTableBodyProps
{
  readonly selectedFolderId: string | null;
  readonly setSelectedFileIdForPreview?: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly setSelectedFileNote: React.Dispatch<React.SetStateAction<UploadedFile | undefined>>;
  readonly setShowFileViewerModal?: React.Dispatch<React.SetStateAction<boolean>>;
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
  selectedFolderId,
  setSelectedFileIdForPreview,
  setSelectedFileNote,
  setShowFileViewerModal,
  setShowNoteDrawer,
  showingFiles,
  uploadedFiles,
  variant = "personalSpace"
}) => 
{
  const theme = useMantineTheme();
  const { invalidateUploadedFiles } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutate: deleteFile } = api.uploads.deleteUploadedFiles.useMutation({
    onError: (e) => console.log("error while deleting file", e),
    onSuccess: async () =>
    {
      notifications.show({
        color: "green",
        message: "Die Datei wurde erfolgreich gelöscht",
        title: "Datei gelöscht"
      });
      await invalidateUploadedFiles({ folderId: selectedFolderId });
    }
  });
  const [showDeleteMaterialModal, setShowDeleteMaterialModal] = React.useState<boolean>(false);
  const [showRenameMaterialModal, setShowRenameMaterialModal] = React.useState<boolean>(false);

  return (
    <>
      {uploadedFiles?.slice(0, showingFiles).map((file, index) => (
        <tr
          key={index}>
          <td><Checkbox/></td>
          <td
            css={styles.docName({ clickable: !!(setSelectedFileIdForPreview && setShowFileViewerModal), theme })}
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
                css={styles.callToActionCell}
                onClick={() => {}}>
                <button type="button">
                  <DotsIcon/>
                </button>
              </td>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setShowRenameMaterialModal(true)}>
                <DropdownItem icon={<Edit/>} label="Rename"/>
              </Menu.Item>
              {/* <Menu.Divider/>
              <Menu.Item>
                <DropdownItem icon={<FolderIcon/>} label="Move to"/>
              </Menu.Item> */}
              {/* <Menu.Divider/>
              <Menu.Item>
                <DropdownItem icon={<DownloadIcon/>} label="Download"/>
              </Menu.Item> */}
              <Menu.Divider/>
              {/* <Menu.Item onClick={() => file && deleteFile({ fileIds: [file.id] })}><span className="label"><Trash/>Delete</span></Menu.Item> */}
              <Menu.Item onClick={() => setShowDeleteMaterialModal(true)}><DropdownItem icon={<Trash/>} label="Delete"/></Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {/* POP UPS ------------------------------------------------------------------------------------- */}
          <Modal
            opened={showDeleteMaterialModal}
            withCloseButton={false}
            centered
            styles={styles.modalStyles()}
            onClose={() => { setShowDeleteMaterialModal(false); }}>
            <span className="close-btn" onClick={() => setShowDeleteMaterialModal(false)}>
              <Cross size={32}/>
            </span>
            <Title order={3}>Delete folder</Title>
            <BodyText styleType="body-01-regular" component="p" className="delete-folder-text">Are you sure you want to delete <strong>Folder name</strong>?</BodyText>
            <div className="modal-call-to-action">
              <Button<"button">
                styleType={"secondarySimple" as TButton["styleType"]}
                onClick={() => setShowDeleteMaterialModal(false)}>
                No, Keep
              </Button>
              <Button<"button">
                styleType="primary"
                onClick={() => 
                {
                  if(file) { deleteFile({ fileIds: [file.id] }); }
                  setShowDeleteMaterialModal(false);
                }}>
                Yes, Delete
              </Button>
            </div>
          </Modal>
          <Modal
            opened={showRenameMaterialModal}
            withCloseButton={false}
            centered
            styles={styles.modalStyles()}
            onClose={() => { setShowRenameMaterialModal(false); }}>
            <span className="close-btn" onClick={() => setShowRenameMaterialModal(false)}>
              <Cross size={32}/>
            </span>
            <Title order={3}>Rename folder</Title>
            <form onSubmit={e => e.preventDefault()}>
              <div className="new-folder-input">
                <BodyText styleType="body-01-regular" component="label">Folder name</BodyText>
                <Input
                  inputType="text"
                  // value={newFolderName}
                  // onChange={(e) => { setNewFolderName(e.target.value); }}
                />
              </div>
              <div className="modal-call-to-action">
                <Button<"button">
                  styleType={"secondarySimple" as TButton["styleType"]}
                  onClick={() => setShowRenameMaterialModal(false)}>
                  Cancel
                </Button>
                <Button<"button">
                  styleType="primary"
                  type="submit"
                  // disabled={newFolderName?.trim()?.length <= 0}
                  onClick={() =>
                  {
                    setShowRenameMaterialModal(false);
                    // onRename?.(newFolderName);
                  }}>
                  Save
                </Button>
              </div>
            </form>
          </Modal>

        </tr>
      ))}
     
    </>
  );
};

export default UploadedMaterialTableBody;
