import useCaseSolvingStore from "@/stores/caseSolving.store";
import { slugFormatter } from "@/utils/utils";

import { useMantineTheme } from "@mantine/core";
// import Link from "next/link";
// import { useWindowScroll } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

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
    const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY - 70;
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [highlighted, setHighlighted] = useState<boolean>(false);
  // const [scroll, scrollTo] = useWindowScroll();
  const handleToggle = (): void => 
  {
    setHighlighted(!highlighted);
    if(item.children.length > 0)
    {
      setIsExpanded(!isExpanded);
    }
  };
  const theme = useMantineTheme();
  const observedHeadline = useCaseSolvingStore(s => s.observedHeadline);
  useEffect(() => 
  {
    if(observedHeadline === slugFormatter(item.text))
    {
      setIsExpanded(true);
    }
  }, [item.text, observedHeadline]);
  return (
    <div
      onClick={(e) => scrollToElement(e, slugFormatter(item.text))}
      style={{
        paddingLeft: ((depth === 1 || depth >= 5) ? 0 : depth + 20) + "px" 
      }}>
      <span
        onClick={handleToggle}
        css={styles.item({
          highlighted: observedHeadline === slugFormatter(item.text), isExpandable: item.children.length > 0, isExpanded, isTopLevel: true, theme
        })}>
        <div style={{ display: "flex", justifyContent: "flex-start", padding: "0 16px" }}>
          <BodyText component="p" styleType="body-01-medium">{item.children.length > 0 && (isExpanded ? <ArrowSolidDown/> : <ArrowSolidRight/>)}</BodyText>
          <BodyText component="p" styleType="body-01-medium">{getNumericalLabel(depth + 1, itemNumber - 1)}&nbsp;{item.text}</BodyText>
        </div>
        {depth === 0 && <div style={{ paddingRight: "24px" }}>{itemNumber}/{total}</div>}
      </span>
      {isExpanded && item.children.length > 0 && renderTOC(item.children, depth + 1)}
    </div>
  );
};
