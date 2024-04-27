import { Toc } from "@/components/organisms/floatingPanel/Toc";
import { usePrevious } from "@/hooks/usePrevious";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { slugFormatter } from "@/utils/utils";

import { useMantineTheme } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import React, {
  useLayoutEffect, useMemo, useRef, useState
} from "react";

import * as styles from "./FloatingPanel.styles";
import { getNumericalLabel, type TOCItem } from "./generateTocHelper";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { ArrowSolidDown } from "../../Icons/arrow-solid-down";
import { ArrowSolidRight } from "../../Icons/arrow-solid-right";

const scrollToElement = (e: React.MouseEvent<HTMLDivElement>, targetId: string): void =>
{
  e.stopPropagation();
  const targetElement = document.getElementById(targetId);
  if(targetElement) 
  {
    const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY - 100;
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
  const theme = useMantineTheme();
  const observedHeadlineId = useCaseSolvingStore(s => s.observedHeadlineId);
  const isHighlighted = item.id === observedHeadlineId;
  const isOneOfTheChildHeadlinesObserved = useMemo(() => hasId(item.children, observedHeadlineId), [item.children, observedHeadlineId]);
  const isExpanded = isHighlighted || isOneOfTheChildHeadlinesObserved;
  const { entry, ref: useIntersectionRef } = useIntersection<HTMLDivElement>({
    root: scrollAreaRef?.current,
    threshold: 1 
  });
  const isVisibleInScrollArea = entry?.isIntersecting ?? false;
  const itemRef = useRef<HTMLLIElement>(null);
  const wasHighlightedBefore = usePrevious(isHighlighted);

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

  const handleToggle = (): void => 
  {

  };

  if(item.id === "10")
  {
    console.log("----");
    console.log("isExpanded", isExpanded);
    console.log("shouldBeExpanded", isExpanded);
  }

  return (
    <li ref={itemRef} style={{ listStyleType: "none" }}>
      <div
        ref={useIntersectionRef}
        onClick={(e) => scrollToElement(e, slugFormatter(item.text))}
        style={{ paddingLeft: ((depth === 1 || depth >= 5) ? 0 : depth + 20) + "px" }}>
        <span
          key={`listItem-${itemNumber}`}
          onClick={handleToggle}
          css={styles.item({
            isExpandable: item.children.length > 0,
            isExpanded, 
            isHighlighted,
            theme
          })}>
          <div style={{ display: "flex", justifyContent: "flex-start", padding: "0 16px" }}>
            <BodyText component="p" styleType="body-01-medium">
              {item.children.length > 0 && (isExpanded ? <ArrowSolidDown/> : <ArrowSolidRight/>)}
            </BodyText>
            <BodyText
              component="p"
              className={slugFormatter(item.text)}
              styleType="body-01-medium">
              {getNumericalLabel(depth, itemNumber - 1)}&nbsp;{item.text} - {item.id}
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
