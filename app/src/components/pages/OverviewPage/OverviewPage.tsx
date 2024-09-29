/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { FiltersList } from "@/components/Icons/FiltersList";
import { Trash } from "@/components/Icons/Trash";
import FilterTag from "@/components/molecules/filterTag/FilterTag";
import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import {
  ArticlesOverviewFiltersDrawer,
  CasesOverviewFiltersDrawer,
  type OverviewFiltersDrawerContentProps
} from "@/components/pages/OverviewPage/overviewFiltersDrawer/OverviewFiltersDrawer";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import useCasesProgress from "@/hooks/useCasesProgress";
import { type CaseOverviewPageProps } from "@/pages/cases";
import { type GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import {
  type ArticlesOverviewFiltersStore,
  type CasesOverviewFiltersStore,
  type CommonFiltersSlice,
  type CommonOverviewFiltersStore,
  type FilterableArticleAttributes,
} from "@/stores/overviewFilters.store";
import { type ArticleWithNextAndPreviousArticleId } from "@/utils/articles";
import { sortByTopic } from "@/utils/caisy";
import { type Nullable } from "@/utils/types";
import { getIsObjectWithId, getIsPrimitive, objectKeys } from "@/utils/utils";

import { Title } from "@mantine/core";
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

type CommonFiltersStoreProps = Pick<CommonOverviewFiltersStore, "clearAllFilters" | "filters" | "openDrawer" | "toggleFilter"> & {
  readonly totalFiltersCount: number;
};

type ArticlesPageProps = GetArticlesOverviewPagePropsResult & {
  readonly filter: CommonFiltersStoreProps;
};

type CasesPageProps = CaseOverviewPageProps & {
  readonly filter: CommonFiltersStoreProps;
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

function getItemsMatchingTheFilters<T extends OverviewPageContentProps["items"][number]>(
  items: T[],
  filters: CommonOverviewFiltersStore["filters"],
): T[]
{
  return items.filter(item =>
  {
    const filterResults = objectKeys(filters).map(filterKey =>
    {
      const currentFilterOptions = filters[filterKey];
      const itemValueFromCurrentFilter = item[filterKey];

      if(currentFilterOptions?.length === 0)
      {
        return true;
      }

      if(Array.isArray(itemValueFromCurrentFilter))
      {
        return itemValueFromCurrentFilter.some((value) =>
        {
          if(value == null)
          {
            return false;
          }

          if(getIsObjectWithId(value))
          {
            return currentFilterOptions.some(filterOption => filterOption.value === value.id);
          }
          else if(getIsPrimitive(value))
          {
            return currentFilterOptions.some(filterOption => filterOption.value === value);
          }

          return false;
        });
      }
      else if(getIsObjectWithId(itemValueFromCurrentFilter))
      {
        if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter.id))
        {
          return true;
        }
      }
      else if(getIsPrimitive(itemValueFromCurrentFilter))
      {
        if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter))
        {
          return true;
        }
      }

      return false;
    });

    return filterResults.every(Boolean);
  });
}

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
    clearAllFilters,
    filters,
    openDrawer,
    toggleFilter,
    totalFiltersCount
  } = filter;

  const [selectedCategorySlug, setSelectedCategorySlug] = useQueryState("category", parseAsString.withDefault(initialCategorySlug));
  const { casesProgress } = useCasesProgress();
  const allItemsOfSelectedCategory = useMemo(() =>
  {
    return _items.filter((item) => item.mainCategoryField?.[0]?.slug === selectedCategorySlug);
  }, [_items, selectedCategorySlug]);

  const isCategoryEmpty = allItemsOfSelectedCategory.length <= 0;

  /* const itemsFilteredByStatus = useMemo(() => allItemsOfSelectedCategory.filter((item) =>
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
      const isFilteringCompletedCases = filteredStatuses.some(status => status.id === "completed");
      const isFilteringInProgressCases = filteredStatuses.some(status => status.id === "in-progress");
      const isFilteringOpenCases = filteredStatuses.some(status => status.id === "open");

      return item.progressState && (
        (isFilteringCompletedCases && item.progressState === "completed") ||
        (isFilteringInProgressCases && (item.progressState === "completing-tests" || item.progressState === "solving-case")) ||
        (isFilteringOpenCases && item.progressState === "not-started")
      );
    }

    return true;
  }), [allItemsOfSelectedCategory, filter, variant]);*/

  const itemsFilteredByStatus = useMemo(() => allItemsOfSelectedCategory.filter(() =>
  {
    return true;
  }), [allItemsOfSelectedCategory]);

  const _filteredItems = useMemo(() =>
  {
    return getItemsMatchingTheFilters(itemsFilteredByStatus, filters);
  }, [filters, itemsFilteredByStatus]);

  const filteredItems = useDeferredValue(_filteredItems);

  return (
    <>
      {variant === "case" ? (
        <CasesOverviewFiltersDrawer
          variant={variant}
          items={allItemsOfSelectedCategory as CasesPageProps["items"]}
        />
      ) : (
        <ArticlesOverviewFiltersDrawer
          variant={variant}
          items={allItemsOfSelectedCategory as ArticlesPageProps["items"]}
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
                  {totalFiltersCount > 0 && (
                    <span css={styles.filtersCount}>({totalFiltersCount})</span>
                  )}
                </Button>
              </div>
              <div css={styles.activeFiltersChips}>
                {/* {variant === "case" && (
                  <>
                    {filter.filteredStatuses.map((status) => (
                      <FilterTag
                        key={status.id}
                        onClick={() => filter.toggleStatus(status)}
                        title={status.title}
                      />
                    ))}
                  </>
                )}*/}
                {/* {filteredLegalAreas?.map((legalArea) => (
                  <FilterTag
                    key={legalArea.id}
                    onClick={() => toggleLegalArea(legalArea)}
                    title={legalArea.title}
                  />
                ))}
                {filteredTopics?.map((topic) => (
                  <FilterTag
                    key={topic.id}
                    onClick={() => toggleTopic(topic)}
                    title={topic.title}
                  />
                ))}
                {filteredTags?.map((tag) => (
                  <FilterTag
                    key={tag.id}
                    onClick={() => toggleTag(tag)}
                    title={tag.title}
                  />
                ))}*/}
              </div>
              <div css={styles.clearFiltersButtonWrapper}>
                <LinkButton
                  disabled={totalFiltersCount === 0}
                  title="Alle zurücksetzen"
                  icon={<Trash/>}
                  onClick={clearAllFilters}
                />
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
        <ContentWrapper>
          {totalFiltersCount > 0 && filteredItems.length === 0 && (
            <div css={styles.noResultsWrapper}>
              <Title order={3}>Keine Ergebnisse</Title>
              <BodyText styleType="body-01-regular">
                Für deine Filter wurden leider keine Ergebnisse gefunden.
                Bitte ändere deine Filter.
              </BodyText>
              <Button<"button"> styleType={"primary"} onClick={clearAllFilters}>
                Filter zurücksetzen
              </Button>
            </div>
          )}
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
        </ContentWrapper>
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
