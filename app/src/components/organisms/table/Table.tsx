import ColumnHeader from "@/components/atoms/columnHeader/ColumnHeader";

import { type FunctionComponent, type PropsWithChildren } from "react";

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

export interface ITableProps extends PropsWithChildren 
{
  /**
   * refer to Storybook for use cases
   */
  readonly tableType: CasesTableProps | DictionaryTableProps;
}

const Table: FunctionComponent<ITableProps> = ({ children, tableType }) => 
{
  return (
    <table css={styles.table}>
      <thead css={styles.tableHeader}>
        <tr>
          {tableHeaders({ tableType }).map((header, i) => (
            <th key={`${header}-${i}`}>
              <ColumnHeader title={header.title}/>
            </th>
          ))}
        </tr>
      </thead>
      <tbody css={styles.tableBody}>{children}</tbody>
    </table>
  );
};

export default Table;
