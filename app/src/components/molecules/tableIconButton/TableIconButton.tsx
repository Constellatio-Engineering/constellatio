import { Loader } from "@mantine/core";
import {
  type FunctionComponent,
  type MouseEventHandler,
  type ReactNode,
} from "react";

import * as styles from "./TableIconButton.styles";
import IconButton from "../../atoms/iconButton/IconButton";

export interface ITableIconButtonProps 
{
  readonly disabled?: boolean;
  readonly dontUseDisabledStyles?: boolean;
  readonly icon: ReactNode;
  readonly isLoading?: boolean;
  readonly onClickHandler: MouseEventHandler<HTMLButtonElement>;

}

const TableIconButton: FunctionComponent<ITableIconButtonProps> = ({
  disabled,
  dontUseDisabledStyles,
  icon,
  isLoading,
  onClickHandler
}) => 
{
  const RenderedIcon: ReactNode = isLoading ? <Loader size={30}/> : icon;

  return (
    <div css={styles.wrapper}>
      {icon && (
        <IconButton
          disabled={disabled}
          dontUseDisabledStyles={dontUseDisabledStyles}
          icon={RenderedIcon}
          size="medium"
          onClick={onClickHandler}
        />
      )}
    </div>
  );
};

export default TableIconButton;
