/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { FiltersList } from "@/components/Icons/FiltersList";
import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import { ArticlesOverviewFiltersDrawer, CasesOverviewFiltersDrawer } from "@/components/pages/OverviewPage/overviewFiltersDrawer/OverviewFiltersDrawer";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import useCasesProgress from "@/hooks/useCasesProgress";
import { type CaseOverviewPageProps } from "@/pages/cases";
import { type GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import { type ArticlesOverviewFiltersStore, type CasesOverviewFiltersStore, } from "@/stores/overviewFilters.store";
import { type ArticleWithNextAndPreviousArticleId } from "@/utils/articles";
import { sortByTopic } from "@/utils/caisy";
import { type Nullable } from "@/utils/types";

import { parseAsString, useQueryState } from "next-usequerystate";
import React, { Fragment, type FunctionComponent, useDeferredValue, useMemo } from "react";

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

type ArticlesPageProps = GetArticlesOverviewPagePropsResult & {
  readonly filter: Pick<ArticlesOverviewFiltersStore, "filteredLegalAreas" | "filteredTags" | "filteredTopics" | "openDrawer">;
};

type CasesPageProps = CaseOverviewPageProps & {
  readonly filter: Pick<CasesOverviewFiltersStore, "filteredLegalAreas" | "filteredStatuses" | "filteredTags" | "filteredTopics" | "openDrawer">;
};

export type OverviewPageProps = (ArticlesPageProps | CasesPageProps) & {
  // This is a workaround.
  // The correct type would be Array<CaseOverviewPageProps["items"][number] | ArticleWithNextAndPreviousArticleId[],
  // but TypeScript is not smart enough to infer this with the array.filter method
  // eslint-disable-next-line react/no-unused-prop-types
  readonly items: Array<CaseOverviewPageProps["items"][number] | ArticleWithNextAndPreviousArticleId>;
};

type OverviewPageContentProps = OverviewPageProps & {
  readonly initialCategorySlug: string;
};

const OverviewPageContent: FunctionComponent<OverviewPageContentProps> = ({
  allLegalAreas,
  allMainCategories,
  filter,
  initialCategorySlug,
  items: _items,
  variant
}) =>
{
  const {
    filteredLegalAreas,
    filteredTags,
    filteredTopics,
    openDrawer
  } = filter;

  const [selectedCategorySlug, setSelectedCategorySlug] = useQueryState("category", parseAsString.withDefault(initialCategorySlug));
  const { casesProgress } = useCasesProgress();
  const allItemsOfSelectedCategory = useMemo(() =>
  {
    return _items.filter((item) => item.mainCategoryField?.[0]?.slug === selectedCategorySlug);
  }, [_items, selectedCategorySlug]);

  const isCategoryEmpty = allItemsOfSelectedCategory.length <= 0;

  const itemsFilteredByStatus = useMemo(() => allItemsOfSelectedCategory.filter((item) =>
  {
    if(variant === "dictionary")
    {
      return true;
    }

    const { filteredStatuses } = filter; 

    if(filteredStatuses.length === 0)
    {
      return true;
    }

    if(item.__typename === "Case")
    {
      return item.progressState && (
        (filteredStatuses.includes("completed") && item.progressState === "completed") ||
        (filteredStatuses.includes("in-progress") && ["solving-case", "completing-tests"].includes(item.progressState)) ||
        (filteredStatuses.includes("open") && item.progressState === "not-started")
      );
    }

    return true;
  }), [allItemsOfSelectedCategory, filter, variant]);

  const _filteredItems = useMemo(() => itemsFilteredByStatus.filter((item) =>
  {
    if(filteredLegalAreas.length === 0 && filteredTopics.length === 0 && filteredTags.length === 0)
    {
      return true;
    }

    const matchesLegalArea = item.legalArea?.id != null && filteredLegalAreas.includes(item.legalArea.id);
    const matchesTopic = item.topic?.some((t) => t?.id != null && filteredTopics.includes(t.id));
    const matchesTag = item.tags?.some((t) => t?.id != null && filteredTags.includes(t.id));

    return matchesLegalArea || matchesTopic || matchesTag;
  }), [filteredLegalAreas, filteredTopics, filteredTags, itemsFilteredByStatus]);

  const filteredItems = useDeferredValue(_filteredItems);

  return (
    <>
      {variant === "case" ? (
        <CasesOverviewFiltersDrawer
          variant={variant}
          items={_items}
        />
      ) : (
        <ArticlesOverviewFiltersDrawer
          variant={variant}
          items={_items}
        />
      )}
      <div css={styles.Page}>
        {allMainCategories && (
          <OverviewHeader
            variant={variant}
            selectedCategorySlug={selectedCategorySlug}
            setSelectedCategorySlug={setSelectedCategorySlug}
            height={480}
            contentWrapperStylesOverrides={styles.headerContent}
            categories={allMainCategories}
            title={variant === "case" ? "Fälle" : "Lexikon"}
          />
        )}
        <div css={styles.ListWrapper}>
          <ContentWrapper>
            <div css={styles.filtersWrapper}>
              <div css={styles.filtersButtonWrapper}>
                <Button<"button">
                  styleType={"secondarySimple"}
                  onClick={openDrawer}
                  leftIcon={<FiltersList/>}>
                  Filter
                </Button>
              </div>
            </div>
            {allLegalAreas
              .sort((a, b) =>
              {
                if(a.sorting === null)
                {
                  return 1;
                }
                if(b.sorting === null)
                {
                  return -1;
                }
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
    </>
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
