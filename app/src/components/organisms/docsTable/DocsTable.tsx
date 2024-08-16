import { type GetDocumentsResult } from "@/server/api/routers/documents.router";

import React, { useState, type FunctionComponent } from "react";

import * as styles from "./DocsTable.styles";
import { DocsTableData } from "./DocTableData";
import { Button } from "../../atoms/Button/Button";
import { CaptionText } from "../../atoms/CaptionText/CaptionText";
import { ArrowDown } from "../../Icons/ArrowDown";

interface DocsTableProps 
{
  readonly docs: GetDocumentsResult;
}

const DocsTable: FunctionComponent<DocsTableProps> = ({ docs }) =>
{
  const [showingDocs, setShowingDocs] = useState<number>(5);
  const isShowingFullTable = showingDocs >= (docs.length ?? 0);

  return (
    <div css={styles.wrapper}>
      <table css={styles.tableWrapper}>
        <thead>
          <tr>
            <th className="primaryCell">
              <CaptionText styleType="caption-01-medium" component="p" tt="uppercase">
                Name
              </CaptionText>
            </th>
            <th>
              <CaptionText styleType="caption-01-medium" component="p" tt="uppercase">
                Zuletzt geändert
              </CaptionText>
            </th>
            <th>
              <CaptionText styleType="caption-01-medium" component="p" tt="uppercase">
                Tags
              </CaptionText>
            </th>
            <th>
              <CaptionText
                tt="uppercase"
                styleType="caption-01-medium"
                component="p">
                Ordner
              </CaptionText>
            </th>
            <th/>
          </tr>
        </thead>
        <tbody css={styles.tableBody}>
          {docs.slice(0, showingDocs).map(doc => (
            <tr key={doc.id}>
              <DocsTableData {...doc}/>
            </tr>
          ))}
        </tbody>
      </table>
      {!isShowingFullTable && (
        <div css={styles.showMoreButton}>
          <Button<"button">
            styleType="tertiary"
            rightIcon={<ArrowDown size={20}/>}
            size="medium"
            onClick={() => setShowingDocs(prev => prev + 10)}>
            Weitere {docs.length - showingDocs < 10 ? docs.length - showingDocs : 10} anzeigen
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocsTable;
