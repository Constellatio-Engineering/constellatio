/* eslint-disable @typescript-eslint/no-use-before-define */
import { Trash } from "@/components/Icons/Trash";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import { getFilterLabels, getFilterOptions, itemValuesToFilterOptions } from "@/components/pages/OverviewPage/overviewFiltersDrawer/OverviewFiltersDrawer.utils";
import { type CaseOverviewPageProps } from "@/pages/cases";
import { type ArticleOverviewPageProps } from "@/pages/dictionary";
import {
  type ArticlesOverviewFiltersStore,
  type CasesOverviewFiltersStore,
  type FilterOption,
  useArticlesOverviewFiltersStore,
  useCasesOverviewFiltersStore
} from "@/stores/overviewFilters.store";

import { findIntersection, getDistinctItemsByKey } from "@constellatio/utils/array";
import { getIsValidKey, mapToObject, objectKeys } from "@constellatio/utils/object";
import { Drawer } from "@mantine/core";
import { type FunctionComponent, useEffect, useMemo } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";

import * as styles from "./OverviewFiltersDrawer.styles";

export type CasesOverviewFiltersDrawerProps = Pick<CaseOverviewPageProps, "items" | "variant">;

export const CasesOverviewFiltersDrawer: FunctionComponent<CasesOverviewFiltersDrawerProps> = (props) =>
{
  const casesOverviewFiltersStore = useStoreWithEqualityFn(useCasesOverviewFiltersStore);

  return (
    <OverviewFiltersDrawerContent
      {...props}
      filtersStore={casesOverviewFiltersStore}
    />
  );
};

export type ArticlesOverviewFiltersDrawerProps = Pick<ArticleOverviewPageProps, "items" | "variant">;

export const ArticlesOverviewFiltersDrawer: FunctionComponent<ArticlesOverviewFiltersDrawerProps> = (props) =>
{
  const articlesOverviewFiltersStore = useStoreWithEqualityFn(useArticlesOverviewFiltersStore);

  return (
    <OverviewFiltersDrawerContent
      {...props}
      filtersStore={articlesOverviewFiltersStore}
    />
  );
};

export type OverviewFiltersDrawerContentProps = (CasesOverviewFiltersDrawerProps & {
  readonly filtersStore: CasesOverviewFiltersStore;
}) | (ArticlesOverviewFiltersDrawerProps & {
  readonly filtersStore: ArticlesOverviewFiltersStore;
});

const OverviewFiltersDrawerContent: FunctionComponent<OverviewFiltersDrawerContentProps> = ({ filtersStore, items, variant }) =>
{
  const {
    clearAllFilters,
    clearInvalidFilters,
    closeDrawer,
    filters: filtersMap,
    getTotalFiltersCount,
    isDrawerOpened,
  } = filtersStore;

  const filtersObject = useMemo(() => mapToObject(filtersMap), [filtersMap]);
  const filterKeys = objectKeys(filtersObject);
  const totalFiltersCount = getTotalFiltersCount();

  const availableFilterOptions: { [K in keyof typeof filtersObject]-?: FilterOption[] } = useMemo(() =>
  {
    const allLegalAreas = getFilterOptions(filtersObject, "legalArea", items);
    const intersectionLegalAreas = findIntersection(allLegalAreas, "id");
    const distinctLegalAreas = getDistinctItemsByKey(intersectionLegalAreas, "id");
    const legalAreasFilterOptions = itemValuesToFilterOptions(distinctLegalAreas);

    const allTags = getFilterOptions(filtersObject, "tags", items);
    const intersectionTags = findIntersection(allTags, "id");
    const distinctTags = getDistinctItemsByKey(intersectionTags, "id");
    const tagsFilterOptions = itemValuesToFilterOptions(distinctTags);

    const allTopics = getFilterOptions(filtersObject, "topic", items);
    const intersectionTopics = findIntersection(allTopics, "id");
    const distinctTopics = getDistinctItemsByKey(intersectionTopics, "id");
    const topicsFilterOptions = itemValuesToFilterOptions(distinctTopics);

    let progressStateFilterOptions: FilterOption[] = [];
    let wasSeenFilterOptions: FilterOption[] = [];

    if(variant === "case")
    {
      const allProgressStates = getFilterOptions(filtersObject, "progressStateFilterable", items);
      const intersectionProgressStates = findIntersection(allProgressStates, "value");
      progressStateFilterOptions = getDistinctItemsByKey(intersectionProgressStates, "value");
    }

    if(variant === "dictionary")
    {
      const allWasSeenStatuses = getFilterOptions(filtersObject, "wasSeenFilterable", items);
      const intersectionWasSeenStatuses = findIntersection(allWasSeenStatuses, "value");
      wasSeenFilterOptions = getDistinctItemsByKey(intersectionWasSeenStatuses, "value");
    }

    return ({
      legalArea: legalAreasFilterOptions,
      progressStateFilterable: progressStateFilterOptions,
      tags: tagsFilterOptions,
      topic: topicsFilterOptions,
      wasSeenFilterable: wasSeenFilterOptions
    });
  }, [filtersObject, items, variant]);

  // when the filter options change, we need to clear the filters that are not valid anymore
  useEffect(() =>
  {
    clearInvalidFilters(availableFilterOptions);
  }, [clearInvalidFilters, availableFilterOptions]);

  return (
    <Drawer
      lockScroll={false}
      opened={isDrawerOpened}
      onClose={closeDrawer}
      withCloseButton={false}
      position="right"
      keepMounted={true}
      size="550px"
      styles={styles.drawerStyles()}
      title={(
        <SlidingPanelTitle
          title="Filter"
          number={totalFiltersCount}
          variant="rich"
          closeButtonAction={closeDrawer}
          actionButton={{
            disabled: totalFiltersCount === 0,
            icon: <Trash/>,
            onClick: clearAllFilters,
            title: "Alle zurücksetzen"
          }}
        />
      )}>
      {filterKeys.map(filterKey =>
      {
        if(!getIsValidKey(filtersObject, filterKey))
        {
          return null;
        }

        const filter = filtersObject[filterKey];
        const { searchesFor, title } = getFilterLabels(filterKey);

        return (
          <FilterCategory
            key={filterKey}
            items={availableFilterOptions[filterKey].map(filterOption => ({
              ...filterOption,
              isChecked: filter.filterOptions.some(s => s.value === filterOption.value) ?? false,
              toggle: () => filter.toggleFilter(filterOption),
            }))}
            clearFilters={() => filter.clearFilters()}
            activeFiltersCount={filter.filterOptions.length}
            title={title}
            searchesFor={searchesFor}
          />
        );
      })}
    </Drawer>
  );
};
