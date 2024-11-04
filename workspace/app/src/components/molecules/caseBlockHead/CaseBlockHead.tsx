import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import CountLabel from "@/components/atoms/countLabel/CountLabel";
import IconButton from "@/components/atoms/iconButton/IconButton";
import Label from "@/components/atoms/label/Label";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./CaseBlockHead.styles";

export interface ICaseBlockHeadProps 
{
  readonly blockType: "itemsBlock" | "favoriteItemsBlock" | "searchBlock" | "searchPapersBlock" | "searchUploadedMaterials";
  readonly categoryName?: string;
  readonly completedCases?: number;
  readonly icon?: { alt?: string; src: React.ReactNode };
  readonly items?: number;
  readonly variant: "case" | "dictionary";
}

const DetailRenderer: FunctionComponent<{
  readonly blockType: ICaseBlockHeadProps["blockType"];
  readonly completedCases?: number;
  readonly items?: number;
  readonly variant: ICaseBlockHeadProps["variant"];
}> = ({
  blockType,
  completedCases,
  items,
  variant
}) =>
{
  switch (blockType)
  {
    case "itemsBlock":
      return (
        <>
          {completedCases != null && items && variant === "case" ? (
            <div css={styles.detailText}>
              <CountLabel count={completedCases ?? 0} total={items} variant="cases"/>
              <CaptionText component="p" styleType="caption-01-bold">ABGESCHLOSSENE FÄLLE</CaptionText>
            </div>
          )
            : <Label variant="dictionary" title={`${items} LEXIKON`}/>}
        </>
      );
    case "favoriteItemsBlock":
      return (
        <>
          {items && variant === "case" ? <Label variant="case">{items} Fälle</Label> : <Label variant="dictionary">{items} Artikel</Label>}
        </>
      );
    case "searchBlock":
      return (
        <>
          {items && variant === "case" ? <Label variant="case">{items} Fälle</Label> : <Label variant="dictionary">{items} Artikel</Label>}
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

const CaseBlockHead: FunctionComponent<ICaseBlockHeadProps> = ({
  blockType,
  categoryName,
  completedCases,
  icon,
  items,
  variant,
}) =>
{
  return (
    <div css={styles.wrapper}>
      {icon && icon.src && (
        <div css={styles.iconWrapper}>
          <IconButton icon={icon.src} size="medium"/>
        </div>
      )}
      <div css={styles.title} lang="de">
        {categoryName && (blockType === "itemsBlock" || blockType === "favoriteItemsBlock" || blockType === "searchBlock") && <Title order={3} size={23}>{categoryName}</Title>}
        {blockType === "searchPapersBlock" ? <Title order={3}>Papers</Title> : blockType === "searchUploadedMaterials" && <Title order={3}>Hochgeladene Dateien</Title>}
      </div>
      <div className="details">
        <DetailRenderer
          blockType={blockType}
          variant={variant}
          completedCases={completedCases}
          items={items}
        />
      </div>
    </div>
  );
};

export default CaseBlockHead;

