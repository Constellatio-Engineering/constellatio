import Label from "@/components/atoms/label/Label";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";

import React, { type FunctionComponent } from "react";

import * as styles from "./SlidingPanelFileTypeRow.styles";

// import MaterialsLabel from "../materialsLabel/MaterialsLabel";

interface SlidingPanelFileTypeRowProps
{
  readonly fileExtension: string;
  readonly title: string;
}

const SlidingPanelFileTypeRow: FunctionComponent<SlidingPanelFileTypeRowProps> = ({ fileExtension, title }) => 
{
  if(!fileExtension) { console.log({ fileExtension }); }
  return (
    <div css={styles.wrapper}>
      {/* <MaterialsLabel variant="file" title={fileExtension}/> */}
      <Label variant="case" title="CASES"/>
      {title && <SubtitleText styleType="subtitle-01-medium">{title}</SubtitleText>}
    </div>
  );
};

export default SlidingPanelFileTypeRow;
