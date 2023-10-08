import { Button } from "@/components/atoms/Button/Button";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import UploadedMaterialTableBody from "@/components/molecules/uploadedMaterialTableBody/UploadedMaterialTableBody";
import UploadedMaterialTableHead from "@/components/molecules/uploadedMaterialTableHead/UploadedMaterialTableHead";
import { type UploadedFile } from "@/db/schema";

import React, { type FunctionComponent, useState, useEffect } from "react";

import * as styles from "./UploadedMaterialTable.styles";
import UploadedMaterialNoteDrawer from "../uploadedMaterialNoteDrawer/UploadedMaterialNoteDrawer";

interface UploadedMaterialTableProps
{
  readonly isGetUploadedFilesLoading?: boolean;
  readonly setSelectedFileIdForPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly setShowFileViewerModal: React.Dispatch<React.SetStateAction<boolean>>;
  readonly uploadedFiles?: UploadedFile[];
}
const UploadedMaterialTable: FunctionComponent<UploadedMaterialTableProps> = ({
  isGetUploadedFilesLoading,
  setSelectedFileIdForPreview,
  setShowFileViewerModal,
  uploadedFiles
}) =>
{
  // if file has existing not it will be assigned to this state
  const [selectedFileNote, setSelectedFileNote] = useState<UploadedFile | undefined>(undefined); 
  
  const [noteRichtext, setNoteRichtext] = useState<string>("");
  const [showNoteDrewer, setShowNoteDrewer] = useState<boolean>(false);
  const [showingFiles, setShowingFiles] = useState<number>(5);
  const [isShowingFullTable, setIsShowingFullTable] = useState<boolean>(false);
  useEffect(() =>
  {
    setIsShowingFullTable(showingFiles >= (uploadedFiles?.length ?? 0));
  }, [showingFiles, uploadedFiles]);

  return isGetUploadedFilesLoading ? <>Loading... </> : (
    <>
      <table css={styles.tableWrapper}>
        <thead css={styles.tableHead}>
          <UploadedMaterialTableHead/>
        </thead>
        <tbody css={styles.tableBody}>
          <UploadedMaterialTableBody 
            showingFiles={showingFiles}
            uploadedFiles={uploadedFiles} 
            setSelectedFileIdForPreview={setSelectedFileIdForPreview} 
            setShowFileViewerModal={setShowFileViewerModal}
            setSelectedFileNote={setSelectedFileNote}
            setShowNoteDrewer={setShowNoteDrewer}
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
        showNoteDrewer={showNoteDrewer} 
        setShowNoteDrewer={setShowNoteDrewer} 
        noteRichtext={noteRichtext} 
        setNoteRichtext={setNoteRichtext}
        selectedFileNote={selectedFileNote}
      />
    </>
  );
};

export default UploadedMaterialTable;
