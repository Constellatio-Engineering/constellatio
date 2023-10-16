import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";

import React, { type FunctionComponent } from "react";

type UploadedMaterialTableHeadProps = {
  readonly variant: "personalSpace" | "searchPapers";
};

const UploadedMaterialTableHead: FunctionComponent<UploadedMaterialTableHeadProps> = ({ variant = "personalSpace" }) => 
{
  return (
    <tr>
      {/* {variant === "personalSpace" && <th/>} */}
      <th className="primaryCell">
        <CaptionText tt="uppercase" styleType="caption-01-medium" component="p">
          FILE NAME
        </CaptionText>
      </th>
      <th>
        <CaptionText tt="uppercase" styleType="caption-01-medium" component="p">
          DATE CREATED
        </CaptionText>
      </th>
      <th>
        <CaptionText tt="uppercase" styleType="caption-01-medium" component="p">
          TAGS
        </CaptionText>
      </th>
      {variant === "searchPapers" && (
        <th>
          <CaptionText tt="uppercase" styleType="caption-01-medium" component="p">
            Folder
          </CaptionText>
        </th>
      )}
      {variant === "personalSpace" && (
        <th>
          <CaptionText tt="uppercase" styleType="caption-01-medium" component="p">
            NOTES
          </CaptionText>
        </th>
      )}
      <th/>
    </tr>
  );
};

export default UploadedMaterialTableHead;
