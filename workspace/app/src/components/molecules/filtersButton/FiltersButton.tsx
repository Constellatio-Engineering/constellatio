import { type Interpolation, type Theme } from "@emotion/react";
import { type FunctionComponent } from "react";

import * as styles from "./FiltersButton.style";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { FiltersIcon } from "../../Icons/filters";

export type IFiltersButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly css?: Interpolation<Theme>; 
  readonly disabled?: boolean;
  readonly title?: string;
};

const FiltersButton: FunctionComponent<IFiltersButton> = ({
  children,
  ...props
}) => 
{
  const { disabled, title } = props;
  return (
    <button type="button" css={styles.button} {...props}>
      <span css={styles.icon({ disabled })}><FiltersIcon/></span>
      <BodyText styleType="body-01-medium">{title ?? children}</BodyText>
    </button>
  );
};

export default FiltersButton;
