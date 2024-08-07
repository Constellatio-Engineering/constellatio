import { Svg } from "@/basic-components/SVG/Svg";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment, type IGenMainCategory } from "@/services/graphql/__generated/sdk";
import { type Nullable } from "@/utils/types";

import React, { type FunctionComponent } from "react";

import ItemBlock from "../caseBlock/ItemBlock";

interface FavoriteCasesListProps
{
  readonly bookmarkedCasesMainCategoriesUnique: IGenMainCategory[];
  readonly casesByMainCategory: (mainCategoryId: Nullable<string>) => IGenFullCaseFragment[] | IGenArticleOverviewFragment[];
}

const FavoriteCasesList: FunctionComponent<FavoriteCasesListProps> = ({ bookmarkedCasesMainCategoriesUnique, casesByMainCategory }) => 
{
  return bookmarkedCasesMainCategoriesUnique.map((mainCategoryBlock, blockIndex) =>
  {
    const items = casesByMainCategory(mainCategoryBlock.id);

    return (
      <React.Fragment key={blockIndex}>
        <ItemBlock
          variant="case"
          tableType="favorites"
          blockHead={{
            blockType: "favoriteItemsBlock",
            categoryName: mainCategoryBlock.mainCategory ?? "",
            completedCases: 999,
            icon: {
              alt: mainCategoryBlock.icon?.title ?? "",
              src: <Svg src={mainCategoryBlock.icon?.src}/>
            },
            items: items.length ?? 0,
            variant: "case"
          }}
          items={items}
        />
      </React.Fragment>
    );
  }
  );
};

export default FavoriteCasesList;
