import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type IGenCase } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { api } from "@/utils/api";
import { type Nullable } from "@/utils/types";

import { Title } from "@mantine/core";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseSolveCaseStep.styles";
import modalImg from "../../Icons/CaseResultModalIcon.png";

type Props = {
  readonly facts: IGenCase["facts"]; 
  readonly id: string;
  readonly title: Nullable<string>;
};

const CaseSolveCaseStep: FunctionComponent<Props> = ({ facts, id, title }) =>
{
  const {
    setShowStepTwoModal,
    setSolution,
    showStepTwoModal,
    solution
  } = useCaseSolvingStore((state) => state);

  const { invalidateCaseProgress } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutate: setProgressState } = api.casesProgress.setProgressState.useMutation({
    onError: (error) => console.error(error),
    onSuccess: async () => invalidateCaseProgress({ caseId: id })
  });

  // const updateCaseCompleteStateOnUpdate = (e: EditorEvents["update"]): void => 
  // {
  //   if(e.editor?.isEmpty)
  //   {
  //     setIsStepCompleted(false);
  //   }
  //   else 
  //   {
  //     setIsStepCompleted(true);
  //   }
  // };

  return (
    <div css={styles.wrapper} id="solveCaseStepContent">
      {title && (
        <div css={styles.textAreaWrapper}>
          <Title order={2}>Solve case {title}</Title>
          <BodyText styleType="body-01-regular" component="p">
            Of course, the question of whether and how a shareholder can be excluded can also arise in the oHG. Read the related article after handling this case.
          </BodyText>
          <RichtextEditorField
            onChange={() => {}}
            content={solution ?? ""}
            action={(editor) => 
            {
              const richTextContent: string = editor?.getHTML() ?? "";
              setSolution(richTextContent);
              setShowStepTwoModal(true);
            }}
            button={{ text: "Submit and see results" }}
            variant="simple"
          />
          <Modal
            lockScroll={false}
            opened={showStepTwoModal}
            centered
            onClose={() => setShowStepTwoModal(false)}>
            <Image
              src={modalImg?.src}
              width={70}
              height={70}
              alt="modal img"
            />
            <Title order={3}>Great job!</Title>
            <BodyText styleType="body-01-regular" component="p">
              Your solution has been saved. Now you can compare your solution to the resolution.
            </BodyText>
            <Button<"button">
              styleType="primary"
              onClick={() =>
              {
                setShowStepTwoModal(false);
                setProgressState({ caseId: id, progressState: "solving-case" });
              }}
              fullWidth>
              Review results
            </Button>
          </Modal>
        </div>
      )}
      {facts?.json && (
        <div css={styles.factsWrapper}>
          <Title order={3}>Facts</Title>
          <Richtext data={facts}/>
        </div>
      )}
    </div>
  );
};

export default CaseSolveCaseStep;
