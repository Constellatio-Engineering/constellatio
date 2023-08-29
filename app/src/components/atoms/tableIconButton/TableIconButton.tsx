import React, {
  type FunctionComponent,
  type MouseEventHandler,
  type ReactNode,
} from "react";

import * as styles from "./TableIconButton.styles";
import IconButton from "../iconButton/IconButton";

export interface ITableIconButtonProps 
{
  readonly icon: ReactNode;
  readonly onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

const TableIconButton: FunctionComponent<ITableIconButtonProps> = ({ icon, onClickHandler }) => (
  <div css={styles.wrapper}>
    {icon && <IconButton icon={icon} size="medium" onClick={onClickHandler}/>}
  </div>
);

export default TableIconButton;
