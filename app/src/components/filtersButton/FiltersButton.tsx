import React, { FunctionComponent } from "react";

import * as styles from "./FiltersButton.style";
import { FiltersIcon } from "../Icons/filters";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Interpolation, Theme } from "@emotion/react";
import { useMantineTheme } from "@mantine/core";

type IProps =  React.ButtonHTMLAttributes<HTMLButtonElement> & {
  css?: Interpolation<Theme>; 
}

const FiltersButton: FunctionComponent<IProps> = ({ children,...props }) => {
const theme = useMantineTheme();
const {title,disabled} = props;
  return (
    <button css={styles.button} {...props}>
      <span css={styles.icon({theme,disabled})}><FiltersIcon/></span>
      <BodyText styleType={"body-01-medium"}>{title ?? children}</BodyText>
    </button>
  )
};

export default FiltersButton;
