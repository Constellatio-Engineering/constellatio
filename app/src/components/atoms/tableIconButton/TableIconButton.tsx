import React, {
  type FunctionComponent,
  type MouseEventHandler,
  type ReactNode,
} from "react";

import * as styles from "./TableIconButton.styles";
import IconButton from "../iconButton/IconButton";

export interface ITableIconButtonProps 
{
  readonly disabled?: boolean;
  readonly icon: ReactNode;
  readonly onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

const TableIconButton: FunctionComponent<ITableIconButtonProps> = ({ disabled, icon, onClickHandler }) => (
  <div css={styles.wrapper}>
    {icon && (
      <IconButton
        disabled={disabled}
        icon={icon}
        size="medium"
        onClick={onClickHandler}
      />
    )}
  </div>
);

export default TableIconButton;
