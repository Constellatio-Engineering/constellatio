import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { type IStatusLabel } from "@/components/atoms/statusLabel/StatusLabel";
import { Flag } from "@/components/Icons/Flag";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useSubmittedCaseSolution from "@/hooks/useSubmittedCaseSolution";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type IGenCase } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { api } from "@/utils/api";
import { type Nullable } from "@/utils/types";

import { Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseSolveCaseStep.styles";

type Props = {
  readonly facts: IGenCase["facts"]; 
  readonly id: string;
  readonly progressState: IStatusLabel["progressState"] | undefined;
  readonly title: Nullable<string>;
};

const CaseSolveCaseStep: FunctionComponent<Props> = ({
  facts,
  id,
  progressState,
  title
}) =>
{
  const { setShowStepTwoModal, showStepTwoModal } = useCaseSolvingStore((state) => state);
  const { invalidateCaseProgress, invalidateSubmittedCaseSolution } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { isLoading, submittedCaseSolution } = useSubmittedCaseSolution(id);
  const { mutate: setProgressState } = api.casesProgress.setProgressState.useMutation({
    onError: (error) => console.error(error),
    onSuccess: async () => invalidateCaseProgress({ caseId: id })
  });
  const { mutate: submitSolution } = api.casesProgress.submitSolution.useMutation({
    onError: (error) =>
    {
      console.log("error while submitting solution", error);
      notifications.show({
        color: "red",
        message: "Leider ist beim Einreichen deiner Lösung ein Fehler aufgetreten. Bitte versuche es erneut.",
        title: "Ups...",
      });
    },
    onSuccess: async () =>
    {
      console.log("solution submitted");
      await invalidateSubmittedCaseSolution({ caseId: id });
      setShowStepTwoModal(true);
    }
  });

  if(isLoading)
  {
    return null; 
  }

  const isDisabled = progressState !== "solving-case";

  return (
    <div css={styles.wrapper} id="solveCaseStepContent">
      {title && (
        <div css={styles.textAreaWrapper}>
          <Title order={2}>Gutachten verfassen</Title>
          <BodyText styleType="body-01-regular" component="p">
            Im Textfeld kannst du deine Klausurlösung oder -gliederung herunterschreiben, wie du es auch in der normalen Klausur machen würdest.
            Anschließend kannst du dir die Musterlösung anzeigen lassen und sie mit deiner Ausarbeitung vergleichen.
          </BodyText>
          <RichtextEditorField
            disabled={isDisabled}
            content={submittedCaseSolution?.solution ?? ""}
            action={(editor) =>
            {
              submitSolution({ 
                caseId: id,
                solution: editor?.getHTML() ?? ""
              });
            }}
            button={!isDisabled ? { text: "Lösung abgeben" } : undefined}
            variant="simple"
          />
          <Modal
            lockScroll={false}
            opened={showStepTwoModal}
            centered
            onClose={() => setShowStepTwoModal(false)}>
            <Flag/>
            <Title order={3}>Gut gemacht!</Title>
            <BodyText styleType="body-01-regular" component="p" ta="center">
              Dein Gutachten wurde gespeichert. Du kannst es nun mit der Musterlösung vergleichen
            </BodyText>
            <Button<"button">
              styleType="primary"
              onClick={() =>
              {
                setShowStepTwoModal(false);
                setProgressState({ caseId: id, progressState: "completed" });
              }}
              fullWidth>
              Musterlösung anzeigen
            </Button>
          </Modal>
        </div>
      )}
      {facts?.json && (
        <div css={styles.factsWrapper}>
          <Title order={2}>Sachverhalt</Title>
          <Richtext data={facts}/>
        </div>
      )}
    </div>
  );
};

export default CaseSolveCaseStep;
