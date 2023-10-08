import Label from "@/components/atoms/label/Label";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";

import React, { type FunctionComponent } from "react";

import * as styles from "./SlidingPanelFileTypeRow.styles";

// import MaterialsLabel from "../materialsLabel/MaterialsLabel";

interface SlidingPanelFileTypeRowProps
{
  readonly fileExtention: string;
  readonly title: string;
}

const SlidingPanelFileTypeRow: FunctionComponent<SlidingPanelFileTypeRowProps> = ({ fileExtention, title }) => 
{
  return (
    <div css={styles.wrapper}>
      {/* <MaterialsLabel variant="file" title={fileExtention}/> */}
      <Label variant="case" title="CASES"/>
      {title && <SubtitleText styleType="subtitle-01-medium">{title}</SubtitleText>}
    </div>
  );
};

export default SlidingPanelFileTypeRow;
