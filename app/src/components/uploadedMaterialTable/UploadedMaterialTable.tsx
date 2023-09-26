import React, { type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialTable.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { CaptionText } from "../atoms/CaptionText/CaptionText";
import { ArrowDown } from "../Icons/ArrowDown";
import { type IFile } from "../uploadedMaterialBlock/UploadedMaterialBlock";

interface UploadedMaterialTableProps
{
  readonly uploadedMaterial?: IFile[];
}

const UploadedMaterialTable: FunctionComponent<UploadedMaterialTableProps> = ({ uploadedMaterial }) => 
{
  console.log({ uploadedMaterial });
  
  return (
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
      <tr>
        <td><BodyText styleType="body-01-medium" component="p">cell</BodyText></td>
        <td>cell</td>
        <td>cell</td>
        <td>cell</td>
        <td>cell</td>
        <td>cell</td>
      </tr>
      <tr>
        <td>cell</td>
        <td>cell</td>
        <td>cell</td>
        <td>cell</td>
        <td>cell</td>
        <td>cell</td>
      </tr>
    </table>
  );
};

export default UploadedMaterialTable;
