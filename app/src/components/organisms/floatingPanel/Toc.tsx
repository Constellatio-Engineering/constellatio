import { TocItem } from "@/components/organisms/floatingPanel/TocItem";

import React, { type FunctionComponent } from "react";

import * as styles from "./FloatingPanel.styles";
import { type TOCItem } from "./generateTocHelper";

type Toc =
{
  readonly isExpanded: boolean;
  readonly scrollAreaRef: React.RefObject<HTMLDivElement> | null;
  readonly tocItems: TOCItem[];
};

export const Toc: FunctionComponent<Toc> = ({ isExpanded, scrollAreaRef, tocItems }) =>
{
  const tocFiltered = tocItems.filter(Boolean).filter((item) => item?.text);

  return (
    <ul css={styles.renderTOCList(isExpanded)}>
      {tocFiltered.map((item, index) => (
        <TocItem
          scrollAreaRef={scrollAreaRef}
          key={`toc-ul-listItem-${index}`}
          depth={item.level ?? 1}
          item={item}
          itemNumber={index + 1}
          total={tocFiltered.length}
        />
      ))}
    </ul>
  );
};
