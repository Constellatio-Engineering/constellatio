import { Svg } from "@/basic-components/SVG/Svg";
import ProgressCard from "@/components/molecules/progressCard/ProgressCard";
import { type IProfilePageProps } from "@/pages/profile";

import React, { type FunctionComponent } from "react";

import * as styles from "./ProgressCardSection.styles";

interface ProgressCardSectionProps
{
  readonly mainCategories: IProfilePageProps["allMainCategory"];

}

const ProgressCardSection: FunctionComponent<ProgressCardSectionProps> = ({
  mainCategories
}) => 
{
  console.log({ mainCategories });
  return (
    <div css={styles.wrapper}>
      {
        mainCategories?.map((mainCategory, i) => (
          <ProgressCard
            key={i}
            completed={12}
            icon={<Svg src={mainCategory?.icon?.src}/>}
            title={mainCategory?.mainCategory ?? ""}
            total={0}
          />
        ))
      } 
    </div>
  );
};

export default ProgressCardSection;
