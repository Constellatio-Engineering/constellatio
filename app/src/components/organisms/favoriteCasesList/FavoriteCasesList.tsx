
import { Svg } from "@/basic-components/SVG/Svg";
import { type IGenArticleOverviewFragment, IGenCase, type IGenFullCaseFragment, type IGenMainCategory } from "@/services/graphql/__generated/sdk";

import { Container } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./FavoriteCasesList.styles";
import ItemBlock from "../caseBlock/ItemBlock";

interface FavoriteCasesListProps
{
  readonly bookmarkedCasesMainCategoriesUnique: IGenMainCategory[];
  readonly casesByMainCategory: (mainCategoryId: string) => Array<({ _typename?: "Case" | undefined } & IGenFullCaseFragment) | null | undefined> | IGenArticleOverviewFragment[] | undefined;
}

const FavoriteCasesList: FunctionComponent<FavoriteCasesListProps> = ({ bookmarkedCasesMainCategoriesUnique, casesByMainCategory }) => 
{
  return (
    <Container maw={1440}>
      {bookmarkedCasesMainCategoriesUnique.map((mainCategoryBlock: IGenMainCategory, blockIndex: number) => (
        <React.Fragment key={blockIndex}>
          <ItemBlock
            variant="case"
            blockHead={{
              blockType: "facouritItemsBlock", 
              categoryName: mainCategoryBlock?.mainCategory ?? "", 
              completedCases: 999, 
        
              icon: {
                alt: mainCategoryBlock?.icon?.title ?? "",
                src: <Svg src={mainCategoryBlock?.icon?.src}/>
              },
              items: casesByMainCategory(mainCategoryBlock?.id ?? "")?.length ?? 0,
              variant: "case"
            }}
            items={casesByMainCategory(mainCategoryBlock?.id ?? "")}
          />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default FavoriteCasesList;