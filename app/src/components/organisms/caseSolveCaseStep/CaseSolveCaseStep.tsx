import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import { type IGenCase } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";

import { Title } from "@mantine/core";
import { type EditorEvents } from "@tiptap/react";
import Image from "next/image";
import React, { useEffect, type FunctionComponent } from "react";

import * as styles from "./CaseSolveCaseStep.styles";
import modalImg from "../../Icons/CaseResultModalIcon.png";

const CaseSolveCaseStep: FunctionComponent<IGenCase> = ({ facts, title }) => 
{
  const {
    setCaseStepIndex,
    setHasCaseSolvingStarted,
    setIsStepCompleted,
    setShowStepTwoModal,
    setSolution,
    showStepTwoModal,
    solution
  } = useCaseSolvingStore((state) => state);
  useEffect(() => 
  {
    setIsStepCompleted(false);
    setHasCaseSolvingStarted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateCaseCompleteStateOnUpdate = (e: EditorEvents["update"]): void => 
  {
    if(e.editor?.isEmpty)
    {
      setIsStepCompleted(false);
    }
    else 
    {
      setIsStepCompleted(true);
    }
  };

  return (
    <div css={styles.wrapper} id="solveCaseStepContent">
      {title && (
        <div css={styles.textAreaWrapper}>
          <Title order={2}>Solve case {title}</Title>
          <BodyText styleType="body-01-regular" component="p">
            Of course, the question of whether and how a shareholder can be excluded can also arise in the oHG. Read the related article after handling this case.
          </BodyText>
          <RichtextEditorField
            onChange={(e) => updateCaseCompleteStateOnUpdate(e)}
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
            opened={showStepTwoModal}
            lockScroll={false}
            centered
            onClose={function(): void 
            {
              setShowStepTwoModal(false);
            }}>
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
              // next casePage step
                setCaseStepIndex(2);
                // close modal
                setShowStepTwoModal(false);
              }}
              fullWidth>
              Review results
            </Button>
          </Modal>
        </div>
      )}
      {facts && facts.json && (
        <div css={styles.factsWrapper}>
          <Title order={3}>Facts</Title>
          <Richtext data={facts}/>
        </div>
      )}
    </div>
  );
};

export default CaseSolveCaseStep;
