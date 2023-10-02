import { type UploadedFile } from "@/db/schema";

import React, { type FunctionComponent, useState, useEffect } from "react";

import * as styles from "./UploadedMaterialTable.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import { CaptionText } from "../atoms/CaptionText/CaptionText";
import { Checkbox } from "../atoms/Checkbox/Checkbox";
import { ArrowDown } from "../Icons/ArrowDown";
import { DotsIcon } from "../Icons/dots";
import { FileIcon } from "../Icons/FileIcon";
import { ImageIcon } from "../Icons/image";
import { NotepadFilled } from "../Icons/NotepadFilled";
import { VideoIcon } from "../Icons/Video";

interface UploadedMaterialTableProps
{
  readonly isGetUploadedFilesLoading?: boolean;
  readonly setSelectedFileIdForPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly uploadedFiles?: UploadedFile[];
}
const formatDate = (date: Date): string => `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

const UploadedMaterialTable: FunctionComponent<UploadedMaterialTableProps> = ({
  isGetUploadedFilesLoading,
  setSelectedFileIdForPreview,
  uploadedFiles
}) =>
{
  const [showingFiles, setShowingFiles] = useState<number>(5);
  const [isShowingFullTable, setIsShowingFullTable] = useState<boolean>(false);
  useEffect(() =>
  {
    setIsShowingFullTable(showingFiles >= (uploadedFiles?.length ?? 0));
  }, [showingFiles, uploadedFiles]);

  const fileNameIcon = (file: UploadedFile): React.ReactNode =>
  {
    switch (file.fileExtension.toLowerCase())
    {
      case "png":
        return <ImageIcon/>;
      case "jpeg":
      case "jpg":
        return <ImageIcon/>;
      case "pdf":
        return <FileIcon/>;
      case "docx":
        return <FileIcon/>;
      case "xls":
        return <FileIcon/>;
      case "xlsx":
        return <FileIcon/>;
      case "mp4":
        return <VideoIcon/>;
      default:
        console.error("Unknown file extension", file.fileExtension);
        return null;
    }
  };

  return isGetUploadedFilesLoading ? <>Loading... </> : (
    <>
      <table css={styles.tableWrapper}>
        <thead css={styles.tableHead}>
          <tr>
            <th/>
            <th className="primaryCell">
              <CaptionText styleType="caption-01-medium" component="p">FILE NAME</CaptionText>
            </th>
            <th><CaptionText styleType="caption-01-medium" component="p">DATE CREATED</CaptionText></th>
            <th><CaptionText styleType="caption-01-medium" component="p">TAGS</CaptionText></th>
            <th><CaptionText styleType="caption-01-medium" component="p">NOTES</CaptionText></th>
            <th/>
          </tr>
        </thead>
        <tbody css={styles.tableBody}>
          {uploadedFiles?.slice(0, showingFiles).map((file, index) => (
            <tr
              key={index}
              onClick={() => setSelectedFileIdForPreview(file.id)}>
              <td css={styles.callToActionCell}><Checkbox/></td>
              <td css={styles.docName} className="primaryCell">
                <BodyText styleType="body-01-medium" component="p" title={file.originalFilename}>
                  {fileNameIcon(file)}{file.originalFilename}
                </BodyText>
              </td>
              <td css={styles.docDate}> <BodyText styleType="body-01-medium" component="p">{formatDate(file.createdAt!)}</BodyText></td>
              <td css={styles.docTags}> <BodyText styleType="body-02-medium" component="p">Tags ({0})</BodyText></td>
              <td css={styles.cellNote}> <BodyText styleType="body-02-medium" component="p"><NotepadFilled/>Notes</BodyText></td>
              <td css={styles.callToActionCell}><DotsIcon/></td>
            </tr>
          ))}
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
    </>
  );
};

export default UploadedMaterialTable;
