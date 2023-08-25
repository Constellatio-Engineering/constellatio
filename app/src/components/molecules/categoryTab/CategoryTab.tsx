import { BodyText } from "@/components/atoms/BodyText/BodyText";
import type { IGenCategory } from "@/services/graphql/__generated/sdk";

import React, { type FunctionComponent } from "react";

import * as styles from "./CategoryTab.style";
import { Svg } from "../../atoms/SVG/Svg";
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
      {title && <BodyText styleType="body-01-medium" component="p">{title} <span className="counter">({itemsNumber})</span></BodyText>}
    </button>
  );
};

export default CategoryTab;
