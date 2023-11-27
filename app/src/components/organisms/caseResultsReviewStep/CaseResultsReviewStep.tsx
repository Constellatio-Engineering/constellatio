/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import { RichTextHeadingOverwrite } from "@/components/helpers/RichTextHeadingOverwrite";
import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ArrowUp } from "@/components/Icons/ArrowUp";
import { Bookmark } from "@/components/Icons/Bookmark";
import { BookmarkFilledIcon } from "@/components/Icons/BookmarkFilledIcon";
import { Edit } from "@/components/Icons/Edit";
import { Notepad } from "@/components/Icons/Notepad";
import { Pen } from "@/components/Icons/Pen";
import { Print } from "@/components/Icons/print";
import { Modal } from "@/components/molecules/Modal/Modal";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import useAddBookmark from "@/hooks/useAddBookmark";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useRemoveBookmark from "@/hooks/useRemoveBookmark";
import useResetCaseProgress from "@/hooks/useResetCaseProgress";
import useSubmittedCaseSolution from "@/hooks/useSubmittedCaseSolution";
import { type AddOrRemoveBookmarkSchema } from "@/schemas/bookmarks/addOrRemoveBookmark.schema";
import { type IGenCase_Resolution, type IGenCase_Facts, type Maybe } from "@/services/graphql/__generated/sdk";
import { type IHeadingNode } from "types/richtext";

import {
  Accordion, Container, Group, ScrollArea, Spoiler, Text, Title 
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { usePostHog } from "posthog-js/react";
import React, { useRef, type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./CaseResultsReviewStep.styles";
import { getNestedHeadingIndex } from "../floatingPanel/generateTocHelper";
import IconButtonBar from "../iconButtonBar/IconButtonBar";

interface ICaseResultsReviewStepProps 
{
  readonly caseId: string;
  readonly facts: Maybe<IGenCase_Facts>;
  readonly resolution: Maybe<IGenCase_Resolution>;
  readonly title: string;
}

const CaseResultsReviewStep: FunctionComponent<ICaseResultsReviewStepProps> = ({
  caseId,
  facts,
  resolution,
  title
}) =>
{
  const resetCaseProgress = useResetCaseProgress();
  const [isExpandSolution, setIsExpandSolution] = useState<boolean>(false);
  const { isLoading, submittedCaseSolution } = useSubmittedCaseSolution(caseId);
  const solutionContent = useRef<HTMLDivElement>(null);
  const [solutionElementHeight, setSolutionElementHeight] = React.useState<number>(0);
  const solution: string = isLoading ? "lädt..." : (submittedCaseSolution?.solution || "");
  const allResolutionHeadings = resolution?.json?.content?.filter((x: { attrs: { level: number }; type: "heading" }) => x.type === "heading");
  const { allCases = [] } = useCases();
  const { bookmarks } = useBookmarks(undefined);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const isItemBookmarked = bookmarkedCases.some(bookmark => bookmark.title === title) || false;
  const { mutate: addBookmark } = useAddBookmark();
  const { mutate: removeBookmark } = useRemoveBookmark({ shouldUseOptimisticUpdate: true });
  // const posthog = usePostHog();
  const onBookmarkIconClick = (): void =>
  {
    if(!caseId)
    {
      return;
    }

    const bookmarkData: AddOrRemoveBookmarkSchema = {
      resourceId: caseId,
      resourceType: "case"
    };

    if(!isItemBookmarked)
    {
      addBookmark(bookmarkData);
      return;
    }
    else
    {
      removeBookmark(bookmarkData);
    }
  };

  const icons = [
    { click: () => onBookmarkIconClick(), src: isItemBookmarked ? <BookmarkFilledIcon/> : <Bookmark/>, title: "Bookmark" },
    // { src: <Pin/>, title: "Pin" },
    {
      click: () => 
      {
        // posthog.capture("print_btn", { variant: variant }); //TODO:: capturing but no variant here?
        window.print();
      },
      src: <Print/>,
      title: "Print",
    },
  ];

  useEffect(() => 
  {
    if(solution && solutionContent.current !== undefined) 
    {
      setSolutionElementHeight(solutionContent.current!.offsetHeight);
    }
  }, [solution]);

  const [isOpened, { close, open }] = useDisclosure(false);
  const editButtonClick = (): void => 
  {
    open();
  };

  const ShowAllBtn = (
    <Button<"a">
      styleType="tertiary"
      rightIcon={<ArrowDown size={20}/>}
      size="medium"
      component="a"
      onClick={() => setIsExpandSolution(true)}>
      Ausklappen
    </Button>
  );

  const ShowLessBtn = (
    <Button<"a">
      styleType="tertiary"
      rightIcon={<ArrowUp size={20}/>}
      size="medium"
      component="a"
      onClick={() => setIsExpandSolution(false)}>
      Einklappen
    </Button>
  );

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
                      <Title order={3}>Sachverhalt</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <ScrollArea h={500} offsetScrollbars>
                        <Richtext data={facts} richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}/>
                      </ScrollArea>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
            <div css={styles.solutionWrapper}>
              <div className="solution-header">
                <Title order={3}><Pen/> Deine Lösung</Title>
                <div className="edit-but">
                  <Button<"button"> onClick={() => editButtonClick()} styleType="secondarySimple"><Edit/> Bearbeiten
                  </Button>
                </div>
              </div>
              {
                solutionElementHeight > 220 ? (
                  <Spoiler
                    hideLabel={ShowLessBtn}
                    maxHeight={220}
                    showLabel={ShowAllBtn}
                    styles={styles.spoilerStyles({ isExpandSolution })}>
                    <div className="solution-content">
                      <ScrollArea h={isExpandSolution && solutionElementHeight > 220 ? 500 : undefined} offsetScrollbars>
                        <div ref={solutionContent} dangerouslySetInnerHTML={{ __html: solution }}/>
                      </ScrollArea>
                    </div>
                  </Spoiler>
                ) : (
                  <div className="solution-content">
                    <div ref={solutionContent} dangerouslySetInnerHTML={{ __html: solution }}/>
                  </div>
                )
              }
            </div>
          </div>
          {resolution?.json && (
            <div css={styles.resolutionWrapper}>
              <div className="resolution-header">
                <Title order={2}><Notepad size={24}/> Musterlösung</Title>
                <div className="icons-bar">
                  <IconButtonBar icons={icons}/>
                </div>
              </div>
              <Richtext
                data={resolution}
                richTextOverwrite={{
                  heading: (props) => 
                  {
                    const node = props!.node as unknown as IHeadingNode;
                    return RichTextHeadingOverwrite({ index: getNestedHeadingIndex(node, allResolutionHeadings), ...props });
                  },
                  paragraph: richTextParagraphOverwrite
                }}
              />
            </div>
          )}
        </div>
      </Container>
      <Modal
        lockScroll={false}
        opened={isOpened}
        centered
        title="Fallfortschritt zurücksetzen?"
        onClose={close}>
        <Text>
          Bist du dir sicher, dass du deine Antworten in der geführten Lösung und dein Gutachten zu&nbsp;<strong>{title}</strong>&nbsp;löschen willst?
        </Text>
        <Group noWrap grow w="100%">
          <Button<"button"> onClick={close} fullWidth styleType="secondarySimple">
            Nein, behalten
          </Button>
          <Button<"button"> onClick={() => resetCaseProgress({ caseId })} styleType="primary" fullWidth>
            Ja, zurücksetzen
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default CaseResultsReviewStep;
