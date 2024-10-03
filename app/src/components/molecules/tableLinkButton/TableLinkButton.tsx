import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";

import { Loader } from "@mantine/core";
import { type FunctionComponent, type MouseEventHandler, type ReactNode, } from "react";

import * as styles from "./TableLinkButton.styles";

export interface ITableLinkButtonProps 
{
  readonly disabled?: boolean;
  readonly icon: ReactNode;
  readonly isLoading?: boolean;
  readonly onClickHandler: MouseEventHandler<HTMLButtonElement>;
  readonly title: ReactNode;
}

const TableLinkButton: FunctionComponent<ITableLinkButtonProps> = ({
  disabled,
  icon,
  isLoading,
  onClickHandler,
  title,
}) => 
{
  const RenderedIcon: ReactNode = isLoading ? <Loader size={30}/> : icon;

  return (
    <div css={styles.wrapper}>
      {icon && (
        <LinkButton
          disabled={disabled}
          icon={RenderedIcon}
          size="medium"
          onClick={onClickHandler}
          title={isLoading ? "Loading..." : title}
        />
      )}
    </div>
  );
};

export default TableLinkButton;
