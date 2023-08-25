import type { IGenCategory } from "@/services/graphql/__generated/sdk";

import React, { type FunctionComponent } from "react";

import * as styles from "./CategoryTab.style";
import { Svg } from "../../basic-components/SVG/Svg";
interface IProps extends IGenCategory
{
  readonly itemsNumber: number;
  readonly selected?: boolean;
}

const CategoryTab: FunctionComponent<IProps> = ({
  icon,
  itemsNumber,
  selected,
  title
}) => 
{
  const [isSelected, setIsSelected] = React.useState<boolean>(selected || false);

  return (
    <button
      css={styles.wrapper}
      type="button"
      className={isSelected ? "selected" : ""}
      onClick={() => setIsSelected(!isSelected)}>
      <Svg className="icon" src={icon?.src}/>
      {title && <p>{title} <span className="counter">({itemsNumber})</span></p>}
    </button>
  );
};

export default CategoryTab;
