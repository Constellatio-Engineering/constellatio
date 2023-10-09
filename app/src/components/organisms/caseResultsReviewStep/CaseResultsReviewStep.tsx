import { Button } from "@/components/atoms/Button/Button";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ArrowUp } from "@/components/Icons/ArrowUp";
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
  Accordion, Container, Group, ScrollArea, Spoiler, Text, Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useRef, type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./CaseResultsReviewStep.styles";
import IconButtonBar from "../iconButtonBar/IconButtonBar";

interface ICaseResultsReviewStepProps 
{
  readonly facts: Maybe<IGenCase_Facts>;
  readonly resolution: Maybe<IGenCase_Resolution>;
  readonly title: string;
}

const CaseResultsReviewStep: FunctionComponent<ICaseResultsReviewStepProps> = ({ facts, resolution, title }) => 
{
  const [isExpandSolution, setIsExpandSolution] = useState<boolean>(false);
  const solution = caseSolvingStore((s) => s.solution);
  const solutionContent = useRef<HTMLDivElement>(null);
  const [solutionElementHight, setSolutionElementHight] = React.useState<number>(0);
  const setCaseStepIndex = caseSolvingStore((state) => state.setCaseStepIndex);

  const icons = [
    { src: <Bookmark/>, title: "Bookmark" },
    { src: <Print/>, title: "Print" },
  ];

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

  const ShowAllBtn = (
    <Button<"button">
      styleType="tertiary"
      rightIcon={<ArrowDown size={20}/>}
      size="medium"
      onClick={() => setIsExpandSolution(true)}>
      Show all
    </Button>
  );

  const ShowLessBtn = (
    <Button<"button">
      styleType="tertiary"
      rightIcon={<ArrowUp size={20}/>}
      size="medium"
      onClick={() => setIsExpandSolution(false)}>
      Show less
    </Button>
  );

  return (
    <div css={styles.wrapper} id="ResultsReviewStepContent">
      <Container maw={1440}>
        <div css={styles.content}>
          <div css={styles.leftSideWrapper}>
            {facts?.json && (
              <div css={styles.factsWrapper}>
                <Accordion variant="separated" defaultValue="facts">
                  <Accordion.Item value="facts">
                    <Accordion.Control>
                      <Title order={3}>Facts</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <ScrollArea h={500} offsetScrollbars>
                        <Richtext data={facts}/>
                      </ScrollArea>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
            <div css={styles.solutionWrapper}>
              <div className="solution-header">
                <Title order={3}><Pen/> Your solution</Title>
                <div className="edit-but">
                  <Button<"button"> onClick={() => editButtonClick()} styleType="secondarySimple"><Edit/> Edit
                  </Button>
                </div>
              </div>
              {
                solutionElementHight > 240 ? (
                  <Spoiler
                    hideLabel={ShowLessBtn}
                    maxHeight={220}
                    showLabel={ShowAllBtn}
                    styles={styles.spoilerStyles({ isExpandSolution })}>
                    <div className="solution-content">
                      <ScrollArea h={isExpandSolution && solutionElementHight > 240 ? 500 : undefined} offsetScrollbars>
                        <div ref={solutionContent}/>
                      </ScrollArea>
                    </div>
                  </Spoiler>
                ) : (
                  <div className="solution-content">
                    <div ref={solutionContent}/>
                  </div>
                )
              }
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
        lockScroll={false}
        opened={isOpened}
        centered
        title="Reset case progress?"
        onClose={() => 
        {
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
