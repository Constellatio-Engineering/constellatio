import { Svg } from "@/basic-components/SVG/Svg";
import { type Nullable } from "@/utils/types";

import React, { type FunctionComponent } from "react";

import ItemBlock from "../caseBlock/ItemBlock";

import { type IGenArticle, type IGenMainCategory } from "@/services/graphql/__generated/sdk";

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
