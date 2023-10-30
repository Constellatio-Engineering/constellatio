import { Svg } from "@/basic-components/SVG/Svg";
import ProgressCard from "@/components/molecules/progressCard/ProgressCard";
import useAllCasesWithProgress from "@/hooks/useAllCasesWithProgress";
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
  const { cases: casesWithProgress } = useAllCasesWithProgress();
    
  return (
    <div css={styles.wrapper}>
      {
        mainCategories?.map((mainCategory, i) => 
        {
          const total = casesWithProgress?.filter(x => x?.mainCategoryField?.[0]?.mainCategory === mainCategory?.mainCategory)?.length;
          const completed = casesWithProgress?.filter(x => x?.mainCategoryField?.[0]?.mainCategory === mainCategory?.mainCategory && x?.progress === "completed")?.length;
          return (
            <ProgressCard
              key={i}
              completed={completed}
              icon={<Svg src={mainCategory?.icon?.src}/>}
              title={mainCategory?.mainCategory ?? ""}
              total={total}
            />
          );
        })
      } 
    </div>
  );
};

export default ProgressCardSection;
