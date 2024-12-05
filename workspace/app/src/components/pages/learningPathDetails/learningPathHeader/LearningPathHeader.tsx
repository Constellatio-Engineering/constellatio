import { Richtext } from "@/components/molecules/Richtext/Richtext";

import { type IGenLearningPath } from "@constellatio/cms/generated-types";
import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import * as styles from "./LearningPathHeader.styles";

type Props = Pick<IGenLearningPath, "description" | "estimatedDuration" | "title"> & {
  readonly totalTasks: number;
};

export const LearningPathHeader: FunctionComponent<Props> = ({
  description,
  estimatedDuration,
  title,
  totalTasks,
}) =>
{
  return (
    <div css={[sharedStyles.card, styles.wrapper]}>
      <Title order={1}>{title}</Title>
      <Richtext data={description}/>
      <div>
        <p>Duration: {estimatedDuration} Minuten</p>
        <p>Aufgaben: {totalTasks}</p>
      </div>
    </div>
  );
};
