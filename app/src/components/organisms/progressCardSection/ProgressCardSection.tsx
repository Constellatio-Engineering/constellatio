import { Svg } from "@/basic-components/SVG/Svg";
import ProgressCard from "@/components/molecules/progressCard/ProgressCard";
import useMainCategories from "@/hooks/useMainCategories";

import React, { type FunctionComponent } from "react";

import * as styles from "./ProgressCardSection.styles";

const ProgressCardSection: FunctionComponent = () =>
{
  const { allMainCategories } = useMainCategories();

  return (
    <div css={styles.wrapper}>
      {allMainCategories?.map((mainCategory, i) => (
        <ProgressCard
          key={i}
          completed={12}
          icon={<Svg src={mainCategory?.icon?.src}/>}
          title={mainCategory?.mainCategory ?? ""}
          total={0}
        />
      ))} 
    </div>
  );
};

export default ProgressCardSection;
