import { Svg } from "@/basic-components/SVG/Svg";

import { type IGenArticle, type IGenMainCategory } from "@constellatio/cms/generated-types";
import { type Nullable } from "@constellatio/utility-types";
import React, { type FunctionComponent } from "react";

import ItemBlock from "../caseBlock/ItemBlock";

interface FavoriteArticlesListProps
{
  readonly ArticlesByMainCategory: (mainCategoryId: Nullable<string>) => IGenArticle[];
  readonly bookmarkedArticlesMainCategoriesUnique: IGenMainCategory[];
}

const FavoriteArticlesList: FunctionComponent<FavoriteArticlesListProps> = ({
  ArticlesByMainCategory,
  bookmarkedArticlesMainCategoriesUnique
}) => 
{
  return bookmarkedArticlesMainCategoriesUnique.map((mainCategoryBlock, blockIndex) =>
  {
    const items = ArticlesByMainCategory(mainCategoryBlock.id);

    return (
      <React.Fragment key={blockIndex}>
        <ItemBlock
          variant="dictionary"
          tableType="favorites"
          blockHead={{
            blockType: "favoriteItemsBlock",
            categoryName: mainCategoryBlock.mainCategory ?? "",
            completedCases: 0,
            icon: {
              alt: mainCategoryBlock.icon?.title ?? "",
              src: <Svg src={mainCategoryBlock.icon?.src}/>
            },
            items: items.length ?? 0,
            variant: "dictionary"
          }}
          items={items}
        />
      </React.Fragment>
    );
  });
};

export default FavoriteArticlesList;
