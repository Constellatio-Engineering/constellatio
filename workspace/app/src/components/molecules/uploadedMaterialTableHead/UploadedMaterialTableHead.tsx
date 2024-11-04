import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";

import { type FunctionComponent } from "react";

type UploadedMaterialTableHeadProps = {
  readonly variant: "personalSpace" | "searchPapers";
};

const UploadedMaterialTableHead: FunctionComponent<UploadedMaterialTableHeadProps> = ({ variant = "personalSpace" }) => 
{
  return (
    <tr>
      {/* {variant === "personalSpace" && <th/>} */}
      <th className="primaryCell">
        <CaptionText
          tt="uppercase"
          styleType="caption-01-medium"
          component="p">
          Name
        </CaptionText>
      </th>
      <th>
        <CaptionText
          tt="uppercase"
          styleType="caption-01-medium"
          component="p">
          Hochgeladen am
        </CaptionText>
      </th>
      <th>
        <CaptionText
          tt="uppercase"
          styleType="caption-01-medium"
          component="p">
          TAGS
        </CaptionText>
      </th>
      {variant === "searchPapers" && (
        <th>
          <CaptionText
            tt="uppercase"
            styleType="caption-01-medium"
            component="p">
            Ordner
          </CaptionText>
        </th>
      )}
      {variant === "personalSpace" && (
        <th>
          <CaptionText
            tt="uppercase"
            styleType="caption-01-medium"
            component="p">
            Notizen
          </CaptionText>
        </th>
      )}
      <th/>
    </tr>
  );
};

export default UploadedMaterialTableHead;
