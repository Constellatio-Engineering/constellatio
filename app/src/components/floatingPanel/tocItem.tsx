import { useMantineTheme } from "@mantine/core";
import React, { useState } from "react";

import * as styles from "./FloatingPanel.styles";
import { renderTOC, type TOCItem } from "./generateTocHelper";
import { BodyText } from "../atoms/BodyText/BodyText";
import { ArrowSolidDown } from "../Icons/arrow-solid-down";
import { ArrowSolidRight } from "../Icons/arrow-solid-right";
export const TOCItemComponent: React.FC<{ readonly depth: number; readonly item: TOCItem; readonly itemNumber: number; readonly total: number }> = ({
  depth,
  item,
  itemNumber,
  total
}) => 
{
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggle = (): void => 
  {
    setIsExpanded(!isExpanded);
  };
  const theme = useMantineTheme();
  return (
    <div style={{
      paddingLeft: (depth === 0 ? 0 : depth + 10) + "px" 
    }}>
      <span onClick={handleToggle} style={{ cursor: "pointer" }} css={styles.item({ isExpandable: item.children.length > 0, isExpanded, theme })}>
        <div style={{ display: "flex", justifyContent: "flex-start", padding: "0 16px" }}>
          <BodyText component="p" styleType="body-01-medium">{item.children.length > 0 && (isExpanded ? <ArrowSolidDown/> : <ArrowSolidRight/>)}</BodyText>
          <BodyText component="p" styleType="body-01-medium">{item.text}</BodyText>
        </div>
        {depth === 0 && <div style={{ paddingRight: "24px" }}>{itemNumber}/{total}</div>}
      </span>
      {isExpanded && item.children.length > 0 && renderTOC(item.children, depth + 1)}
    </div>
  );
};
