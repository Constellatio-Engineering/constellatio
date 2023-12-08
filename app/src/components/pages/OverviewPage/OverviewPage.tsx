/* eslint-disable max-lines */
import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import useAllCasesWithProgress from "@/hooks/useAllCasesWithProgress";
import { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";
import { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import {
  type IGenLegalArea,
  type IGenArticle,
  type IGenCaseOverviewFragment,
} from "@/services/graphql/__generated/sdk";

import { parseAsString, useQueryState } from "next-usequerystate";
import {
  type FunctionComponent, Fragment
} from "react";
import React from "react";

import * as styles from "./OverviewPage.styles";
import ErrorPage from "../errorPage/ErrorPage";

export function extractNumeric(title: string): number | null
{
  const match = title.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

type CasesOverviewPageProps = {
  content: ICasesOverviewProps;
  variant: "case";
};

type ArticlesOverviewPageProps = {
  content: IArticlesOverviewProps;
  variant: "dictionary";
};

type OverviewPageProps = CasesOverviewPageProps | ArticlesOverviewPageProps;
type OverviewPageContentProps = OverviewPageProps & {
  readonly initialCategorySlug: string;
};

const OverviewPageContent: FunctionComponent<OverviewPageContentProps> = ({ content, initialCategorySlug, variant }) =>
{
  const [selectedCategorySlug, setSelectedCategorySlug] = useQueryState("category", parseAsString.withDefault(initialCategorySlug));

  const filteredLegalAreas = (content.allLegalAreaRes.allLegalArea?.edges
    ?.map((legalArea) => legalArea?.node)
    .filter((legalArea) => Boolean(legalArea)) || []) as IGenLegalArea[];

  const getAllCasesOfLegalArea = (item: IGenLegalArea): IGenCaseOverviewFragment[] =>
  {
    if(content?.__typename !== "case")
    {
      return [];
    }
    return content?.allCases.filter((x) =>
      x.legalArea?.id === item?.id && x.mainCategoryField?.[0]?.slug === selectedCategorySlug
    );
  };

  const getAllArticlesOfLegalArea = (item: IGenLegalArea): IGenArticle[] =>
  {
    if(content?.__typename !== "dictionary")
    {
      return [];
    }
    return content?.allArticles.filter((x) => x.legalArea?.id === item?.id && x.mainCategoryField?.[0]?.slug === selectedCategorySlug);
  };

  const getIsCategoryEmpty = (): boolean =>
  {
    return content?.__typename === "case"
      ? content?.allCases?.filter((x) => x?.mainCategoryField?.[0]?.slug === selectedCategorySlug)?.length <= 0
      : content?.allArticles?.filter((x) => x?.mainCategoryField?.[0]?.slug === selectedCategorySlug)?.length <= 0;
  };
  const { casesWithProgress } = useAllCasesWithProgress();
  const completeCases = casesWithProgress.filter(x => x?.progress === "completed");
  return (
    <div css={styles.Page}>
      {content?.allMainCategories && (
        <OverviewHeader
          height={400}
          variant={variant}
          selectedCategorySlug={selectedCategorySlug}
          setSelectedCategorySlug={setSelectedCategorySlug}
          categories={content?.allMainCategories}
          title={variant === "case" ? "Fälle" : "Lexikon"}
        />
      )}
      <div css={styles.ListWrapper}>
        {filteredLegalAreas
          .sort((a, b) =>
          {
            if(a.sorting === null) { return 1; }
            if(b.sorting === null) { return -1; }
            return a.sorting! - b.sorting!;
          })
          .map((item, itemIndex) =>
          {
            const items = variant === "case"
              ? getAllCasesOfLegalArea(item)?.sort((a, b) =>
              {
                const numA = extractNumeric(a.title ?? "");
                const numB = extractNumeric(b.title ?? "");

                if(numA !== null && numB !== null)
                {
                  return numA - numB;
                }
                return a?.title?.localeCompare(b.title ?? "") ?? -1;
              })
              : getAllArticlesOfLegalArea(item)?.sort((a, b) =>
              {
                const sortingA = a?.topic?.[0]?.sorting;
                const sortingB = b?.topic?.[0]?.sorting;
                if(sortingA === null || sortingA === undefined)
                {
                  return 1;
                }
                if(sortingB === null || sortingB === undefined)
                {
                  return -1;
                }
                return sortingA - sortingB;
              }) || [];

            const completed = completeCases.filter(x => x?.legalArea?.id === item?.id)?.length;

            return (
              item.legalAreaName && (
                <Fragment key={itemIndex}>
                  <ItemBlock
                    variant={variant}
                    blockHead={{
                      blockType: "itemsBlock",
                      categoryName: item.legalAreaName,
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
  const { content } = props;
  const categories = content?.allMainCategories;

  if(!categories || categories.length === 0)
  {
    return <ErrorPage error="Categories not found"/>;
  }

  const initialCategorySlug = categories[0]!.slug;

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
