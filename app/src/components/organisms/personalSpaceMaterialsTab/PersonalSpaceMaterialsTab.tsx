import PapersBlock from "@/components/papersBlock/PapersBlock";
import useDocuments from "@/hooks/useDocuments";
import useMaterialsStore from "@/stores/materials.store";
import uploadsProgressStore from "@/stores/uploadsProgress.store";

import { Container } from "@mantine/core";
import React, { type FunctionComponent } from "react";

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
    <Container maw={1440}>
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          gap: "32px",
          justifyContent: "space-between",
          marginTop: "40px",
        }}>
        <MaterialMenu/>
        <div style={{ flex: 1, maxWidth: "75%" }}>
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
    </Container>
  );
};

export default PersonalSpaceMaterialsTab;
