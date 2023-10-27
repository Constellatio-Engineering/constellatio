import React, { type FunctionComponent } from "react";

import * as styles from "./StatusTableCell.styles";
import StatusLabel, { type IStatusLabel } from "../statusLabel/StatusLabel";

export interface IStatusTableCellProps
{
  readonly progressState: IStatusLabel["progressState"];
}

const StatusTableCell: FunctionComponent<IStatusTableCellProps> = ({ progressState }) => 
{
  return (
    <button type="button" css={styles.wrapper}>
      <StatusLabel progressState={progressState}/>
    </button>
  );
};

export default StatusTableCell;
