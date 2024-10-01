import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import { ArticlesPageProps, CasesPageProps, extractNumeric, type LegalAreaWithItems } from "@/components/pages/OverviewPage/OverviewPage";
import { sortByTopic } from "@/utils/caisy";

import React, { type FunctionComponent, useMemo } from "react";

import * as styles from "./LegalAreaBlock.styles";

type Props = LegalAreaWithItems & {
  readonly variant: "case" | "dictionary";
};

export const LegalAreaBlock: FunctionComponent<Props> = ({ items, legalArea, variant }) =>
{
  const itemsSorted = useMemo(() => items.sort((a, b) =>
  {
    if(variant === "dictionary")
    {
      return sortByTopic(a, b);
    }
    else
    {
      const numA = extractNumeric(a.title);
      const numB = extractNumeric(b.title);

      if(numA !== null && numB !== null)
      {
        return numA - numB;
      }

      return a?.title?.localeCompare(b.title ?? "") ?? -1;
    }
  }), [items, variant]);

  const completedItemsCount = useMemo(
    () => itemsSorted.filter((item) => item.__typename === "Case" && item.progressStateFilterable.value === "completed").length,
    [itemsSorted]
  );

  if(!legalArea.legalAreaName)
  {
    console.error("legalArea.legalAreaName is null for legal area: ", legalArea);
    return null;
  }

  return (
    <ItemBlock
      variant={variant}
      blockHead={{
        blockType: "itemsBlock",
        categoryName: legalArea.legalAreaName,
        completedCases: completedItemsCount,
        items: itemsSorted.length,
        variant,
      }}
      tableType="cases"
      items={itemsSorted}
    />
  );
};
