import { Svg } from "@/basic-components/SVG/Svg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import type { IGenMainCategory } from "@/services/graphql/__generated/sdk";

import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./CategoryTab.style";

export type CategoryTabProps = IGenMainCategory & 
{
  readonly itemsNumber?: number;
  readonly selected?: boolean; 
  readonly variant: "case" | "dictionary" | "red";
};

const CategoryTab: FunctionComponent<CategoryTabProps> = ({
  icon,
  itemsNumber,
  mainCategory,
  selected,
  variant
}) => 
{
  const theme = useMantineTheme();
  return (
    <button
      css={styles.wrapper({ theme, variant })}
      type="button"
      className={selected ? "selected" : ""}>
      {icon && icon?.src && icon?.src.includes(".svg") && <Svg className="icon" src={icon?.src}/>}
      {mainCategory && <BodyText styleType="body-01-medium" component="p">{mainCategory}{itemsNumber != null && <span className="counter"> ({itemsNumber})</span>}</BodyText>}
    </button>
  );
};

export default CategoryTab;
