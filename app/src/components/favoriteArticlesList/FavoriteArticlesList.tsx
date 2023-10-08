import { Svg } from "@/basic-components/SVG/Svg";
import { type IGenMainCategory, type IGenArticle } from "@/services/graphql/__generated/sdk";
import { type Nullable } from "@/utils/types";

import { Container } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import ItemBlock from "../organisms/caseBlock/ItemBlock";

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
  return (
    <Container maw={1440}>
      {bookmarkedArticlesMainCategoriesUnique.map((mainCategoryBlock, blockIndex) => 
      {
        const items = ArticlesByMainCategory(mainCategoryBlock.id);

        return (
          <React.Fragment key={blockIndex}>
            <ItemBlock
              variant="dictionary"
              tableType="favorites"
              blockHead={{
                blockType: "facouritItemsBlock",
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
      })}
    </Container>
  );
};

export default FavoriteArticlesList;
