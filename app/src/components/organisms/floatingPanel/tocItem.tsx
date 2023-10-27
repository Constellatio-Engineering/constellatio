import useCaseSolvingStore from "@/stores/caseSolving.store";
import { slugFormatter } from "@/utils/utils";

import { useMantineTheme } from "@mantine/core";
import React, { useState } from "react";

import * as styles from "./FloatingPanel.styles";
import { getNumericalLabel, renderTOC, type TOCItem } from "./generateTocHelper";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { ArrowSolidDown } from "../../Icons/arrow-solid-down";
import { ArrowSolidRight } from "../../Icons/arrow-solid-right";

const scrollToElement = (e: React.MouseEvent<HTMLDivElement>, targetId: string): void => 
{
  e.stopPropagation();
  const targetElement = document.getElementById(targetId);
  if(targetElement) 
  {
    const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;
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

export const TOCItemComponent: React.FC<ITOCItemComponentProps> = ({
  depth,
  item,
  itemNumber,
  total
}) => 
{
  const theme = useMantineTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const observedHeadline = useCaseSolvingStore(s => s.observedHeadline);
  const shouldBeHighlighted = slugFormatter(item.text) === observedHeadline.slug;
  const [shouldBeExpandedState, setShouldBeExpandedState] = useState(false);
  const shouldBeExpanded = React.useCallback((): boolean => 
  {
    const currentItemSlug = slugFormatter(item.text);
    const currentItemLevel = item.level;
    if(currentItemSlug === observedHeadline.slug && currentItemLevel === observedHeadline.level) 
    {  
      return true;
    }
    if(currentItemSlug !== observedHeadline.slug && currentItemLevel < observedHeadline.level) 
    {
      return true;
    }
    return false;
  }, [item.level, item.text, observedHeadline.level, observedHeadline.slug]);
  React.useLayoutEffect(() => 
  {
    setShouldBeExpandedState(shouldBeExpanded());
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
      style={{
        paddingInline: ((depth === 1 || depth >= 5) ? 0 : depth + 20) + "px", 
      }}>
      <span
        key={`listItem-${itemNumber}`}
        onClick={handleToggle}
        css={styles.item({
          highlighted: shouldBeHighlighted, 
          isExpandable: item.children.length > 0, 
          isExpanded: shouldBeExpandedState,
          isTopLevel: true, 
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
        {depth === 0 && <div style={{}}>{itemNumber}/{total}</div>}
      </span>
      {shouldBeExpandedState && item.children.length > 0 && renderTOC(item.children, depth + 1)}
    </div>
  );
};
