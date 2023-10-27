import { type IGenCase } from "@/services/graphql/__generated/sdk";

import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardCasesBlockTable.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { CaptionText } from "../atoms/CaptionText/CaptionText";
import StatusTableCell from "../atoms/statusTableCell/StatusTableCell";
import CaseBlockBookmarkButton from "../organisms/caseBlock/caseBlockBookmarkButton/CaseBlockBookmarkButton";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";

const DashboardCasesBlockTable: FunctionComponent = () => 
{
  const tableItems: IGenCase[] = [];
  return (
    <div css={styles.wrapper}>
      {tableItems?.length > 0 && (
        <table css={styles.casesTable}>
          <thead>
            <tr>
              <th className="primaryCell">
                <CaptionText styleType="caption-01-medium" component="p">Fälle</CaptionText>
              </th>
              <th>
                <CaptionText styleType="caption-01-medium" component="p">Status</CaptionText>
              </th>
              <th>
                <CaptionText styleType="caption-01-medium" component="p">Bearbeitungszeit</CaptionText>
              </th>
              {/* <th>
                <CaptionText styleType="caption-01-medium" component="p">LEGAL FIELD</CaptionText>
              </th> */}
              <th>
                <CaptionText styleType="caption-01-medium" component="p">Rechtsgebiet</CaptionText>
              </th>
              {/* BOOKMARK ICON CELL */}
              <th/>
            </tr>
          </thead>
          <tbody>
            {tableItems.slice(0, 6).map((item, index) => (
              <tr key={index}>
                <td className="primaryCell">
                  <BodyText styleType="body-01-medium" component="p">CASE 1 NAME</BodyText>
                </td>
                <td>
                  <StatusTableCell progressState="not-started"/>
                </td>
                <td>
                  <BodyText styleType="body-01-medium" component="p">1h</BodyText>
                </td>
                {/* <td>
                  <BodyText styleType="body-01-medium" component="p">MAIN CATEGORY</BodyText>
                </td> */}
                <td>
                  <BodyText styleType="body-01-medium" component="p">LEGAL</BodyText>
                </td>
                <td>
                  <CaseBlockBookmarkButton
                    areAllBookmarksLoading={false}
                    isBookmarked={false}
                    caseId=""
                    variant="case"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {tableItems?.length === 0 && (
        <EmptyStateCard
          title="Du hast bereits alle Fälle gelöst"
          text="In Kürze findest du hier weitere Fälle, die wir gerade für dich erstellen"
          variant="For-small-areas"
        />
      )}
    </div>
  );
};

export default DashboardCasesBlockTable;
