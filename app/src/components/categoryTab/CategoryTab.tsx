import React, { FunctionComponent } from "react";

import * as styles from "./CategoryTab.style";
interface IProps 
{
  title: string
  icon: JSX.Element
  itemsNumber: number
  selected?: boolean
}

const CategoryTab: FunctionComponent<IProps> = ({ icon, title, itemsNumber, selected }) => 
{
  const [isSelected, setIsSelected] = React.useState<boolean>(selected || false)

  return (
    <button css={styles.wrapper} className={isSelected ? "selected" : ""} onClick={() => setIsSelected(!isSelected)}>
      {icon && <span className="icon">{icon}</span>}
      {title && <p>{title} <span className="counter">({itemsNumber})</span></p>}
    </button>
  )
};

export default CategoryTab;
