import { Svg } from "@/basic-components/SVG/Svg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";

import type { IGenMainCategory } from "@constellatio/cms/generated-types";
import React, { type FunctionComponent } from "react";

import * as styles from "./CategoryTab.style";

export type CategoryTabProps = IGenMainCategory & 
{
  readonly itemsNumber?: number;
  readonly selected?: boolean; 
};

const CategoryTab: FunctionComponent<CategoryTabProps> = ({
  icon,
  itemsNumber,
  mainCategory,
  selected,
}) =>
{
  return (
    <button
      css={styles.wrapper()}
      type="button"
      className={selected ? "selected" : ""}>
      {icon && icon?.src && icon?.src.includes(".svg") && <Svg className="icon" src={icon?.src}/>}
      {mainCategory && <BodyText styleType="body-01-medium" component="p">{mainCategory}{itemsNumber != null && <span className="counter"> ({itemsNumber})</span>}</BodyText>}
    </button>
  );
};

export default CategoryTab;
