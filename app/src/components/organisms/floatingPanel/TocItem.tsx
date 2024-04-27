import { Toc } from "@/components/organisms/floatingPanel/Toc";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { slugFormatter } from "@/utils/utils";

import { useMantineTheme } from "@mantine/core";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";

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
    window.scrollTo({ top: targetOffset, });
  }
};

interface ITOCItemComponentProps 
{
  readonly depth: number;
  readonly item: TOCItem;
  readonly itemNumber: number;
  readonly total: number;
}

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

export const TocItem: React.FC<ITOCItemComponentProps> = ({
  depth,
  item,
  itemNumber,
  total
}) => 
{
  const theme = useMantineTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const observedHeadlineId = useCaseSolvingStore(s => s.observedHeadlineId);
  const shouldBeHighlighted = item.id === observedHeadlineId;
  const [shouldBeExpandedState, setShouldBeExpandedState] = useState(false);
  const shouldBeExpanded = useMemo(() => hasId(item.children, observedHeadlineId), [item.children, observedHeadlineId]);

  useLayoutEffect(() =>
  {
    setShouldBeExpandedState(shouldBeExpanded);
  }, [shouldBeExpanded]);

  const handleToggle = (): void => 
  {
    if(item.children.length > 0) 
    {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      onClick={(e) => scrollToElement(e, slugFormatter(item.text))}
      style={{ paddingLeft: ((depth === 1 || depth >= 5) ? 0 : depth + 20) + "px" }}>
      <span
        key={`listItem-${itemNumber}`}
        onClick={handleToggle}
        css={styles.item({
          highlighted: shouldBeHighlighted, 
          isExpandable: item.children.length > 0, 
          isExpanded: shouldBeExpandedState,
          theme
        })}>
        <div style={{ display: "flex", justifyContent: "flex-start", padding: "0 16px" }}>
          <BodyText component="p" styleType="body-01-medium">
            {item.children.length > 0 && (shouldBeExpandedState ? <ArrowSolidDown/> : <ArrowSolidRight/>)}
          </BodyText>
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
      {shouldBeExpandedState && item.children.length > 0 && (
        <Toc tocItems={item.children}/>
      )}
    </div>
  );
};
