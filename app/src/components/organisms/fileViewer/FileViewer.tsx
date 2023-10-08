
import CaisyImg from "@/basic-components/CaisyImg";
import useSignedGetUrl from "@/hooks/useSignedGetUrl";

import { Modal } from "@mantine/core";
import React, { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./FileViewer.styles";

interface FileViewerProps
{
  readonly fileId: string;
  // readonly setSelectedFileIdForPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly setShowFileViewerModal: React.Dispatch<React.SetStateAction<boolean>>;
  readonly showFileViewerModal: boolean;
}

const FileViewer: FunctionComponent<FileViewerProps> = ({
  fileId,
  // setSelectedFileIdForPreview,
  setShowFileViewerModal,
  showFileViewerModal
}) => 
{

  const { isLoading: isGetUrlLoading, url: fileUrl } = useSignedGetUrl(fileId);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => 
  {
    const getFileType = (url: string): string | null => 
    {
      const extension = url?.split("/")[5]?.split(".")[1]?.split("?")[0] || "";
      if(extension === "pdf") 
      {
        return "pdf";
      }
      else if(["jpg", "jpeg", "png", "gif"].includes(extension)) 
      {
        return "image";
      }
      else if(["mp4", "webm"].includes(extension)) 
      {
        return "video";
      }
      else if(["docx", "doc"].includes(extension)) 
      {
        return "document";
      }
      else 
      {
        return null;
      }
    };
    const type = getFileType(fileUrl ?? "");
    setFileType(type);
  }, [fileUrl]);

  const renderFile = (): React.ReactNode => 
  {
    switch (fileType) 
    {
      case "pdf":
        return (
          <embed
            src={fileUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        );
      case "image":
        return (
          <CaisyImg
            src={fileUrl ?? ""}
            
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
        return <div>Unsupported file type</div>;
    }
  };

  return (
    <Modal 
      centered 
      miw={1080}
      opened={showFileViewerModal} 
      onClose={() => setShowFileViewerModal(false)} 
      withCloseButton={false}
      closeOnClickOutside
      closeOnEscape
      styles={styles.modalStyles()}>
      {!isGetUrlLoading ? <div css={styles.wrapper}>{renderFile()}</div> : "Loading..."}
    </Modal>
  );

};

export default FileViewer;
