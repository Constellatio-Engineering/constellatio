import { Button } from "@/components/atoms/Button/Button";
import StatusLabel from "@/components/atoms/statusLabel/StatusLabel";
import { Puzzle } from "@/components/Icons/Puzzle";
import { LearningPathTestDrawer } from "@/components/pages/learningPathDetails/learningPathUnit/learningPathTestDrawer/LearningPathTestDrawer";
import { type LearningPathUnitProps } from "@/components/pages/learningPathDetails/learningPathUnit/LearningPathUnit";
import { useResetCaseProgress } from "@/hooks/useResetCaseProgress";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./LearningPathTest.styles";

type Props = {
  readonly closeTest: () => void;
  readonly learningTest: LearningPathUnitProps["unit"]["caseLearningTests"][number];
  readonly openTest: (testId: string) => void;
  readonly openedTest: string | null;
  readonly refetchGamesProgress: () => void;
};

export const LearningPathTest: FunctionComponent<Props> = ({
  closeTest,
  learningTest,
  openedTest,
  openTest,
  refetchGamesProgress,
}) =>
{
  const { mutateAsync: resetCaseProgress } = useResetCaseProgress();
  const { id, progressState, title } = learningTest;

  let text: string;
  let buttonText: string | null;

  switch (progressState) 
  {
    case "upcoming":
      text = "Schließe alle vorherigen Module ab, um diesen Test freizuschalten";
      buttonText = "Test starten";
      break;
    case "not-started":
      text = "Teste dein Wissen und schließe das Modul ab!";
      buttonText = "Test starten";
      break;
    case "in-progress":
      text = "Teste dein Wissen und schließe das Modul ab!";
      buttonText = "Test fortsetzen";
      break;
    case "completed":
      text = "Super! Du hast diesen Test erfolgreich abgeschlossen.";
      // buttonText = "Fortschritt zurücksetzen";
      buttonText = null;
      break;
  }
  
  return (
    <>
      <li>
        <div css={[styles.container(progressState), progressState === "upcoming" && styles.containerDisabled]}>
          <Puzzle size={32}/>
          <div css={styles.contentWrapper}>
            <Title order={4}>{title}</Title>
            <p>{text}</p>
          </div>
          {buttonText && (
            <Button<"button">
              onClick={async () =>
              {
                if(progressState === "completed")
                {
                  await resetCaseProgress({ caseId: id! });
                  void refetchGamesProgress();
                }
                else
                {
                  openTest(id!);
                }
              }}
              styleType="secondarySimple">
              {buttonText}
            </Button>
          )}
          {progressState === "completed" && (
            <StatusLabel progressState={"completed"} overwrites={{ completed: "Abgeschlossen" }}/>
          )}
        </div>
      </li>
      <LearningPathTestDrawer
        key={id}
        closeDrawer={() =>
        {
          void refetchGamesProgress();
          void closeTest();
        }}
        caseLearningTest={learningTest}
        caseLearningTestId={learningTest.id!}
        isOpened={openedTest === learningTest.id}
      />
    </>
  );
};
