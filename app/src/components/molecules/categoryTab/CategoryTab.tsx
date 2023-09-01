import { Svg } from "@/basic-components/SVG/Svg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import type { IGenMainCategory } from "@/services/graphql/__generated/sdk";

import React, { type FunctionComponent } from "react";

import * as styles from "./CategoryTab.style";

const CategoryTab: FunctionComponent<IGenMainCategory & {readonly itemsNumber?: number;readonly selected?: boolean}> = ({
  icon,
  itemsNumber,
  mainCategory,
  selected,
}) => (
  <button
    css={styles.wrapper}
    type="button"
    className={selected ? "selected" : ""}>
    {icon && icon?.src && icon?.src.includes(".svg") && <Svg className="icon" src={icon?.src}/>}
    {mainCategory && <BodyText styleType="body-01-medium" component="p">{mainCategory}{itemsNumber !== null && itemsNumber !== undefined && <span className="counter"> ({itemsNumber})</span>}</BodyText>}
  </button>
);

export default CategoryTab;
