import ColumnHeader from "@/components/atoms/columnHeader/ColumnHeader";

import React, { type FunctionComponent } from "react";

import * as styles from "./Table.styles";
import { tableHeaders } from "./tableHeadersHelper";

type TTable = {
  type: "cases" | "dictionary";
};

interface CasesTableProps extends TTable 
{
  type: "cases";
  variant: "all-cases" | "cases" | "favorites" | "search";
}

interface DictionaryTableProps extends TTable 
{
  type: "dictionary";
  variant: "dictionary" | "favorites" | "search";
}

export interface ITableProps 
{
  readonly tableType: CasesTableProps | DictionaryTableProps;
}

const Table: FunctionComponent<ITableProps> = ({ tableType }) => 
{
  return (
    <table css={styles.wrapper}>
      <thead>
        <tr>
          {tableHeaders({ tableType }).map((header, i) => (
            <thead key={`${header}-${i}`}>
              <ColumnHeader title={header.title}/>
            </thead>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default Table;
