import { Svg } from "@/basic-components/SVG/Svg";

import { type IGenArticleOverviewFragment, type IGenFullCaseFragment, type IGenMainCategory } from "@constellatio/cms/generated-types";
import { type Nullable } from "@constellatio/utility-types";
import { Fragment, type FunctionComponent } from "react";

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
      <Fragment key={blockIndex}>
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
      </Fragment>
    );
  }
  );
};

export default FavoriteCasesList;
