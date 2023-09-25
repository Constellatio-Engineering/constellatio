import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./PapersBlock.styles";
import DocsTable from "../docsTable/DocsTable";
import { type IDoc } from "../docsTable/DocTableData";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";

interface PapersBlockProps
{
  readonly docs?: IDoc[];
}

const PapersBlock: FunctionComponent<PapersBlockProps> = (props) => 
{
  return (
    <div css={styles.wrapper}>
      <div css={styles.papersBlockHead}>
        <Title order={4}>Cosntellatio docs <span>({props?.docs?.length ?? 0})</span></Title>
      </div>
      {
        props?.docs?.length ? (
          <div css={styles.papersBlockTable}>
            <DocsTable {...props}/> 
          </div>
        ) : 
          (
            <EmptyStateCard 
              variant="For-small-areas" 
              title="You haven’t created any docs yet"
              text="Cosntellatio docs are text documents where you leave your notes, summaries, etc"
            />
          )
      }
    </div>
  );
};

export default PapersBlock;
