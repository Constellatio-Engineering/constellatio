import { Svg } from "@/basic-components/SVG/Svg";
import ProgressCard from "@/components/molecules/progressCard/ProgressCard";
import useAllCasesWithProgress from "@/hooks/useAllCasesWithProgress";
import { useLegalFields } from "@/hooks/useLegalFields";

import { type FunctionComponent } from "react";

import * as styles from "./ProgressCardSection.styles";

const ProgressCardSection: FunctionComponent = () =>
{
  const { data: allMainCategories = [] } = useLegalFields();
  const { casesWithProgress } = useAllCasesWithProgress();

  return (
    <div css={styles.wrapper}>
      {allMainCategories?.map((mainCategory, i) => 
      {
        const allCasesInCategory = casesWithProgress?.filter(legalCase => legalCase?.mainCategoryField?.[0]?.id === mainCategory?.id);
        const total = allCasesInCategory.length;
        const completed = allCasesInCategory?.filter(legalCase => legalCase?.progress === "completed")?.length;
        
        return (
          <ProgressCard
            key={i}
            completed={completed}
            icon={<Svg src={mainCategory?.icon?.src}/>}
            title={mainCategory?.mainCategory ?? ""}
            total={total}
          />
        );
      })} 
    </div>
  );
};

export default ProgressCardSection;
