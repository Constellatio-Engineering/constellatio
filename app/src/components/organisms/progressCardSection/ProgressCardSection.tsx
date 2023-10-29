import { Svg } from "@/basic-components/SVG/Svg";
import ProgressCard from "@/components/molecules/progressCard/ProgressCard";
import useCases from "@/hooks/useCases";
import useCasesProgress from "@/hooks/useCasesProgress";
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
  const { casesProgress } = useCasesProgress();
  const { allCases } = useCases();
  const allCasesProgressFiltered = allCases.filter(x => casesProgress?.some(y => y?.caseId === x?.id));
  const casesWithProgress = allCasesProgressFiltered?.map(x => ({ ...x, progress: casesProgress?.find(y => y?.caseId === x?.id)?.progressState }));
    
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
