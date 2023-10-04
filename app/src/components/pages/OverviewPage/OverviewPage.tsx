import { CivilLawIcon } from "@/components/Icons/CivilLawIcon";
import CaseBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";
import { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import {
  type IGenMainCategory, type IGenLegalArea, type IGenCase, type IGenArticle, type IGenCaseOverviewFragment, type IGenArticleOverviewFragment
} from "@/services/graphql/__generated/sdk";

import {
  type FunctionComponent,
  Fragment,
  useState,
} from "react";

import * as styles from "./OverviewPage.styles";

type CasesOverviewPageProps = {
  content: ICasesOverviewProps;
  variant: "case";
};

type ArticlesOverviewPageProps = {
  content: IArticlesOverviewProps;
  variant: "dictionary";
};

type OverviewPageProps = CasesOverviewPageProps | ArticlesOverviewPageProps;

const OverviewPage: FunctionComponent<OverviewPageProps> = ({ content, variant }) =>
{
  const [selectedCategory, setSelectedCategory] = useState<IGenMainCategory | undefined>(content.allMainCategories?.[0]);
  const filteredLegalAreas = (content.allLegalAreaRes.allLegalArea?.edges
    ?.map(legalArea => legalArea?.node)
    .filter(legalArea => Boolean(legalArea)) || []) as IGenLegalArea[];

  const getAllCasesOfLegalArea = (item: IGenLegalArea): IGenCaseOverviewFragment[] =>
  {
    if(content?.__typename !== "case")
    {
      return [];
    }
    return content?.allCases.filter(x => (x.legalArea?.id === item?.id && x.mainCategoryField?.[0]?.id === selectedCategory?.id));
  };

  const getAllArticlesOfLegalArea = (item: IGenLegalArea): IGenArticleOverviewFragment[] =>
  {
    if(content?.__typename !== "dictionary")
    {
      return [];
    }
    return content?.allArticles.filter(x => (x.legalArea?.id === item?.id && x.mainCategoryField?.[0]?.id === selectedCategory?.id));
  };

  const getIsCategoryEmpty = (): boolean =>
  {
    const isEmpty: boolean = content?.__typename === "case" ? 
      content?.allCases?.filter((x: IGenCase) => (x?.mainCategoryField?.[0]?.id === selectedCategory?.id))?.length <= 0 : 
      content?.allArticles?.filter((x: IGenArticle) => (x?.mainCategoryField?.[0]?.id === selectedCategory?.id))?.length <= 0;

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
        {filteredLegalAreas.map((item, itemIndex) =>
        {
          const items = variant === "case" ? getAllCasesOfLegalArea(item) : getAllArticlesOfLegalArea(item);

          return item.legalAreaName && (
            <Fragment key={itemIndex}>
              <CaseBlock
                variant={variant}
                blockHead={{
                  blockType: "itemsBlock",
                  categoryName: item.legalAreaName,
                  completedCases: 0,
                  items: items.length,
                  variant
                }}
                items={items}
              />
            </Fragment>
          );
        })}
      </div>
      {getIsCategoryEmpty() && (
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
