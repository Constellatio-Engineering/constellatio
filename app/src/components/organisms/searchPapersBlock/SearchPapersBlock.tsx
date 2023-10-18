import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchPapersBlock.styles";
import IconButton from "../../atoms/iconButton/IconButton";
import Label from "../../atoms/label/Label";
import { DownloadIcon } from "../../Icons/DownloadIcon";

interface SearchPapersBlockProps
{
  readonly numberOfTableItems?: number;
  readonly table: React.ReactNode;
}

const SearchPapersBlock: FunctionComponent<SearchPapersBlockProps> = ({ numberOfTableItems, table }) => 
{
  return table ? (
    <div css={styles.wrapper}>
      <div>
        <IconButton icon={<DownloadIcon/>} size="big"/>
        <Title order={3} css={styles.blockHeadTitle}>Uploaded material</Title>
        <div><Label title={`${numberOfTableItems ?? 0} FILES`} variant="neutral"/></div>
      </div>
      {table && table}
    </div>
  ) : <></>;
};

export default SearchPapersBlock;
