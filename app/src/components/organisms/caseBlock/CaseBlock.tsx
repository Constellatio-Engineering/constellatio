
import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import TableIconButton from "@/components/atoms/tableIconButton/TableIconButton";
import { Bookmark } from "@/components/Icons/bookmark";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import CaseBlockHead, { type ICaseBlockHeadProps } from "@/components/molecules/caseBlockHead/CaseBlockHead";
import { type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";

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
  return (
    <div css={styles.wrapper}>
      <CaseBlockHead {...blockHead}/> 
      <Table tableType={{ type: "cases", variant: "cases" }}>
        {cases?.map((item, caseIndex) => (
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
              <TableIconButton
                icon={<Bookmark/>}
                onClickHandler={() => console.log("clicked")}
              />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default CaseBlock;

