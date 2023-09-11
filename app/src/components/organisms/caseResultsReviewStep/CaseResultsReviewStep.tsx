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
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseResultsReviewStep.styles";

export interface ICaseResultsReviewStepProps
{
  readonly facts: Maybe<IGenTextElement>;
  readonly resolution: Maybe<IGenTextElement>;
}

const CaseResultsReviewStep: FunctionComponent<ICaseResultsReviewStepProps> = ({ facts, resolution }) => 
{
  console.log({ facts, resolution });
  const theme = useMantineTheme();
  const [isExpandSolution, setIsExpandSolution] = React.useState<boolean>(false);
  const icons = [
    { src: <Bookmark/>, title: "Bookmark" },
    { src: <Print/>, title: "Print" },
  ];
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
                  <Button<"button"> styleType="secondarySimple"><Edit/> Edit</Button>
                </div>
              </div>
              <div className="solution-content">
                <BodyText styleType="body-01-regular">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi possimus mollitia repudiandae architecto eum cumque. Perspiciatis vitae vero esse placeat voluptatem pariatur quaerat cupiditate consequuntur ea deleniti, iure fugit eum aliquid illum delectus. Quasi esse harum molestias ipsum sequi consequatur rem mollitia voluptates eaque ea recusandae, necessitatibus ratione et totam labore odio distinctio. Dolorum, possimus voluptatum pariatur aliquid aspernatur ex est quas, perferendis nihil esse repellat similique laborum ullam assumenda. Et, molestiae ut sunt accusantium doloremque nisi, vero iusto ad voluptatum voluptates quae saepe ipsum exercitationem? Corporis, maiores aliquid iure praesentium atque quod, non ipsam enim aperiam totam voluptates, ab voluptatum sed accusamus hic consectetur ducimus dolore temporibus officia tempora cumque necessitatibus numquam nostrum aliquam. Pariatur ipsa ab officiis voluptate dolore numquam similique autem architecto ullam repellat laboriosam esse ad perspiciatis aliquid nulla itaque, ducimus facere beatae facilis perferendis cum. Dolores doloribus vero atque, quos quam tempora totam in impedit officia rem et enim beatae architecto ab quasi velit aliquid reiciendis perspiciatis explicabo ad debitis. Molestiae placeat debitis illo necessitatibus, laudantium dolorum impedit assumenda, minus aliquam harum, expedita atque iure obcaecati? Fugit magni libero, quae, asperiores omnis harum impedit sit sequi nobis laboriosam dolor? Earum molestiae quam cum doloremque eos?</BodyText>
              </div>
              <div className="show-all">
                <Button<"button"> styleType="tertiary" onClick={() => setIsExpandSolution(prev => !prev)}>Show {!isExpandSolution ? "all" : "less"}<ArrowDown/></Button>
              </div>
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
