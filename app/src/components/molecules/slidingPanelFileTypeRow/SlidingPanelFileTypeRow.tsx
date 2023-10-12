import Label, { type ILabelProps } from "@/components/atoms/label/Label";
import MaterialsLabel from "@/components/atoms/materialsLabel/MaterialsLabel";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";

import React, { type FunctionComponent } from "react";

import * as styles from "./SlidingPanelFileTypeRow.styles";

interface FileVariantProps
{
  fileExtension: string;
  fileName: string;
  variant: "file";
}

interface DefaultVariantProps
{
  label: string;
  title: string;
  variant: ILabelProps["variant"];
}

type Props = FileVariantProps | DefaultVariantProps;

const SlidingPanelFileTypeRow: FunctionComponent<Props> = (props) =>
{
  return (
    <div css={styles.wrapper}>
      {props.variant === "file" ? (
        <>
          <MaterialsLabel variant="file" title={props.fileExtension}/>
          <SubtitleText styleType="subtitle-01-medium">{props.fileName}</SubtitleText>
        </>
      ) : (
        <>
          <Label variant={props.variant} title={props.label}/>
          <SubtitleText styleType="subtitle-01-medium">{props.title}</SubtitleText>
        </>
      )}
    </div>
  );
};

export default SlidingPanelFileTypeRow;
