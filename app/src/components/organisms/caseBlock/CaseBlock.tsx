import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import CaseBlockHead, { type ICaseBlockHeadProps } from "@/components/molecules/caseBlockHead/CaseBlockHead";
import CaseBlockBookmarkButton from "@/components/organisms/caseBlock/caseBlockBookmarkButton/CaseBlockBookmarkButton";
import { type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";
import { api } from "@/utils/api";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseBlock.styles";
import { timeFormatter } from "../overviewCard/OverviewCard";
import Table from "../table/Table";

export interface ICaseBlockProps 
{
  readonly blockHead: ICaseBlockHeadProps;
  readonly cases?: (({
    _typename?: "Case" | undefined;
  } & IGenFullCaseFragment) | null | undefined)[] | undefined;
}

const CaseBlock: FunctionComponent<ICaseBlockProps> = ({ blockHead, cases }) => 
{
  const { data: casesBookmarks, isLoading } = api.bookmarks.getAllBookmarks.useQuery({ resourceType: "case" });

  return (
    <div css={styles.wrapper}>
      <CaseBlockHead {...blockHead}/> 
      <Table tableType={{ type: "cases", variant: "cases" }}>
        {cases?.map((item, caseIndex) =>
        {
          const isBookmarked = casesBookmarks?.some(bookmark => bookmark?.resourceId === item?.id) || false;

          return (
            <tr key={caseIndex}>
              <td>
                <Link passHref href={`/cases/${item?.id}`}>
                  <TableCell variant="titleTableCell">
                    {item?.title}
                  </TableCell>
                </Link>
              </td>
              <td>
                <StatusTableCell variant="notStarted"/>
              </td>
              <td>
                <TableCell variant="simpleTableCell" icon={<ClockIcon/>}>
                  {timeFormatter(item?.durationToCompleteInMinutes ?? 0)}
                </TableCell>
              </td>
              <td>
                <TableCell variant="simpleTableCell">{item?.subCategoryField?.map((item) => item?.subCategory).join(", ")}</TableCell>
              </td>
              <td>
                <CaseBlockBookmarkButton
                  areAllBookmarksLoading={isLoading}
                  isBookmarked={isBookmarked}
                  caseId={item!.id!}
                />
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
};

export default CaseBlock;

