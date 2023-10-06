import { useMantineTheme } from "@mantine/styles";
import React, { type ReactNode, type FunctionComponent } from "react";

import * as styles from "./TableCell.style";
import { BodyText } from "../BodyText/BodyText";

export interface ITableCellProps 
{
  readonly children: ReactNode;
  readonly clickable?: boolean;
  readonly icon?: ReactNode | null;
  readonly variant: "titleTableCell" | "simpleTableCell";
}

const TableCell: FunctionComponent<ITableCellProps> = ({
  children,
  clickable,
  icon,
  variant
}) => 
{
  const theme = useMantineTheme();

  return (
    <div>
      <button css={styles.wrapper({ clickable, theme, variant })} type="button">
        {icon && <div css={styles.iconWrapper({ variant })}>{icon}</div>}
        <BodyText styleType={variant === "titleTableCell" ? "body-01-medium" : "body-02-medium"} component="p" title={JSON.stringify(children)}>
          {children}
        </BodyText>
      </button>
    </div>
  );
};

export default TableCell;
