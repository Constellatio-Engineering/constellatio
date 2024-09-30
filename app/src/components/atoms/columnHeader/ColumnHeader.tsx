import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ArrowUp } from "@/components/Icons/ArrowUp";

import React, { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./ColumnHeader.styles";
import { CaptionText } from "../CaptionText/CaptionText";

export interface IColumnHeaderProps 
{
  readonly doesSort?: boolean;
  readonly title: string;
}

const ColumnHeader: FunctionComponent<IColumnHeaderProps> = ({ doesSort, title }) => 
{
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [dataSorted, setDataSorted] = useState<boolean>(false);

  useEffect(() => 
  {
    if(doesSort && sortDirection) 
    {
      setDataSorted(true);
    }
  }, [doesSort, sortDirection]);

  const sortIcons =
		doesSort && sortDirection === "asc" ? <ArrowUp/> : <ArrowDown/>;

  return (
    <button
      type="button"
      css={styles.wrapper({ dataSorted, doesSort })}
      onClick={() =>
        doesSort && setSortDirection(() => (sortDirection === "asc" ? "desc" : "asc"))}>
      {title && (
        <CaptionText styleType="caption-01-medium" component="p">
          {title}
        </CaptionText>
      )}
      {doesSort && sortIcons}
    </button>
  );
};

export default ColumnHeader;
