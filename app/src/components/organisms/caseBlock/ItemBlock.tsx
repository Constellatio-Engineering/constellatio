import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import CaseBlockHead, { type ICaseBlockHeadProps } from "@/components/molecules/caseBlockHead/CaseBlockHead";
import CaseBlockBookmarkButton from "@/components/organisms/caseBlock/caseBlockBookmarkButton/CaseBlockBookmarkButton";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";
import { api } from "@/utils/api";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./ItemBlock.styles";
import { timeFormatter } from "../overviewCard/OverviewCard";
import Table, { type DictionaryTableProps, type CasesTableProps } from "../table/Table";

export interface ICaseBlockProps 
{
  readonly blockHead: ICaseBlockHeadProps;
  readonly items?: Array<({
    _typename?: "Case" | undefined;
  } & IGenFullCaseFragment) | null | undefined> | undefined | IGenArticleOverviewFragment[];
  readonly variant: "case" | "dictionary";
}

const ItemBlock: FunctionComponent<ICaseBlockProps> = ({ blockHead, items, variant }) => 
{

  const CasesTable: CasesTableProps = 
  { 
    type: "cases",
    variant: "cases"  
  };
  const DictionaryTable: DictionaryTableProps = 
  {
    type: "dictionary", 
    variant: "dictionary"  
  };

  const { data: casesBookmarks, isLoading } = api.bookmarks.getAllBookmarks.useQuery({ resourceType: "case" });

  return items && items.length > 0 ? (
    <div css={styles.wrapper}>
      <CaseBlockHead {...blockHead}/>
      <Table tableType={variant === "case" ? CasesTable : DictionaryTable}>
        {items?.map((item, caseIndex) => 
        {
          const isBookmarked = casesBookmarks?.some(bookmark => bookmark?.resourceId === item?.id) || false;

          return (
            <tr key={caseIndex}>
              <td>
                <Link passHref href={`/${variant === "case" ? "cases" : "dictionary"}/${item?.id}`}>
                  <TableCell variant="titleTableCell">
                    {item?.title}
                  </TableCell>
                </Link>
              </td>
              <td>
                <StatusTableCell variant="notStarted"/>
              </td>
              {item?.__typename === "Case" && (
                <td>
                  <TableCell variant="simpleTableCell" icon={<ClockIcon/>}>
                    {timeFormatter(item?.durationToCompleteInMinutes ?? 0)}
                  </TableCell>
                </td>
              )}
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
  ) : null;
};

export default ItemBlock;

