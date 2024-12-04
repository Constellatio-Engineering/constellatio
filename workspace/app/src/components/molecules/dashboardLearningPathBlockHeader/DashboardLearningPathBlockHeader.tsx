import { Button } from "@/components/atoms/Button/Button";
import Label from "@/components/atoms/label/Label";

import { appPaths } from "@constellatio/shared/paths";
import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { type FunctionComponent } from "react";

import * as styles from "./DashboardLearningPathBlockHeader.styles";

const DashboardLearningPathHeader: FunctionComponent = () => 
{
  const isBigScreen = useMediaQuery("(min-width: 1200px)");

  return (
    <div css={styles.wrapper}>
      <div>
        <Label variant="neutral" title="ROADMAP"/>
        <Title css={styles.learningPathHeaderTitle} order={2}>Your civil law roadmap</Title>
      </div>
      {/* TODO: create path for learningPath in appPaths */}
      <Link href={appPaths.cases}>
        <Button<"button"> size={isBigScreen ? "large" : "medium"} styleType="secondarySimple">Detailansicht öffnen</Button>
      </Link>
    </div>
  );
};

export default DashboardLearningPathHeader;
