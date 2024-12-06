import { Button } from "@/components/atoms/Button/Button";
import Label from "@/components/atoms/label/Label";

import { type IGenLearningPath } from "@constellatio/cms/generated-types";
import { appPaths } from "@constellatio/shared/paths";
import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { type FunctionComponent } from "react";

import * as styles from "./DashboardLearningPathBlockHeader.styles";

type Props = Pick<IGenLearningPath, "id" | "title">;

const DashboardLearningPathHeader: FunctionComponent<Props> = ({ id, title }) =>
{
  const isBigScreen = useMediaQuery("(min-width: 1200px)");

  return (
    <div css={styles.wrapper}>
      <div>
        <Label variant="learning-path"/>
        <Title css={styles.learningPathHeaderTitle} order={2}>{title}</Title>
      </div>
      <Link href={`${appPaths.learningPaths}/${id}`}>
        <Button<"button"> size={isBigScreen ? "large" : "medium"} styleType="secondarySimple">Details ansehen</Button>
      </Link>
    </div>
  );
};

export default DashboardLearningPathHeader;
