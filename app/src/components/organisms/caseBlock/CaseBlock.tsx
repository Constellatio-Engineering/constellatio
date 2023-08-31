
import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import TableIconButton from "@/components/atoms/tableIconButton/TableIconButton";
import { Bookmark } from "@/components/Icons/bookmark";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import { Trash } from "@/components/Icons/Trash";
import CaseBlockHead, { type ICaseBlockHeadProps } from "@/components/molecules/caseBlockHead/CaseBlockHead";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseBlock.styles";
import Table from "../table/Table";

export interface ICaseBlockProps 
{
  readonly blockHead: ICaseBlockHeadProps;
}

const CaseBlock: FunctionComponent<ICaseBlockProps> = ({ blockHead }) => 
{
  return (
    <div css={styles.wrapper}>
      <CaseBlockHead {...blockHead}/> 
      <Table tableType={{ type: "cases", variant: "all-cases" }}>
        {Array(5).fill(0).map((_, index) => (
          <tr key={index}>
            <td>
              <Link passHref href="/">
                <TableCell variant="titleTableCell">
                  ArbR 1 | Working with young unicorns
                </TableCell>
              </Link>
            </td>
            <td>
              <StatusTableCell variant="notStarted"/>
            </td>
            <td>
              <TableCell variant="simpleTableCell" icon={<ClockIcon/>}>
                1.5h
              </TableCell>
            </td>
            <td>
              <TableCell variant="simpleTableCell">Civil law</TableCell>
            </td>
            <td>
              <TableCell variant="simpleTableCell">Labor law</TableCell>
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

