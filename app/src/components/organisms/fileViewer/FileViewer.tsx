
import CaisyImg from "@/basic-components/CaisyImg";
import useSignedGetUrl from "@/hooks/useSignedGetUrl";
import useMaterialsStore from "@/stores/materials.store";

import { Modal, ScrollArea } from "@mantine/core";
import React, { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./FileViewer.styles";

const FileViewer: FunctionComponent = () => 
{
  // const { selectedFileIdForPreview: fileId, setShowFileViewerModal, showFileViewerModal } = useMaterialsStore();
  const fileId = useMaterialsStore(s => s.selectedFileIdForPreview);
  const setShowFileViewerModal = useMaterialsStore(s => s.setShowFileViewerModal);
  const showFileViewerModal = useMaterialsStore(s => s.showFileViewerModal);
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
            src={`${fileUrl}`}
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
      lockScroll={false} 
      radius={12}
      centered 
      opened={showFileViewerModal} 
      onClose={() => setShowFileViewerModal(false)} 
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
      closeOnClickOutside
      closeOnEscape
      styles={styles.modalStyles()}>
      {!isGetUrlLoading ? <div css={styles.wrapper}>{renderFile()}</div> : "Loading..."}
    </Modal>
  );

};

export default FileViewer;
