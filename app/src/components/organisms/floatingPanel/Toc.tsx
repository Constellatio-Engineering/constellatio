import { TocItem } from "@/components/organisms/floatingPanel/TocItem";

import React, { type FunctionComponent } from "react";

import * as styles from "./FloatingPanel.styles";
import { type TOCItem } from "./generateTocHelper";

type Toc =
{
  readonly tocItems: TOCItem[];
};

export const Toc: FunctionComponent<Toc> = ({ tocItems }) =>
{
  const tocFiltered = tocItems.filter(Boolean).filter((item) => item?.text);

  return (
    <ul css={styles.renderTOCList}>
      {tocFiltered.map((item, index) => (
        <li key={`toc-ul-listItem-${index}`} style={{ listStyleType: "none" }}>
          <TocItem
            depth={item.level ?? 1}
            item={item}
            itemNumber={index + 1}
            total={tocFiltered.length}
          />
        </li>
      ))}
    </ul>
  );
};
