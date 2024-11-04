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
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import ResetCaseProgressModal from "@/components/organisms/resetCaseProgressModal/ResetCaseProgressModal";
import useAddBookmark from "@/hooks/useAddBookmark";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useRemoveBookmark from "@/hooks/useRemoveBookmark";
import useSubmittedCaseSolution from "@/hooks/useSubmittedCaseSolution";
import { type IHeadingNode } from "@/utils/richtext";

import { type IGenCase_Facts, type IGenCase_Resolution, type Maybe } from "@constellatio/cms/generated-types";
import { type AddOrRemoveBookmarkSchema } from "@constellatio/schemas/routers/bookmarks/addOrRemoveBookmark.schema";
import {
  Accordion, Container, ScrollArea, Spoiler, Title 
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type FunctionComponent, useEffect, useRef, useState } from "react";

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
  const [isExpandSolution, setIsExpandSolution] = useState<boolean>(false);
  const { isLoading, submittedCaseSolution } = useSubmittedCaseSolution(caseId);
  const solutionContent = useRef<HTMLDivElement>(null);
  const [solutionElementHeight, setSolutionElementHeight] = useState<number>(0);
  const solution: string = isLoading ? "lädt..." : (submittedCaseSolution?.solution || "");
  const allResolutionHeadings = resolution?.json?.content?.filter((x: { attrs: { level: number }; type: "heading" }) => x.type === "heading");
  const { allCases = [] } = useCases();
  const { bookmarks } = useBookmarks(undefined);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const isItemBookmarked = bookmarkedCases.some(bookmark => bookmark.title === title) || false;
  const { mutate: addBookmark } = useAddBookmark();
  const { mutate: removeBookmark } = useRemoveBookmark({ shouldUseOptimisticUpdate: true });
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
                <div className="edit-but" style={{ visibility: "hidden" }}>
                  <Button<"button"> onClick={() => editButtonClick()} styleType="secondarySimple">
                    <Edit/>
                    Bearbeiten
                  </Button>
                </div>
              </div>
              {solutionElementHeight > 220 ? (
                <Spoiler
                  hideLabel={ShowLessBtn}
                  maxHeight={220}
                  showLabel={ShowAllBtn}
                  styles={styles.spoilerStyles({ isExpandSolution })}>
                  <div className="solution-content">
                    <ScrollArea h={isExpandSolution && solutionElementHeight > 220 ? 500 : undefined} offsetScrollbars>
                      <div ref={solutionContent} dangerouslySetInnerHTML={{ __html: solution }} style={{ wordBreak: "break-word" }}/>
                    </ScrollArea>
                  </div>
                </Spoiler>
              ) : (
                <div className="solution-content">
                  <div ref={solutionContent} dangerouslySetInnerHTML={{ __html: solution }} style={{ wordBreak: "break-word" }}/>
                </div>
              )}
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
      <ResetCaseProgressModal
        caseId={caseId}
        caseTitle={title}
        isOpened={isOpened}
        onClose={close}
      />
    </div>
  );
};

export default CaseResultsReviewStep;
