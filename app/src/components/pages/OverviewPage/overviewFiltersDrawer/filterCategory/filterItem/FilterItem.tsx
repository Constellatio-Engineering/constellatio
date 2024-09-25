import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { type FilterCategoryProps } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";

import React, { type FunctionComponent } from "react";

import * as styles from "./FilterItem.styles";

type Props = FilterCategoryProps["items"][number];

let FilterItem: FunctionComponent<Props> = ({
  id,
  isChecked,
  label,
  toggle
}) => 
{
  return (
    <div css={styles.itemWrapper} key={id}>
      <Checkbox
        checked={isChecked}
        onChange={(_event) => toggle()}
        label={label}
      />
    </div>
  );
};

FilterItem = React.memo(FilterItem);

export default FilterItem;
