import { Button } from "@/components/atoms/Button/Button";
import IconButtonBar from "@/components/iconButtonBar/IconButtonBar";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { Bookmark } from "@/components/Icons/Bookmark";
import { Edit } from "@/components/Icons/Edit";
import { Notepad } from "@/components/Icons/Notepad";
import { Pen } from "@/components/Icons/Pen";
import { Print } from "@/components/Icons/print";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { type IGenCase_Resolution, type IGenCase_Facts, type Maybe } from "@/services/graphql/__generated/sdk";
import caseSolvingStore from "@/stores/caseSolving.store";

import {
  Accordion, Container, Group, Text, Title, useMantineTheme 
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useRef, type FunctionComponent, useEffect } from "react";

import * as styles from "./CaseResultsReviewStep.styles";

export interface ICaseResultsReviewStepProps 
{
  readonly facts: Maybe<IGenCase_Facts>;
  readonly resolution: Maybe<IGenCase_Resolution>;
  readonly setCaseStepIndex: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
  readonly title: string;
}

const CaseResultsReviewStep: FunctionComponent<ICaseResultsReviewStepProps> = ({
  facts,
  resolution,
  setCaseStepIndex,
  title
}) => 
{
  const theme = useMantineTheme();
  const [isExpandSolution, setIsExpandSolution] = React.useState<boolean>(false);
  const icons = [
    { src: <Bookmark/>, title: "Bookmark" },
    { src: <Print/>, title: "Print" },
  ];
  const { solution } = caseSolvingStore();
  const solutionContent = useRef<HTMLDivElement>(null);
  const [solutionElementHight, setSolutionElementHight] = React.useState<number>(0);

  useEffect(() => 
  {
    if(solution && solutionContent.current !== undefined) 
    {
      solutionContent.current!.innerHTML = solution;
      setSolutionElementHight(solutionContent.current!.offsetHeight);
    }
  }, [solution]);

  const [isOpened, { close, open }] = useDisclosure(false);
  const editButtonClick = (): void => 
  {
    open();
  };

  const resetProgressButton = (): void => 
  {
    close();
    setCaseStepIndex(0);
  };

  const keepProgressButton = (): void => 
  {
    close();
    setCaseStepIndex(1);
  };

  return (
    <div css={styles.wrapper} id="ResultsReviewStepContent">
      <Container maw={1440}>
        <div css={styles.content}>
          <div css={styles.leftSideWrapper}>
            {facts?.json && (
              <div css={styles.factsWrapper}>
                <Accordion variant="separated">
                  <Accordion.Item value="facts">
                    <Accordion.Control>
                      <Title order={3}>Facts</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Richtext data={facts}/>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
            <div css={styles.solutionWrapper({ isExpandSolution, theme })}>
              <div className="solution-header">
                <Title order={3}><Pen/> Your solution</Title>
                <div className="edit-but">
                  <Button<"button"> onClick={() => editButtonClick()} styleType="secondarySimple"><Edit/> Edit
                  </Button>
                </div>
              </div>
              <div className="solution-content">
                <div ref={solutionContent}/>

              </div>
              {solutionElementHight > 240 && (
                <div className="show-all">
                  <Button<"button"> styleType="tertiary" onClick={() => setIsExpandSolution(prev => !prev)}>Show {!isExpandSolution ? "all" : "less"}<ArrowDown/></Button>
                </div>
              )}
            </div>
          </div>
          {resolution?.json && (
            <div css={styles.resolutionWrapper}>
              <div className="resolution-header">
                <Title order={2}><Notepad size={24}/> Resolution</Title>
                <div className="icons-bar">
                  <IconButtonBar icons={icons}/>
                </div>
              </div>
              <Richtext data={resolution}/>
            </div>
          )}
        </div>
      </Container>
      <Modal
        opened={isOpened}
        centered
        title="Reset case progress?"
        onClose={() => 
        {
          console.log("Closed");
          close();
        }}>
        <Text>
          Are you sure you want to delete all your test answers and case solution in {title} case?
        </Text>
        <Group noWrap grow w="100%">
          <Button<"button"> onClick={() => keepProgressButton()} fullWidth styleType="secondarySimple">
            No, keep data
          </Button>
          <Button<"button"> onClick={() => resetProgressButton()} styleType="primary" fullWidth>
            Yes, reset progress
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default CaseResultsReviewStep;
