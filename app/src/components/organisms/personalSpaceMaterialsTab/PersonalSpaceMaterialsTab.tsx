import { type FileWithClientSideUuid } from "@/components/pages/personalSpacePage/PersonalSpacePage";
import PapersBlock from "@/components/papersBlock/PapersBlock";
import useDocuments from "@/hooks/useDocuments";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import useUploadFolders from "@/hooks/useUploadFolders";
import uploadsProgressStore from "@/stores/uploadsProgress.store";

import { Container } from "@mantine/core";
import React, { useState, type FunctionComponent } from "react";

import FileUploadMenu from "../fileUploadMenu/FileUploadMenu";
import FileViewer from "../fileViewer/FileViewer";
import MaterialMenu from "../materialMenu/MaterialMenu";
import UploadedMaterialBlock from "../uploadedMaterialBlock/UploadedMaterialBlock";

const PersonalSpaceMaterialsTab: FunctionComponent<{
  readonly selectedFolderId: string | null;
  readonly setSelectedFolderId: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ selectedFolderId, setSelectedFolderId }) => 
{
  const { isLoading: isGetUploadedFilesLoading, uploadedFiles } =
    useUploadedFiles(selectedFolderId);
  const { folders = [] } = useUploadFolders();
  const { documents } = useDocuments(selectedFolderId);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { setUploadState, uploads } = uploadsProgressStore();
  const [selectedFiles, setSelectedFiles] = useState<FileWithClientSideUuid[]>(
    []
  );
  const [selectedFileIdForPreview, setSelectedFileIdForPreview] =
    useState<string>();
  const areUploadsInProgress = uploads.some(
    (u) => u.state.type === "uploading"
  );
  const [showFileViewerModal, setShowFileViewerModal] =
    useState<boolean>(false);
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
        <MaterialMenu
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
          folders={folders}
        />
        <div style={{ flex: 1, maxWidth: "75%" }}>
          <PapersBlock
            docs={documents}
            selectedFolderId={selectedFolderId}
            isLoading={false}
          />
          <UploadedMaterialBlock
            areUploadsInProgress={areUploadsInProgress}
            fileInputRef={fileInputRef}
            isGetUploadedFilesLoading={isGetUploadedFilesLoading}
            setUploadState={setUploadState}
            selectedFiles={selectedFiles}
            setSelectedFileIdForPreview={setSelectedFileIdForPreview}
            setShowFileViewerModal={setShowFileViewerModal}
            setSelectedFiles={setSelectedFiles}
            uploadedFiles={uploadedFiles}
            selectedFolderId={selectedFolderId}
          />
          <FileUploadMenu uploads={uploads}/>
          {selectedFileIdForPreview && (
            <FileViewer
              fileId={selectedFileIdForPreview}
              setShowFileViewerModal={setShowFileViewerModal}
              showFileViewerModal={showFileViewerModal}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default PersonalSpaceMaterialsTab;
