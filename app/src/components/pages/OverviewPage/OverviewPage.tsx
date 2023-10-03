import { CivilLawIcon } from "@/components/Icons/CivilLawIcon";
import CaseBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";
import { type allSubCategories, type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import {
  type IGenMainCategory, type IGenArticleOverviewFragment, type IGenFullCaseFragment, type IGenSubCategoryFragment, type IGenLegalArea, type IGenCase, type IGenArticle 
} from "@/services/graphql/__generated/sdk";

import { useRouter } from "next/router";
import {
  type FunctionComponent,
  useEffect, Fragment,
  useState,
} from "react";

import * as styles from "./OverviewPage.styles";

interface IOverviewPageProps 
{
  readonly content: ICasesOverviewProps | IArticlesOverviewProps | undefined;
  readonly variant: "case" | "dictionary";
}

const OverviewPage: FunctionComponent<IOverviewPageProps> = ({ content, variant }) => 
{

  const [selectedCategory, setSelectedCategory] = useState<IGenMainCategory | null>(
    content?.allMainCategories?.[0] ?? null
  );

  const [filteredLegalAreas, setFilteredLegalAreas] = useState(content?.allLegalAreaRes);

  const allCasesOfLegalArea = (item: IGenLegalArea): Array<({
    _typename?: "Case" | undefined;
  } & IGenCase) | null | undefined> | undefined => 
  {
    if(content?.__typename === "case")
    {
      return content?.allCases.filter(x => (x.legalArea?.id === item?.id && x.mainCategoryField?.[0]?.id === selectedCategory?.id));
    }
    return undefined;
  };
  console.log({ content });

  const allArticlesOfLegalArea = (item: IGenLegalArea): Array<({
    _typename?: "Case" | undefined;
  } & IGenArticle) | null | undefined> | undefined => 
  {
    if(content?.__typename === "dictionary")
    {
      return content?.allArticles.filter(x => (x.legalArea?.id === item?.id && x.mainCategoryField?.[0]?.id === selectedCategory?.id));
    }
    return undefined;
  };

  const isCategoryEmpty = (): boolean => 
  {
    const isEmpty: boolean = content?.__typename === "case" ? 
      content?.allCases?.filter((x: IGenCase) => (x?.mainCategoryField?.[0]?.id === selectedCategory?.id))?.length <= 0 : 
      content?.allArticles?.filter((x: IGenArticle) => (x?.mainCategoryField?.[0]?.id === selectedCategory?.id))?.length <= 0;

    console.log({ isEmpty });
    return isEmpty;
  };

  return (
    <div css={styles.Page}>
      {content?.allMainCategories && (
        <OverviewHeader
          variant={variant}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={content?.allMainCategories}
          title={variant === "case" ? "Cases" : "Dictionary"}
        />
      )}
      <div css={styles.ListWrapper}>

        {filteredLegalAreas?.map((item: IGenLegalArea, itemIndex: number) => item?.legalAreaName && (
          <Fragment key={itemIndex}>
            <CaseBlock
              variant={variant}
              blockHead={{
                blockType: "itemsBlock", categoryName: item?.legalAreaName, completedCases: 0, items: variant === "case" ? allCasesOfLegalArea(item)?.length : allArticlesOfLegalArea(item)?.length, variant
              }}
              items={variant === "case" ? allCasesOfLegalArea(item) : allArticlesOfLegalArea(item)}
            />
          </Fragment>
        )
        )}

      </div>
      {isCategoryEmpty() && (
        <EmptyStateCard
          button={<><CivilLawIcon/>Explore Civil law cases</>}
          title={`We're currently working hard to bring you ${variant === "case" ? "engaging cases to solve" : "interesting articles"}`}
          text="Please check back soon for the latest updates"
          variant="For-large-areas"
        />
      )}
    </div>
  );
};

export default OverviewPage;
