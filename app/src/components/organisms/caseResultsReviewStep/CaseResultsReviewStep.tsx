import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import IconButton from "@/components/atoms/iconButton/IconButton";
import IconButtonBar from "@/components/iconButtonBar/IconButtonBar";
import { ArrowSolidDown } from "@/components/Icons/arrow-solid-down";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { Bookmark } from "@/components/Icons/Bookmark";
import { Edit } from "@/components/Icons/Edit";
import { Notepad } from "@/components/Icons/Notepad";
import { Pen } from "@/components/Icons/Pen";
import { Print } from "@/components/Icons/print";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { type Maybe, type IGenTextElement } from "@/services/graphql/__generated/sdk";

import { Accordion, Container, Title, useMantineTheme } from "@mantine/core";
import React, { useRef, type FunctionComponent, useEffect } from "react";

import * as styles from "./CaseResultsReviewStep.styles";
import caseSolvingStore from "@/stores/caseSolving.store";

export interface ICaseResultsReviewStepProps
{
  readonly facts: Maybe<IGenTextElement>;
  readonly resolution: Maybe<IGenTextElement>;
  setCaseStepIndex:React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
}

const CaseResultsReviewStep: FunctionComponent<ICaseResultsReviewStepProps> = ({ facts, resolution,setCaseStepIndex }) => 
{
  console.log({ facts, resolution });
  const theme = useMantineTheme();
  const [isExpandSolution, setIsExpandSolution] = React.useState<boolean>(false);
  const icons = [
    { src: <Bookmark/>, title: "Bookmark" },
    { src: <Print/>, title: "Print" },
  ];
  const { solution } = caseSolvingStore();
  const solutionContent=  useRef<HTMLDivElement>(null)
  const [solutionElementHight, setSolutionElementHight] = React.useState<number>(0);
  
  useEffect(() => {
    console.log({ solution });
    if(solution && solutionContent.current !== undefined)
    {
        solutionContent.current!.innerHTML = solution;
        setSolutionElementHight(solutionContent.current!.offsetHeight);
    }
  }, [solution])
  
  return (
    <div css={styles.wrapper} id="ResultsReviewStepContent">
      <Container maw={1440}>
        <div css={styles.content}>
          <div>
            {facts && (
              <div css={styles.factsWrapper}>
                <Accordion variant="separated">
                  <Accordion.Item value="facts">
                    <Accordion.Control>
                      <Title order={3}>Facts</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Richtext richTextContent={facts.richTextContent}/>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
            <div css={styles.solutionWrapper({ isExpandSolution, theme })}>
              <div className="solution-header">
                <Title order={3}><Pen/> Your solution</Title>
                <div className="edit-but">
                  <Button<"button"> onClick={()=> setCaseStepIndex(1)} styleType="secondarySimple"><Edit/> Edit</Button>
                </div>
              </div>
              <div className="solution-content">
               <div  ref={solutionContent}/>

              </div>
            {solutionElementHight > 240 &&  <div className="show-all">
                <Button<"button"> styleType="tertiary" onClick={() => setIsExpandSolution(prev => !prev)}>Show {!isExpandSolution ? "all" : "less"}<ArrowDown/></Button>
              </div>}
            </div>
          </div>
          <div css={styles.resolutionWrapper}>
            <div className="resolution-header">
              <Title order={2}><Notepad size={24}/> Resolution</Title>
              <div className="icons-bar">
                <IconButtonBar icons={icons}/>
              </div>
            </div>
            <Richtext richTextContent={resolution?.richTextContent}/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CaseResultsReviewStep;
