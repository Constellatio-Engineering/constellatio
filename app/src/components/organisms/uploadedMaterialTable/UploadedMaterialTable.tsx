import { Button } from "@/components/atoms/Button/Button";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import UploadedMaterialTableBody from "@/components/molecules/uploadedMaterialTableBody/UploadedMaterialTableBody";
import UploadedMaterialTableHead from "@/components/molecules/uploadedMaterialTableHead/UploadedMaterialTableHead";
import { type Note, type UploadedFile, type UploadedFileWithNote } from "@/db/schema";

import React, { type FunctionComponent, useState } from "react";

import * as styles from "./UploadedMaterialTable.styles";
import UploadedMaterialNoteDrawer from "../uploadedMaterialNoteDrawer/UploadedMaterialNoteDrawer";

interface UploadedMaterialTableProps
{
  readonly isGetUploadedFilesLoading?: boolean;
  readonly selectedFolderId: string | null;
  readonly uploadedFiles: UploadedFileWithNote[];
  readonly variant?: "personalSpace" | "searchPapers";
}

const UploadedMaterialTable: FunctionComponent<UploadedMaterialTableProps> = ({
  isGetUploadedFilesLoading,
  selectedFolderId,
  uploadedFiles,
  variant = "personalSpace",
}) =>
{
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
            onClick={() => setShowingFiles(prev => prev + 10)}>
            Show {uploadedFiles?.length - showingFiles < 10 ? uploadedFiles?.length - showingFiles : 10} More
          </Button>
        </div>
      )}
      <UploadedMaterialNoteDrawer selectedFolderId={selectedFolderId}/>
    </div>
  );
};

export default UploadedMaterialTable;
