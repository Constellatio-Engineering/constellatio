import { Button } from "@/components/atoms/Button/Button";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import UploadedMaterialTableBody from "@/components/molecules/uploadedMaterialTableBody/UploadedMaterialTableBody";
import UploadedMaterialTableHead from "@/components/molecules/uploadedMaterialTableHead/UploadedMaterialTableHead";
import { type UploadedFile } from "@/db/schema";

import React, { type FunctionComponent, useState } from "react";

import * as styles from "./UploadedMaterialTable.styles";
import UploadedMaterialNoteDrawer from "../uploadedMaterialNoteDrawer/UploadedMaterialNoteDrawer";

interface UploadedMaterialTableProps
{
  readonly isGetUploadedFilesLoading?: boolean;
  readonly selectedFolderId: string | null;
  readonly setSelectedFileIdForPreview?: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly setShowFileViewerModal?: React.Dispatch<React.SetStateAction<boolean>>;
  readonly uploadedFiles?: Partial<UploadedFile[]>;
  readonly variant?: "personalSpace" | "searchPapers";
}
const UploadedMaterialTable: FunctionComponent<UploadedMaterialTableProps> = ({
  isGetUploadedFilesLoading,
  selectedFolderId,
  setSelectedFileIdForPreview,
  setShowFileViewerModal,
  uploadedFiles,
  variant = "personalSpace"
}) =>
{
  // if file has existing not it will be assigned to this state
  const [selectedFileNote, setSelectedFileNote] = useState<UploadedFile | undefined>(undefined); 
  
  const [noteRichtext, setNoteRichtext] = useState<string>("");
  const [showNoteDrawer, setShowNoteDrawer] = useState<boolean>(false);
  const [showingFiles, setShowingFiles] = useState<number>(5);
  const isShowingFullTable = showingFiles >= (uploadedFiles?.length ?? 0);

  return isGetUploadedFilesLoading ? <>Loading... </> : (
    <div>
      <table css={styles.tableWrapper}>
        <thead css={styles.tableHead}>
          <UploadedMaterialTableHead variant={variant}/>
        </thead>
        <tbody css={styles.tableBody}>
          <UploadedMaterialTableBody
            showingFiles={showingFiles}
            uploadedFiles={uploadedFiles}
            selectedFolderId={selectedFolderId}
            setSelectedFileIdForPreview={setSelectedFileIdForPreview} 
            setShowFileViewerModal={setShowFileViewerModal}
            setSelectedFileNote={setSelectedFileNote}
            setShowNoteDrawer={setShowNoteDrawer}
            variant={variant}
          />
        </tbody>
      </table>
      {!isShowingFullTable && uploadedFiles?.length && (
        <div css={styles.showMoreButton}>
          <Button<"button">
            styleType="tertiary"
            rightIcon={<ArrowDown size={20}/>}
            size="medium"
            onClick={() =>
            {
              setShowingFiles(prev => prev + 10);
            }}>
            Show {uploadedFiles?.length - showingFiles < 10 ? uploadedFiles?.length - showingFiles : 10} More
          </Button>
        </div>
      )}
      <UploadedMaterialNoteDrawer
        showNoteDrawer={showNoteDrawer} 
        setShowNoteDrawer={setShowNoteDrawer} 
        noteRichtext={noteRichtext} 
        setNoteRichtext={setNoteRichtext}
        selectedFileNote={selectedFileNote}
      />
    </div>
  );
};

export default UploadedMaterialTable;
