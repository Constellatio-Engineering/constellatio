
import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import TableIconButton from "@/components/atoms/tableIconButton/TableIconButton";
import { Bookmark } from "@/components/Icons/Bookmark";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import CaseBlockHead, { type ICaseBlockHeadProps } from "@/components/molecules/caseBlockHead/CaseBlockHead";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseBlock.styles";
import { timeFormatter } from "../overviewCard/OverviewCard";
import Table, { type CasesTableProps } from "../table/Table";

export interface ICaseBlockProps 
{
  readonly blockHead: ICaseBlockHeadProps;
  readonly items?: (({
    _typename?: "Case" | undefined;
  } & IGenFullCaseFragment) | null | undefined)[] | undefined | IGenArticleOverviewFragment[];
  readonly variant: "case" | "dictionary";
}

const CaseBlock: FunctionComponent<ICaseBlockProps> = ({ blockHead, items, variant }) => 
{
  console.log({ items });
  
  return items?.length && items?.length > 0 ? (
    <div css={styles.wrapper}>
      <CaseBlockHead {...blockHead}/> 
      <Table tableType={{ type: variant === "case" ? "cases" : "dictionary" as CasesTableProps["type"], variant: variant === "case" ? "cases" : "dictionary" as CasesTableProps["variant"] }}>
        {items?.map((item, caseIndex) => (
          <tr key={caseIndex}>
            <td>
              <Link passHref href={`/${variant === "case" ? "cases" : "dictionary"}/${item?.id}`}>
                <TableCell variant="titleTableCell">
                  {item?.title}
                </TableCell>
              </Link>
            </td>
            {item?.__typename === "Case" && (
              <td>
                <StatusTableCell variant="notStarted"/>
              </td>
            )}
            {item?.__typename === "Case" && (
              <td>
             
                <TableCell variant="simpleTableCell" icon={<ClockIcon/>}>
                  {item?.__typename === "Case" && timeFormatter(item?.durationToCompleteInMinutes ?? 0)}
                </TableCell>
            
              </td>
            )}
            <td>
              <TableCell variant="simpleTableCell">{item?.subCategoryField?.map((item) => item?.subCategory).join(", ")}</TableCell>
            </td>
            <td>
              <TableIconButton
                icon={<Bookmark/>}
                onClickHandler={() => console.log("clicked")}
              />
            </td>
            
          </tr>
        ))}
      </Table>
    </div>
  ) : null;
};

export default CaseBlock;

