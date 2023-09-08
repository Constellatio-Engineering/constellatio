import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import { type IGenCase } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";

import { Title } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, type FunctionComponent } from "react";

import * as styles from "./CaseSolveCaseStep.styles";
import modalImg from "../../Icons/CaseResultModalIcon.png";

const CaseSolveCaseStep: FunctionComponent<IGenCase & {readonly setCaseStepIndex: React.Dispatch<React.SetStateAction<0 | 2 | 1>> }> = ({
  facts,
  setCaseStepIndex,
  title
}) => 
{
  const {
    setHasCaseSolvingStarted,
    setIsStepCompleted,
    setShowStepTwoModal,
    showStepTwoModal
  } = useCaseSolvingStore(); 
  useEffect(() => 
  {
    setIsStepCompleted(false);
    setHasCaseSolvingStarted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div css={styles.wrapper} id="solveCaseStepContent">
      {title && (
        <div css={styles.textAreaWrapper}>
          <Title order={2}>Solve case {title}</Title>
          <BodyText styleType="body-01-regular" component="p">
            Of course, the question of whether and how a shareholder can be excluded can also arise in the oHG. Read the related article after handling this case.
          </BodyText>
          <RichtextEditorField
            action={() => setShowStepTwoModal(true)}
            variant="simple"
          />
          <Modal
            opened={showStepTwoModal}
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
      {facts && facts.richTextContent && (
        <div css={styles.factsWrapper}>
          <Title order={3}>Facts</Title>
          <Richtext richTextContent={facts.richTextContent}/>
        </div>
      )}
    </div>
  );
};

export default CaseSolveCaseStep;
