import { NoteIcon } from "@/components/Icons/Note";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./SearchPapersBlock.styles";
import IconButton from "../../atoms/iconButton/IconButton";
import Label from "../../atoms/label/Label";
import { DownloadIcon } from "../../Icons/DownloadIcon";

interface SearchPapersBlockProps 
{
  readonly numberOfTableItems?: number;
  readonly table: React.ReactNode;
  readonly variant: "userDocuments" | "userUploads";
}

const SearchPapersBlock: FunctionComponent<SearchPapersBlockProps> = ({ numberOfTableItems, table, variant }) => 
{
  return table ? (
    <div css={styles.wrapper}>
      <div css={styles.blockHeadWrapper}>
        <IconButton
          icon={variant === "userUploads" ? <DownloadIcon/> : <NoteIcon/>}
          size="big"
        />
        <Title order={3} css={styles.blockHeadTitle}>
          {variant === "userUploads"
            ? "Hochgeladene Dateien"
            : "Constellatio Docs"}
        </Title>
        <div>
          <Label
            title={`${numberOfTableItems ?? 0} ${
              variant === "userUploads"
                ? numberOfTableItems && numberOfTableItems > 1
                  ? "Dateien"
                  : "Datei"
                : numberOfTableItems && numberOfTableItems > 1
                  ? "Constellatio Docs"
                  : "Constellatio Doc"
            }`}
            variant="neutral"
          />
        </div>
      </div>
      {table && table}
    </div>
  ) : (
    <></>
  );
};

export default SearchPapersBlock;
