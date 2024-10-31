import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { type FilterCategoryProps } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";

import { type FunctionComponent } from "react";

import * as styles from "./FilterItem.styles";

type Props = FilterCategoryProps["items"][number];

let FilterItem: FunctionComponent<Props> = ({
  isChecked,
  label,
  toggle,
  value
}) => 
{
  return (
    <div css={styles.itemWrapper} key={value}>
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
