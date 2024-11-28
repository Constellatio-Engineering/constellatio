import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Cross } from "@/components/Icons/Cross";
import useSignedGetUrl from "@/hooks/useSignedGetUrl";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import useMaterialsStore from "@/stores/materials.store";

import { Loader, Modal, ScrollArea } from "@mantine/core";
import { type FunctionComponent, useMemo, useState } from "react";

import * as styles from "./FileViewer.styles";

export type FileType = "pdf" | "image" | "video" | "document" | false;

const getFileExtension = (url: string | undefined): string | null =>
{
  if(!url)
  {
    return null;
  }

  // Extract the path from the URL
  const path = new URL(url).pathname;

  // Use regular expression to match the file extension
  const match = path.match(/\.([a-z0-9]+)(?:[?#]|$)/i);

  // Check if a match is found
  if(match && match[1])
  {
    return match[1].toLowerCase();
  }
  else
  {
    // Return null if no file extension is found
    return null;
  }
};

const FileViewer: FunctionComponent = () => 
{
  const { uploadedFilesInAllFolders } = useUploadedFiles();
  const fileId = useMaterialsStore(s => s.selectedFileIdForPreview);
  const setShowFileViewerModal = useMaterialsStore(s => s.setShowFileViewerModal);
  const showFileViewerModal = useMaterialsStore(s => s.showFileViewerModal);
  const file = uploadedFilesInAllFolders.find(file => file.id === fileId);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const { isLoading: isGetUrlLoading, url: fileUrl } = useSignedGetUrl(fileId);
  const fileExtension = getFileExtension(fileUrl);
  const fileType: FileType = useMemo(() =>
  {
    if(!fileExtension)
    {
      return false;
    }

    if(fileExtension === "pdf")
    {
      return "pdf";
    }
    else if(["jpg", "jpeg", "png", "gif"].includes(fileExtension))
    {
      return "image";
    }
    else if(["mp4", "webm"].includes(fileExtension))
    {
      return "video";
    }
    else if(["docx", "doc"].includes(fileExtension))
    {
      return "document";
    }
    else
    {
      return false;
    }
  }, [fileExtension]);

  const renderedFile = useMemo(() =>
  {
    if(!file)
    {
      return (
        <p>Die Datei konnte nicht gefunden werden.</p>
      );
    }

    switch (fileType)
    {
      case "pdf":
        return (
          <embed
            src={`${fileUrl}`}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        );
      case "image":
        return (
          <CaisyImg
            onLoad={() => setHasLoaded(true)}
            src={fileUrl!}
            alt={file.originalFilename}
          />
        );
      case "video":
        return (
          <video controls width="100%">
            <source src={fileUrl} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        );
      case "document":
        return (
          <iframe
            src={fileUrl}
            title="Document"
            width="100%"
            height="500px">
            This browser does not support PDFs. Please download the PDF to view it.
          </iframe>
        );
      default:
        return <div>Unsupported file type {fileType}</div>;
    }
  }, [file, fileType, fileUrl]);

  const onClose = (): void =>
  {
    setHasLoaded(false);
    setShowFileViewerModal(false);
  };

  if(!file)
  {
    return null;
  }

  return (
    <>
      {showFileViewerModal && (
        <div css={styles.header}>
          <BodyText styleType="body-01-medium">{file?.originalFilename}</BodyText>
          <span style={{ cursor: "pointer" }} onClick={onClose}>
            <Cross size={30}/>
          </span>
        </div>
      )}
      <Modal
        lockScroll={false}
        radius={12}
        centered
        opened={showFileViewerModal}
        onClose={onClose}
        withCloseButton={false}
        scrollAreaComponent={ScrollArea.Autosize}
        closeOnClickOutside
        closeOnEscape
        styles={styles.modalStyles({ fileType })}>
        {(isGetUrlLoading) ? (
          <div css={styles.loadingWrapper}>
            <Loader size="md"/>
          </div>
        ) : (
          <div css={[
            styles.wrapper,
            (fileType === "image" && !hasLoaded) && styles.wrapperLoading
          ]}>
            {renderedFile}
          </div>
        )}
      </Modal>
    </>
  );

};

export default FileViewer;
