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
import { type ArticleWithNextAndPreviousArticleId } from "@/utils/articles";
import { sortByTopic } from "@/utils/caisy";
import { type Nullable } from "@/utils/types";

import { parseAsString, useQueryState } from "next-usequerystate";
import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./OverviewPage.styles";
import ErrorPage from "../errorPage/ErrorPage";

export function extractNumeric(title: Nullable<string>): number | null
{
  if(!title)
  {
    return null;
  }

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

type Topic = {
  readonly id: string;
  readonly title: string;
};

const selectedTopics = ["49a18a66-183d-4b62-a12c-81e433d9f004", "38721058-c456-4f24-80ed-e407160399eb"];

const OverviewPageContent: FunctionComponent<OverviewPageContentProps> = ({
  allLegalAreas,
  allMainCategories,
  initialCategorySlug,
  items: _items,
  variant
}) =>
{
  const [selectedCategorySlug, setSelectedCategorySlug] = useQueryState("category", parseAsString.withDefault(initialCategorySlug));

  const filteredItems = _items.filter((item) =>
  {
    return item.topic?.some((t) => t?.id != null && selectedTopics.includes(t.id));
  });

  console.log(filteredItems);

  const uniqueTopics = Array
    .from(_items
      .flatMap((item) => (item.topic ?? [])
        .map(t =>
        {
          if(t?.id == null || t?.topicName == null)
          {
            return null;
          }

          return ({
            id: t.id,
            title: t.topicName,
          }) satisfies Topic;
        }))
      .filter(Boolean)
      .reduce((map, topic) => map.set(topic.id, topic), new Map<string, Topic>()) // Use a Map to ensure uniqueness by topic id
      .values()
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  const allItemsOfSelectedCategory = filteredItems.filter((item) => item.mainCategoryField?.[0]?.slug === selectedCategorySlug);
  const isCategoryEmpty = allItemsOfSelectedCategory.length <= 0;
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
              const allItemsOfLegalArea = filteredItems
                .filter(Boolean)
                .filter((item) => item.legalArea?.id === legalArea.id)
                .map((item) => ({
                  ...item,
                  isCompleted: casesProgress?.some((caseProgress) => caseProgress?.caseId === item.id && caseProgress.progressState === "completed"),
                }));

              const allItemsSorted = allItemsOfLegalArea.sort((a, b) =>
              {
                if(variant === "dictionary")
                {
                  return sortByTopic(a, b);
                }
                else
                {
                  const numA = extractNumeric(a.title);
                  const numB = extractNumeric(b.title);

                  if(numA !== null && numB !== null)
                  {
                    return numA - numB;
                  }

                  return a?.title?.localeCompare(b.title ?? "") ?? -1;
                }
              });

              const completed = allItemsOfLegalArea.filter((item) => item.isCompleted).length;

              return (
                legalArea.legalAreaName && (
                  <Fragment key={itemIndex}>
                    <ItemBlock
                      variant={variant}
                      blockHead={{
                        blockType: "itemsBlock",
                        categoryName: legalArea.legalAreaName,
                        completedCases: completed,
                        items: allItemsSorted.length,
                        variant,
                      }}
                      tableType="cases"
                      items={allItemsSorted}
                    />
                  </Fragment>
                )
              );
            })}
        </ContentWrapper>
      </div>
      {isCategoryEmpty && (
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
