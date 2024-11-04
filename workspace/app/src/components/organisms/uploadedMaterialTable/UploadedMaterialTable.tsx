import { Button } from "@/components/atoms/Button/Button";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import UploadedMaterialTableBody from "@/components/molecules/uploadedMaterialTableBody/UploadedMaterialTableBody";
import UploadedMaterialTableHead from "@/components/molecules/uploadedMaterialTableHead/UploadedMaterialTableHead";
import { type UploadedFileWithNote } from "@/hooks/useUploadedFilesWithNotes";

import { type FunctionComponent, useState } from "react";

import * as styles from "./UploadedMaterialTable.styles";
import UploadedMaterialNoteDrawer from "../uploadedMaterialNoteDrawer/UploadedMaterialNoteDrawer";

interface UploadedMaterialTableProps
{
  readonly isGetUploadedFilesLoading?: boolean;
  readonly uploadedFiles: UploadedFileWithNote[];
  readonly variant?: "personalSpace" | "searchPapers";
}

const UploadedMaterialTable: FunctionComponent<UploadedMaterialTableProps> = ({
  isGetUploadedFilesLoading,
  uploadedFiles,
  variant = "personalSpace",
}) =>
{
  const [showingFiles, setShowingFiles] = useState<number>(5);
  const isShowingFullTable = showingFiles >= (uploadedFiles?.length ?? 0);

  return isGetUploadedFilesLoading ? null : (
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
            Zeige {uploadedFiles?.length - showingFiles < 10 ? uploadedFiles?.length - showingFiles : 10} weitere
          </Button>
        </div>
      )}
      <UploadedMaterialNoteDrawer/>
    </div>
  );
};

export default UploadedMaterialTable;
