import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import {
  LearningPathCompletedCard
} from "@/components/pages/learningPathDetails/learningPathCompletedCard/LearningPathCompletedCard";
import { LearningPathHeader } from "@/components/pages/learningPathDetails/learningPathHeader/LearningPathHeader";
import { LearningPathUnit } from "@/components/pages/learningPathDetails/learningPathUnit/LearningPathUnit";
import { useLearningPathProgress } from "@/hooks/useLearningPathProgress";

import { type IGenLearningPath } from "@constellatio/cms/generated-types";
import { type FunctionComponent } from "react";

import * as styles from "./LearningPathDetails.styles";

type Props = IGenLearningPath;

export const LearningPathDetailsPage: FunctionComponent<Props> = (learningPath) =>
{
  const { totalTasks, unitsWithProgress } = useLearningPathProgress(learningPath);

  return (
    <>
      <ContentWrapper stylesOverrides={styles.contentWrapper}>
        <div css={styles.layoutWrapper}>
          <div css={styles.unitsColumn}>
            {unitsWithProgress.map((unit, index) => (
              <LearningPathUnit
                key={unit.id}
                index={index}
                isLastUnit={index === (learningPath.units?.length ?? 0) - 1}
                unit={unit}
              />
            ))}
          </div>
          <div css={styles.headerColumn}>
            <LearningPathCompletedCard/>
            <LearningPathHeader
              description={learningPath.description}
              estimatedDuration={learningPath.estimatedDuration}
              title={learningPath.title}
              totalTasks={totalTasks ?? 0}
            />
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};
