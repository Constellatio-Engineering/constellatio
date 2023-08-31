import React, { type FunctionComponent } from "react";

import * as styles from "./StatusTableCell.styles";
import StatusLabel, { type IStatusLabel } from "../statusLabel/StatusLabel";

export interface IStatusTableCellProps
{
  readonly variant: IStatusLabel["variant"];
}

const StatusTableCell: FunctionComponent<IStatusTableCellProps> = ({ variant }) => 
{
  return (
    <button type="button" css={styles.wrapper}>
      <StatusLabel variant={variant}/>
    </button>
  );
};

export default StatusTableCell;
