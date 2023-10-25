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
    const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY - 350;
    window.scrollTo({ top: targetOffset, });
  }
};

export const TOCItemComponent: React.FC<{ readonly depth: number; readonly item: TOCItem; readonly itemNumber: number; readonly total: number }> = ({
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
  const shouldBeExpanded = (): boolean => 
  {
    if(slugFormatter(item.text) === observedHeadline.slug || item.level >= observedHeadline.level) 
    {
      return true;
    }
    if(slugFormatter(item.text) !== observedHeadline.slug && item.level === observedHeadline.level) 
    {
      return false;
    }
    return isExpanded;
  };

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
        paddingLeft: ((depth === 1 || depth >= 5) ? 0 : depth + 20) + "px"
      }}>
      <span
        onClick={handleToggle}
        css={styles.item({
          highlighted: shouldBeHighlighted, 
          isExpandable: item.children.length > 0, 
          isExpanded: shouldBeExpanded(), 
          isTopLevel: true, 
          theme
        })}>
        <div style={{ display: "flex", justifyContent: "flex-start", padding: "0 16px" }}>
          <BodyText component="p" styleType="body-01-medium">
            {item.children.length > 0 && (shouldBeExpanded() ? <ArrowSolidDown/> : <ArrowSolidRight/>)}
          </BodyText>
          <BodyText
            component="p"
            className={slugFormatter(item.text)}
            styleType="body-01-medium">
            {getNumericalLabel(depth, itemNumber - 1)}&nbsp;{item.text}
          </BodyText>
        </div>
        {depth === 0 && <div style={{ paddingRight: "24px" }}>{itemNumber}/{total}</div>}
      </span>
      {shouldBeExpanded() && item.children.length > 0 && renderTOC(item.children, depth + 1)}
    </div>
  );
};
