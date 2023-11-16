import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { type IStatusLabel } from "@/components/atoms/statusLabel/StatusLabel";
import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { CaseSolvedIcon } from "@/components/Icons/CaseSolved";
import { Check } from "@/components/Icons/Check";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { useDataLossProtection } from "@/hooks/useDataLossProtection";
import useSubmittedCaseSolution from "@/hooks/useSubmittedCaseSolution";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type IGenCase } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { api } from "@/utils/api";
import { type Nullable } from "@/utils/types";

import { Skeleton, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent, useState } from "react";

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
  const { isLoading: isSubmittedCaseSolutionLoading, submittedCaseSolution } = useSubmittedCaseSolution(id);
  const [editorContent, setEditorContent] = useState<string>(submittedCaseSolution?.solution ?? "");
  const hasUnsavedChanges = (editorContent !== submittedCaseSolution?.solution) && editorContent !== "";
  const isDisabled = progressState !== "solving-case";

  useDataLossProtection(hasUnsavedChanges);

  const { mutate: setProgressState } = api.casesProgress.setProgressState.useMutation({
    onError: (error) => console.error(error),
    onSuccess: async () => invalidateCaseProgress({ caseId: id })
  });

  const { mutate: submitSolution } = api.casesProgress.submitSolution.useMutation({
    onError: (error) =>
    {
      console.log("error while submitting solution", error);
      notifications.show({
        autoClose: false,
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

  const { mutate: saveSolution } = api.casesProgress.submitSolution.useMutation({
    onError: () =>
    {
      notifications.show({
        color: "red",
        message: "Leider ist beim Speichern deiner Lösung ein Fehler aufgetreten. Bitte versuche es erneut.",
        title: "Ups...",
      });
    },
    onSuccess: async () =>
    {
      await invalidateSubmittedCaseSolution({ caseId: id });
    }
  });

  return (
    <div css={styles.wrapper} id="solveCaseStepContent">
      {title && (
        <div css={styles.textAreaWrapper}>
          <Title order={2}>Gutachten verfassen</Title>
          <BodyText styleType="body-01-regular" component="p">
            Im Textfeld kannst du deine Klausurlösung oder -gliederung herunterschreiben, wie du es auch in der normalen Klausur machen würdest.
            Anschließend kannst du dir die Musterlösung anzeigen lassen und sie mit deiner Ausarbeitung vergleichen.
          </BodyText>
          {isSubmittedCaseSolutionLoading ? (
            <>
              <Skeleton height={30} style={{ marginBottom: 20 }}/>
              <Skeleton height={300} style={{ marginBottom: 20 }}/>
            </>
          ) : (
            <RichtextEditorField
              disabled={isDisabled}
              onChange={({ editor }) => setEditorContent(editor.getHTML())}
              content={submittedCaseSolution?.solution ?? ""}
              buttons={[
                {
                  action: (editor) => saveSolution({
                    caseId: id,
                    solution: editor?.getHTML() ?? ""
                  }),
                  props: {
                    disabled: !hasUnsavedChanges,
                    size: "large",
                    styleType: "secondarySubtle"
                  },
                  text: "Zwischenspeichern"
                },
                {
                  action: (editor) => submitSolution({
                    caseId: id,
                    solution: editor?.getHTML() ?? ""
                  }),
                  props: {
                    leftIcon: <Check/>,
                    size: "large",
                    styleType: "primary",
                  },
                  text: "Lösung abgeben"
                }
              ]}
              variant="simple"
            />
          )}
          <Modal
            lockScroll={false}
            opened={showStepTwoModal}
            centered
            closeOnEscape={false}
            closeOnClickOutside={false}
            onClose={() => setShowStepTwoModal(false)}>
            <CaseSolvedIcon size={120}/>
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
          <Richtext data={facts} richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}/>
        </div>
      )}
    </div>
  );
};

export default CaseSolveCaseStep;
