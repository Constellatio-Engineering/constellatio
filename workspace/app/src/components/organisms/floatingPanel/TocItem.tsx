import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { headingObservedThreshold } from "@/components/organisms/caseCompleteTestsStep/CaseCompleteTestsStep";
import { Toc } from "@/components/organisms/floatingPanel/Toc";
import { usePrevious } from "@/hooks/usePrevious";
import useCaseSolvingStore from "@/stores/caseSolving.store";

import { useIntersection } from "@mantine/hooks";
import React, {
  useEffect, useLayoutEffect, useMemo, useRef, useState 
} from "react";

import * as styles from "./FloatingPanel.styles";
import { getNumericalLabel, type TOCItem } from "./generateTocHelper";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { ArrowSolidDown } from "../../Icons/arrow-solid-down";
import { ArrowSolidRight } from "../../Icons/arrow-solid-right";

import { slugFormatter } from "@/utils/utils";

const scrollToElement = (e: React.MouseEvent<HTMLDivElement>, targetId: string): void =>
{
  e.stopPropagation();
  const targetElement = document.getElementById(targetId);
  if(targetElement) 
  {
    const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY - (window.innerHeight * headingObservedThreshold - 50);
    window.scrollTo({ behavior: "instant", top: targetOffset });
  }
};

const hasId = (children: TOCItem[], targetId: string | undefined): boolean =>
{
  if(!targetId)
  {
    return false;
  }

  for(const child of children)
  {
    if(child.id === targetId)
    {
      return true;
    }
    if(child.children && child.children.length > 0)
    {
      if(hasId(child.children, targetId))
      {
        return true;
      }
    }
  }
  return false;
};

interface ITOCItemComponentProps
{
  readonly depth: number;
  readonly item: TOCItem;
  readonly itemNumber: number;
  readonly scrollAreaRef: React.RefObject<HTMLDivElement> | null;
  readonly total: number;
}

export const TocItem: React.FC<ITOCItemComponentProps> = ({
  depth,
  item,
  itemNumber,
  scrollAreaRef,
  total
}) => 
{
  const observedHeadlineId = useCaseSolvingStore(s => s.observedHeadlineId);
  const observedHeadlineIdBefore = usePrevious(observedHeadlineId);
  const isHighlighted = item.id === observedHeadlineId;
  const isOneOfTheChildHeadlinesObserved = useMemo(() => hasId(item.children, observedHeadlineId), [item.children, observedHeadlineId]);
  const { entry, ref: useIntersectionRef } = useIntersection<HTMLDivElement>({
    root: scrollAreaRef?.current,
    threshold: 1 
  });
  const isVisibleInScrollArea = entry?.isIntersecting ?? false;
  const itemRef = useRef<HTMLLIElement>(null);
  const wasHighlightedBefore = usePrevious(isHighlighted);
  const [toggleState, setToggleState] = useState<"expanded" | "collapsed" | undefined>(undefined);
  const isExpanded = (toggleState === "expanded" || isHighlighted || isOneOfTheChildHeadlinesObserved) && toggleState !== "collapsed";

  useEffect(() =>
  {
    if(toggleState === undefined)
    {
      return;
    }

    if(observedHeadlineIdBefore !== observedHeadlineId && (isHighlighted || isOneOfTheChildHeadlinesObserved))
    {
      setToggleState(undefined);
    }
  }, [isHighlighted, isOneOfTheChildHeadlinesObserved, observedHeadlineId, observedHeadlineIdBefore, toggleState]);

  useLayoutEffect(() =>
  {
    if(!itemRef.current || !scrollAreaRef?.current)
    {
      return;
    }

    if(isHighlighted && !wasHighlightedBefore && !isVisibleInScrollArea)
    {
      scrollAreaRef.current.scrollTo({
        behavior: "instant",
        top: itemRef.current.offsetTop - 70
      });
    }
  }, [isVisibleInScrollArea, scrollAreaRef, isHighlighted, wasHighlightedBefore]);

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>): void =>
  {
    e.stopPropagation();
    setToggleState(isExpanded ? "collapsed" : "expanded");
  };

  return (
    <li ref={itemRef} style={{ listStyleType: "none" }}>
      <div
        ref={useIntersectionRef}
        onClick={(e) => scrollToElement(e, slugFormatter(item.text))}
        style={{ paddingLeft: ((depth === 1 || depth >= 5) ? 0 : depth + 20) + "px" }}>
        <span
          key={`listItem-${itemNumber}`}
          style={{
          }}
          css={styles.item({
            isExpandable: item.children.length > 0,
            isExpanded, 
            isHighlighted,
          })}>
          <div css={styles.itemTextWrapper}>
            {item.children.length > 0 && (
              <UnstyledButton styles={styles.expandIconButton} onClick={handleExpand}>
                {isExpanded ? <ArrowSolidDown/> : <ArrowSolidRight/>}
              </UnstyledButton>
            )}
            <BodyText
              component="p"
              className={slugFormatter(item.text)}
              styleType="body-01-medium">
              {getNumericalLabel(depth, itemNumber - 1)}&nbsp;{item.text}
            </BodyText>
          </div>
          {depth === 0 && (
            <div>{itemNumber}/{total}</div>
          )}
        </span>
        {item.children.length > 0 && (
          <Toc
            tocItems={item.children}
            isExpanded={isExpanded}
            scrollAreaRef={scrollAreaRef}
          />
        )}
      </div>
    </li>
  );
};
