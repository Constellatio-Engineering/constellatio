import React, { useState, type FunctionComponent, useEffect } from "react";

import * as styles from "./DocsTable.styles";
import { type IDoc, DocsTableData } from "./DocTableData";
import { Button } from "../../atoms/Button/Button";
import { CaptionText } from "../../atoms/CaptionText/CaptionText";
import { ArrowDown } from "../../Icons/ArrowDown";

interface DocsTableProps 
{
  readonly docs?: IDoc[];
}

const DocsTable: FunctionComponent<DocsTableProps> = ({ docs }) => 
{
  const [showingDocs, setShowingDocs] = useState<number>(5);
  // const isShowingFullTable = showingDocs >= (docs?.length ?? 0);
  const [isShowingFullTable, setIsShowingFullTable] = useState<boolean>(false);
  useEffect(() =>
  {
    setIsShowingFullTable(showingDocs >= (docs?.length ?? 0));
  }
  , [showingDocs, docs]);

  return (docs?.length !== null && docs?.length !== undefined) && docs?.length >= 1 ? (
    <div css={styles.wrapper}>
      <table css={styles.tableWrapper}>
        <thead css={styles.tableHead}>
          <tr>
            <th/>
            <th className="primaryCell">
              <CaptionText styleType="caption-01-medium" component="p">DOC NAME</CaptionText>
            </th>
            <th><CaptionText styleType="caption-01-medium" component="p">LAST MODIFIED</CaptionText></th>
            <th><CaptionText styleType="caption-01-medium" component="p">TAGS</CaptionText></th>
            <th/>
          </tr>
        </thead>
        <tbody css={styles.tableBody}>

          {docs?.slice(0, showingDocs)?.map((doc: IDoc, index: number) => (
            <tr key={index}>
              <DocsTableData {...doc}/>
            </tr>
          ))}
        </tbody>
      </table>
      {!(isShowingFullTable) && (
        <div css={styles.showMoreButton}>
          <Button<"button">
            styleType="tertiary"
            rightIcon={<ArrowDown size={20}/>}
            size="medium"
            onClick={() => 
            {
              setShowingDocs(prev => prev + 10);
            }}>
            Show {docs?.length - showingDocs < 10 ? docs?.length - showingDocs : 10} More
          </Button>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}
  ;

export default DocsTable;
