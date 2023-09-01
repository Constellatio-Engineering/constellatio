import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import CountLabel from "@/components/atoms/countLabel/CountLabel";
import IconButton from "@/components/atoms/iconButton/IconButton";
import Label from "@/components/atoms/label/Label";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseBlockHead.styles";

export interface ICaseBlockHeadProps 
{
  readonly blockType: "itemsBlock" | "facouritItemsBlock" | "seaechBlock" | "searchPapersBlock" | "searchUploadedMaterials";
  readonly categoryName?: string;
  readonly completedCases?: number;
  readonly icon?: { alt?: string; src: React.ReactNode };
  readonly items?: number;
  // readonly title: string;
  readonly variant: "case" | "dictionary";

}

const CaseBlockHead: FunctionComponent<ICaseBlockHeadProps> = ({
  blockType,
  categoryName,
  completedCases,
  icon,
  items,
  // title,
  variant,

}) => 
{
  const detailRenderer: FunctionComponent<{blockType: ICaseBlockHeadProps["blockType"]; variant: ICaseBlockHeadProps["variant"]}> = ({
    blockType,
    variant
  }) => 
  {
    switch (blockType) 
    {
      case "itemsBlock":
        return (
          <>
            {(completedCases !== null || completedCases !== undefined) && items && variant === "case" ? (
              <div css={styles.detailText}>
                <CountLabel count={completedCases ?? 0} total={items} variant="cases"/>
                <CaptionText component="p" styleType="caption-01-medium">CASES COMPLETED</CaptionText>
              </div>
            )
              : <Label variant="dictionary" title={`${items} ARTICLES`}/>}
          </>
        );
      case "facouritItemsBlock":
        return (
          <>
            {items && variant === "case" ? <Label variant="case">{items} Cases</Label> : <Label variant="dictionary">{items} Articles</Label>}
          </>
        );
      case "seaechBlock":
        return (

          <>
            {items && variant === "case" ? <Label variant="case">{items} Cases</Label> : <Label variant="dictionary">{items} Articles</Label>}
          </>
        );
      case "searchPapersBlock":
        return (
          <>
            {items && <Label variant="neutral">{items} Papers</Label>}
          </>
        );
      case "searchUploadedMaterials":
        return (
          <>

            {items && <Label variant="neutral">{items} FILES</Label>}
          </>
        );

      default:
        return (<>default</>);
    }
  };

  return (
    <div css={styles.wrapper}>
      {icon && icon.src && (
        <div css={styles.iconWrapper}>
          <IconButton icon={icon.src} size="medium"/>
        </div>
      )}
      <div css={styles.title}>
        {categoryName && (blockType === "itemsBlock" || blockType === "facouritItemsBlock" || blockType === "seaechBlock") && <Title order={3}>{categoryName}</Title>}
        {blockType === "searchPapersBlock" ? <Title order={3}>Papers</Title> : blockType === "searchUploadedMaterials" && <Title order={3}>Uploaded materials</Title>}
      </div>
      <div className="details">
        {detailRenderer({ blockType, variant })}
      </div>
    </div>
  );
};

export default CaseBlockHead;

