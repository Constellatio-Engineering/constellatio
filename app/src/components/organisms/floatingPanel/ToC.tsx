import { TOCItemComponent } from "@/components/organisms/floatingPanel/tocItem";

import React, { type FunctionComponent } from "react";

import * as styles from "./FloatingPanel.styles";
import { type TOCItem } from "./generateTocHelper";

type ToC =
{
  readonly toc: TOCItem[];
};

export const ToC: FunctionComponent<ToC> = ({ toc: _toc }) =>
{
  const tocFiltered = _toc.filter((item) => item?.text);

  return (
    <ul css={styles.renderTOCList}>
      {tocFiltered.map((item, index) => (
        <li key={`toc-ul-listItem-${index}`} style={{ listStyleType: "none" }}>
          <TOCItemComponent
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
