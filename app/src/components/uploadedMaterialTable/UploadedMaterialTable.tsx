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
import { VideoIcon } from "../Icons/Video";
import { type IFile } from "../uploadedMaterialBlock/UploadedMaterialBlock";

interface UploadedMaterialTableProps
{
  readonly isGetUploadedFilesLoading?: boolean;
  readonly uploadedFiles?: IFile[];
}
const formatDate = (date: Date): string => `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;

const UploadedMaterialTable: FunctionComponent<UploadedMaterialTableProps> = ({ ...props }) => 
{
  const [showingFiles, setShowingFiles] = useState<number>(5);
  const [isShowingFullTable, setIsShowingFullTable] = useState<boolean>(false);
  useEffect(() =>
  {
    setIsShowingFullTable(showingFiles >= (props?.uploadedFiles?.length ?? 0));
  }, [showingFiles, props?.uploadedFiles]);

  const fileNameIcon = (file: IFile): React.ReactNode => 
  {
    switch (file?.fileExtension) 
    {
      case "png":
        return <ImageIcon/>;
      case "jpeg":
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
        return <></>;
    }
  };
  
  return props?.isGetUploadedFilesLoading ? <>Loading... </> : (
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
        <tbody css={styles.tableBody}/>
        {props?.uploadedFiles?.slice(0, showingFiles).map((file: IFile, index: number) => (
          <tr key={index}>
            <td css={styles.callToActionCell}><Checkbox/></td>
            <td css={styles.docName} className="primaryCell">
              <BodyText styleType="body-01-medium" component="p" title={file?.filename + "." + file?.fileExtension}>{fileNameIcon(file)}{file?.filename}.{file?.fileExtension}</BodyText>
            </td>
            <td css={styles.docDate}> <BodyText styleType="body-01-medium" component="p">{formatDate(file.createdAt!)}</BodyText></td>
            <td css={styles.docTags}> <BodyText styleType="body-02-medium" component="p">Tags({999})</BodyText></td>
            <td> <BodyText styleType="body-02-medium" component="p">file?.notes</BodyText></td>
            <td css={styles.callToActionCell}><DotsIcon/></td>
          </tr>
        ))}
      </table>
      {!isShowingFullTable && props?.uploadedFiles?.length && (
        <div css={styles.showMoreButton}>
          <Button<"button">
            styleType="tertiary"
            rightIcon={<ArrowDown size={20}/>}
            size="medium"
            onClick={() => 
            {
              setShowingFiles(prev => prev + 10);
            }}>
            Show {props?.uploadedFiles?.length - showingFiles < 10 ? props?.uploadedFiles?.length - showingFiles : 10} More
          </Button>
        </div>
      )}
      
    </>
  );
};

export default UploadedMaterialTable;
