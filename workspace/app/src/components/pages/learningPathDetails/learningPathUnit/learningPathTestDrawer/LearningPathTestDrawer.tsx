import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { DragDropGame } from "@/components/organisms/DragDropGame/DragDropGame";
import FillGapsGame from "@/components/organisms/FillGapsGame/FillGapsGame";
import SelectionCardGame from "@/components/organisms/SelectionCardGame/SelectionCardGame";
import useGamesProgress from "@/hooks/useGamesProgress";
import type { IDocumentLink } from "@/utils/richtext";

import { type IGenCase } from "@constellatio/cms/generated-types";
import { getGamesFromCase } from "@constellatio/cms/utils/case";
import { type Nullable } from "@constellatio/utility-types";
import { Drawer, ScrollArea } from "@mantine/core";
import { type FunctionComponent, useCallback } from "react";

import * as styles from "./LearningPathTestDrawer.styles";

type Props = {
  readonly caseLearningTest: Nullable<IGenCase>;
  readonly caseLearningTestId: string;
  readonly closeDrawer: () => void;
  readonly isOpened: boolean;
};

export const LearningPathTestDrawer: FunctionComponent<Props> = ({
  caseLearningTest,
  caseLearningTestId,
  closeDrawer,
  isOpened
}) =>
{
  const { data: gamesProgress, isLoading: isGamesProgressLoading } = useGamesProgress({ caseId: caseLearningTestId, queryType: "byCaseId" });
  const content = caseLearningTest?.fullTextTasks;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const documentLinkOverwrite = useCallback((props: any) =>
  {
    const node = props.node as unknown as IDocumentLink;
    return node && content?.connections
      ? content.connections?.map((component) =>
      {
        switch (component?.__typename)
        {
          case "CardSelectionGame":
            if(component.id != null && node?.attrs?.documentId === component?.id)
            {
              return (
                <div css={styles.gameWrapper}>
                  <SelectionCardGame {...component} caseId={caseLearningTestId} id={component.id}/>
                </div>
              );
            }
            break;
          case "DragNDropGame":
            if(component.id != null && node?.attrs?.documentId === component?.id)
            {
              return (
                <div css={styles.gameWrapper}>
                  <DragDropGame {...component} caseId={caseLearningTestId} id={component.id}/>
                </div>
              );
            }
            break;
          case "FillInGapsGame":
            if(node?.attrs?.documentId === component?.id)
            {
              return (
                <div css={styles.gameWrapper}>
                  <FillGapsGame {...component} caseId={caseLearningTestId}/>
                </div>
              );
            }
            break;
          default:
            console.warn(
              `Unknown component type: ${component?.__typename}`
            );
            return null;
        }
        return null;
      })
      : null;
  }, [caseLearningTestId, content?.connections]);

  if(!caseLearningTest || !content)
  {
    return null;
  }

  const games = getGamesFromCase(caseLearningTest);

  const currentGameIndex = games.findIndex(game =>
  {
    const gameProgress = gamesProgress?.find(gameProgress => gameProgress.gameId === game.id);
    const hasCompletedGame = gameProgress?.results.some(({ wasSolvedCorrectly }) => wasSolvedCorrectly);
    return !hasCompletedGame;
  });

  const completedGamesCount = games.filter(game =>
  {
    const gameProgress = gamesProgress?.find(gameProgress => gameProgress.gameId === game.id);
    const hasCompletedGame = gameProgress?.results.some(({ wasSolvedCorrectly }) => wasSolvedCorrectly);
    return hasCompletedGame;
  }).length;

  const areAllGamesCompleted = completedGamesCount === games.length;
  const currentGame = currentGameIndex === -1 ? games[0]! : games[currentGameIndex]!;
  const currentGameIndexInFullTextTasksJson = currentGame?.indexInFullTextTasksJson || 0;

  const renderedCaseContent = areAllGamesCompleted ? content : {
    ...content,
    json: {
      ...content?.json,
      content: content?.json?.content?.slice(0, (currentGameIndexInFullTextTasksJson || 0) + 1),
    },
  };

  return (
    <Drawer
      lockScroll={true}
      opened={isOpened}
      onClose={closeDrawer}
      title={<SlidingPanelTitle title={"title"} closeButtonAction={closeDrawer}/>}
      position="right"
      withCloseButton={false}
      size={760}
      scrollAreaComponent={ScrollArea.Autosize}
      styles={styles.drawerStyles()}>
      {/* {editorState.state !== "closed" && (
          <EditorForm
            onClose={onClose}
            editorState={editorState}
          />
        )}*/}
      <div css={styles.contentWrapper}>
        <Richtext
          data={renderedCaseContent}
          stylesOverwrite={styles.richTextWrapper}
          richTextOverwrite={{
            documentLink: documentLinkOverwrite,
            paragraph: richTextParagraphOverwrite,
          }}
        />
      </div>
    </Drawer>
  );
};
