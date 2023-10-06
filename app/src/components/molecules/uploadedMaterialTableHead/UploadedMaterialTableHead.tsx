import React, { type FunctionComponent } from "react";

import { CaptionText } from "../atoms/CaptionText/CaptionText";
const UploadedMaterialTableHead: FunctionComponent = () => 
{
  return (
    <tr>
      <th/>
      <th className="primaryCell">
        <CaptionText styleType="caption-01-medium" component="p">
          FILE NAME
        </CaptionText>
      </th>
      <th>
        <CaptionText styleType="caption-01-medium" component="p">
          DATE CREATED
        </CaptionText>
      </th>
      <th>
        <CaptionText styleType="caption-01-medium" component="p">
          TAGS
        </CaptionText>
      </th>
      <th>
        <CaptionText styleType="caption-01-medium" component="p">
          NOTES
        </CaptionText>
      </th>
      <th/>
    </tr>
  );
};

export default UploadedMaterialTableHead;
