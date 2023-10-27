import ColumnHeader from "@/components/atoms/columnHeader/ColumnHeader";

import { type FunctionComponent, type PropsWithChildren } from "react";

import * as styles from "./Table.styles";
import { tableHeaders } from "./tableHeadersHelper";

type TTable = {
  type: "cases" | "dictionary";
};

export interface CasesTableProps extends TTable 
{
  type: "cases";
  variant: "all-cases" | "cases" | "favorites" | "search";
}

export interface DictionaryTableProps extends TTable 
{
  type: "dictionary";
  variant: "dictionary" | "favorites" | "search";
}

export interface ITableProps extends PropsWithChildren 
{
  /**
   * refer to Storybook for use cases
   */
  readonly isTablet?: boolean;
  readonly tableType: CasesTableProps | DictionaryTableProps;
}

const Table: FunctionComponent<ITableProps> = ({ children, isTablet, tableType }) => 
{
  return (
    <table css={styles.table}>
      <thead css={styles.tableHeader}>
        <tr>
          {tableHeaders({ tableType }).map((header, i) => 
          {
            if(tableType.variant === "favorites" && isTablet && header.title === "Bearbeitungszeit") { return null; }  
            
            return (
              <th key={`${header}-${i}`}>
                <ColumnHeader title={header.title}/>
              </th>
            );
            
          })}
        </tr>
      </thead>
      <tbody css={styles.tableBody}>{children}</tbody>
    </table>
  );
};

export default Table;
