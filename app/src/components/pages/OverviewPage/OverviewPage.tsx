/* eslint-disable max-lines */
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import useCasesProgress from "@/hooks/useCasesProgress";
import { type GetCasesOverviewPagePropsResult } from "@/pages/cases";
import { type GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import { type AllCases } from "@/services/content/getAllCases";
import { type IGenLegalArea, } from "@/services/graphql/__generated/sdk";
import { type ArticleWithNextAndPreviousArticleId, sortArticlesByTopic } from "@/utils/articles";

import { parseAsString, useQueryState } from "next-usequerystate";
import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./OverviewPage.styles";
import ErrorPage from "../errorPage/ErrorPage";

export function extractNumeric(title: string): number | null
{
  const match = title.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

type OverviewPageProps = (GetArticlesOverviewPagePropsResult | GetCasesOverviewPagePropsResult) & {
  // This is a workaround.
  // The correct type would be AllCases | ArticleWithNextAndPreviousArticleId[], as inferred by (GetArticlesOverviewPagePropsResult | GetCasesOverviewPagePropsResult),
  // but TypeScript is not smart enough to infer this with th array.filter method
  readonly items: Array<AllCases[number] | ArticleWithNextAndPreviousArticleId>;
};

type OverviewPageContentProps = OverviewPageProps & {
  readonly initialCategorySlug: string;
};

const OverviewPageContent: FunctionComponent<OverviewPageContentProps> = ({
  allLegalAreas,
  allMainCategories,
  initialCategorySlug,
  items,
  variant
}) =>
{
  const [selectedCategorySlug, setSelectedCategorySlug] = useQueryState("category", parseAsString.withDefault(initialCategorySlug));
  const allItemsOfSelectedCategory = items.filter((item) => item.mainCategoryField?.[0]?.slug === selectedCategorySlug);

  const getAllItemsOfLegalArea = (legalArea: IGenLegalArea) =>
  {
    return items.filter((item) => item.legalArea?.id === legalArea.id);
  };

  const getIsCategoryEmpty = (): boolean =>
  {
    return items.filter((item) => item.mainCategoryField?.[0]?.slug === selectedCategorySlug).length <= 0;
  };

  const { casesProgress } = useCasesProgress();

  return (
    <div css={styles.Page}>
      {allMainCategories && (
        <OverviewHeader
          variant={variant}
          selectedCategorySlug={selectedCategorySlug}
          setSelectedCategorySlug={setSelectedCategorySlug}
          categories={allMainCategories}
          title={variant === "case" ? "Fälle" : "Lexikon"}
        />
      )}
      <div css={styles.ListWrapper}>
        <ContentWrapper>
          {allLegalAreas
            .sort((a, b) =>
            {
              if(a.sorting === null) { return 1; }
              if(b.sorting === null) { return -1; }
              return a.sorting! - b.sorting!;
            })
            .map((legalArea, itemIndex) =>
            {
              const allItemsOfLegalArea = getAllItemsOfLegalArea(legalArea);

              let allItemsSorted: typeof allItemsOfLegalArea;

              if(variant === "case")
              {
                allItemsSorted = allItemsOfLegalArea.sort((a, b) =>
                {
                  const numA = extractNumeric(a.title ?? "");
                  const numB = extractNumeric(b.title ?? "");

                  if(numA !== null && numB !== null)
                  {
                    return numA - numB;
                  }
                  return a?.title?.localeCompare(b.title ?? "") ?? -1;
                });
              }
              else
              {
                allItemsSorted = allItemsOfLegalArea.sort(article => sortArticlesByTopic(article));
              }

              const completed = completeCases.filter(x => x?.legalArea?.id === legalArea?.id)?.length;

              return (
                legalArea.legalAreaName && (
                  <Fragment key={itemIndex}>
                    <ItemBlock
                      variant={variant}
                      blockHead={{
                        blockType: "itemsBlock",
                        categoryName: legalArea.legalAreaName,
                        completedCases: completed,
                        items: items.length,
                        variant,
                      }}
                      tableType="cases"
                      items={items}
                    />
                  </Fragment>
                )
              );
            })}
        </ContentWrapper>
      </div>
      {getIsCategoryEmpty() && (
        <EmptyStateCard
          title={`Das Angebot von Constellatio wird ständig erweitert. In Kürze findest du hier ${
            variant === "case"
              ? "interaktive Fälle"
              : "verlinkte Lexikon-Artikel mit eingängigen Visualisierungen"
          }`}
          text=""
          variant="For-large-areas"
        />
      )}
    </div>
  );
};

const OverviewPage: FunctionComponent<OverviewPageProps> = (props) =>
{
  const { allMainCategories } = props;

  if(!allMainCategories || allMainCategories.length === 0)
  {
    return <ErrorPage error="Categories not found"/>;
  }

  const initialCategorySlug = allMainCategories[0]!.slug;

  if(!initialCategorySlug)
  {
    return <ErrorPage error="Initial category has no slug"/>;
  }

  return (
    <UseQueryStateWrapper>
      <OverviewPageContent {...props} initialCategorySlug={initialCategorySlug}/>
    </UseQueryStateWrapper>
  );
};

export default OverviewPage;
