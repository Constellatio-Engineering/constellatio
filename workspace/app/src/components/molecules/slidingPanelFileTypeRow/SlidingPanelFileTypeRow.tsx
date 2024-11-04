/* eslint-disable react/destructuring-assignment */
import Label, { type ILabelProps } from "@/components/atoms/label/Label";
import MaterialsLabel from "@/components/atoms/materialsLabel/MaterialsLabel";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";

import { type FunctionComponent } from "react";

import * as styles from "./SlidingPanelFileTypeRow.styles";

interface FileVariantProps
{
  fileExtension: string;
  fileName: string;
  variant: "file";
}

interface ConstellatioDocsProps
{
  title: string;
  variant: "constellatioDocs";
}

interface DefaultVariantProps
{
  label: string;
  title: string;
  variant: ILabelProps["variant"];
}

type Props = FileVariantProps | DefaultVariantProps | ConstellatioDocsProps;

const SlidingPanelFileTypeRow: FunctionComponent<Props> = (props) =>
{
  if(props.variant === "constellatioDocs")
  {
    return (
      <div css={styles.wrapper}>
        <MaterialsLabel variant="paper" title={"Constellatio Doc"}/>
        <SubtitleText styleType="subtitle-01-medium">{props.title}</SubtitleText>
      </div>
    );
  }
  else if(props.variant === "file")
  {
    return (
      <div css={styles.wrapper}>
        <MaterialsLabel variant="file" title={props.fileExtension}/>
        <SubtitleText styleType="subtitle-01-medium">{props.fileName}</SubtitleText>
      </div>
    );
  }
  else
  {
    return (
      <div css={styles.wrapper}>
        <Label variant={props.variant} title={props.label}/>
        <SubtitleText styleType="subtitle-01-medium">{props.title}</SubtitleText>
      </div>
    );
  }
};

export default SlidingPanelFileTypeRow;
