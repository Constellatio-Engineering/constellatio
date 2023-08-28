import { useMantineTheme } from "@mantine/styles";
import React, { type ReactNode, type FunctionComponent } from "react";

import * as styles from "./TableCell.style";
import { BodyText } from "../BodyText/BodyText";

export interface ITableCellProps 
{
  readonly children: ReactNode;
  readonly icon?: ReactNode | null;
  readonly variant: "titleTableCell" | "simpleTableCell";
}

const TableCell: FunctionComponent<ITableCellProps> = ({ children, icon, variant }) => 
{
  const theme = useMantineTheme();

  return (
    <button css={styles.wrapper({ theme, variant })} type="button">
      {icon && <div css={styles.iconWrapper({ variant })}>{icon}</div>}
      <BodyText styleType={variant === "titleTableCell" ? "body-01-medium" : "body-02-medium"} component="p">
        {children}
      </BodyText>
    </button>
  );
};

export default TableCell;
