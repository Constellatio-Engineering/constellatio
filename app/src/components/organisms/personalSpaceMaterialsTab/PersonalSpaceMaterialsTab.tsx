
import FoldersMenuTablet from "@/components/foldersMenuTablet/FoldersMenuTablet";
import PapersBlock from "@/components/papersBlock/PapersBlock";
import useDocuments from "@/hooks/useDocuments";
import useMaterialsStore from "@/stores/materials.store";
import uploadsProgressStore from "@/stores/uploadsProgress.store";

import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpaceMaterialsTab.styles";
import FileUploadMenu from "../fileUploadMenu/FileUploadMenu";
import FileViewer from "../fileViewer/FileViewer";
import MaterialMenu from "../materialMenu/MaterialMenu";
import UploadedMaterialBlock from "../uploadedMaterialBlock/UploadedMaterialBlock";
const PersonalSpaceMaterialsTab: FunctionComponent = () => 
{
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);
  const { documents } = useDocuments(selectedFolderId);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { setUploadState, uploads } = uploadsProgressStore();
  const { selectedFileIdForPreview } = useMaterialsStore();
  const areUploadsInProgress = uploads.some(u => u.state.type === "uploading");

  return (
    <div css={styles.container}>
      <div css={styles.materialTabContainerContent}>
        <MaterialMenu/>        
        <FoldersMenuTablet/>
        <div style={{ margin: "0", width: "100%" }}>
          <PapersBlock
            docs={documents}
            selectedFolderId={selectedFolderId}
            isLoading={false}
          />
          <UploadedMaterialBlock
            areUploadsInProgress={areUploadsInProgress}
            fileInputRef={fileInputRef}
            setUploadState={setUploadState}
            selectedFolderId={selectedFolderId}
          />
          <FileUploadMenu uploads={uploads}/>
          {selectedFileIdForPreview && (
            <FileViewer/>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalSpaceMaterialsTab;
