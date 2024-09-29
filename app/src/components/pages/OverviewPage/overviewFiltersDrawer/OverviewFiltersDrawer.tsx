/* eslint-disable max-lines,@typescript-eslint/no-use-before-define */
import { Trash } from "@/components/Icons/Trash";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import { getFilterOptions, itemValuesToFilterOptions, sortFilterOptions } from "@/components/pages/OverviewPage/overviewFiltersDrawer/OverviewFiltersDrawer.utils";
import { type CaseOverviewPageItems, type CaseOverviewPageProps } from "@/pages/cases";
import type { GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import { type IGenLegalArea, type IGenTags, type IGenTopic } from "@/services/graphql/__generated/sdk";
import {
  type ArticlesOverviewFiltersStore,
  type CasesOverviewFiltersStore, type FilterableCaseAttributes,
  type FilterOption, statusesFilterOptions,
  useArticlesOverviewFiltersStore,
  useCasesOverviewFiltersStore
} from "@/stores/overviewFilters.store";
import { findIntersection } from "@/utils/array";
import { type NullableProperties } from "@/utils/types";
import { getDistinctItemsById } from "@/utils/utils";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent, useMemo } from "react";
import { infer } from "zod";
import { useStore } from "zustand";

import * as styles from "./OverviewFiltersDrawer.styles";

export type CasesOverviewFiltersDrawerProps = Pick<CaseOverviewPageProps, "items" | "variant">;

export const CasesOverviewFiltersDrawer: FunctionComponent<CasesOverviewFiltersDrawerProps> = (props) =>
{
  const casesOverviewFiltersStore = useStore(useCasesOverviewFiltersStore);

  return (
    <OverviewFiltersDrawerContent
      {...props}
      filtersStore={casesOverviewFiltersStore}
    />
  );
};

export type ArticlesOverviewFiltersDrawerProps = Pick<GetArticlesOverviewPagePropsResult, "items" | "variant">;

export const ArticlesOverviewFiltersDrawer: FunctionComponent<ArticlesOverviewFiltersDrawerProps> = (props) =>
{
  const articlesOverviewFiltersStore = useStore(useArticlesOverviewFiltersStore);

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
    clearFilters,
    clearInvalidFilters, 
    closeDrawer,
    filters,
    getTotalFiltersCount,
    isDrawerOpened,
    toggleFilter,
  } = filtersStore;

  const totalFiltersCount = getTotalFiltersCount();

  const { legalAreasFilterOptions, tagsFilterOptions, topicsFilterOptions } = useMemo(() =>
  {
    const allLegalAreas = getFilterOptions(filters, "legalArea", items);
    const intersectionLegalAreas = findIntersection(allLegalAreas, "id");
    const distinctLegalAreas = getDistinctItemsById(intersectionLegalAreas);
    const legalAreasFilterOptions = itemValuesToFilterOptions(distinctLegalAreas);

    const allTags = getFilterOptions(filters, "tags", items);
    const intersectionTags = findIntersection(allTags, "id");
    const distinctTags = getDistinctItemsById(intersectionTags);
    const tagsFilterOptions = itemValuesToFilterOptions(distinctTags);

    const allTopics = getFilterOptions(filters, "topic", items);
    const intersectionTopics = findIntersection(allTopics, "id");
    const distinctTopics = getDistinctItemsById(intersectionTopics);
    const topicsFilterOptions = itemValuesToFilterOptions(distinctTopics);

    return ({
      legalAreasFilterOptions,
      tagsFilterOptions,
      topicsFilterOptions,
    });
  }, [items, filters]);

  const progressStateFilterOptions = useMemo(() =>
  {
    if(variant !== "case")
    {
      return [];
    }

    const allProgressStates = getFilterOptions(filters, "progressState", items);
    const intersectionProgressStates = findIntersection(allProgressStates, "id");
    const distinctProgressStates = getDistinctItemsById(intersectionProgressStates);
    const progressStateFilterOptions = itemValuesToFilterOptions(distinctProgressStates);

    return progressStateFilterOptions;
  }, [items, filters]);

  /* useEffect(() =>
  {
    // when the filter options change, we need to clear the filters that are not valid anymore
    clearInvalidFilters({
      uniqueLegalAreas: uniqueLegalAreas.map(l => l.id),
      uniqueTags: uniqueTags.map(t => t.id),
      uniqueTopics: uniqueTopics.map(t => t.id),
    });
  }, [uniqueLegalAreas, uniqueTopics, uniqueTags, clearInvalidFilters]);*/

  return (
    <Drawer
      lockScroll={false}
      opened={isDrawerOpened}
      onClose={closeDrawer}
      withCloseButton={false}
      position="right"
      keepMounted={true}
      size="xl"
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
      {/* {variant === "case" && (
        <FilterCategory
          items={statusesFilterOptions.map((status) => ({
            id: status.id,
            isChecked: filtersStore.filteredStatuses.some(s => s.id === status.id),
            label: status.title,
            toggle: () => filtersStore.toggleStatus(status)
          }))}
          clearFilters={filtersStore.clearFilteredStatuses}
          activeFiltersCount={filtersStore.filteredStatuses.length}
          title="Status"
        />
      )}*/}
      <FilterCategory
        search={{ searchesFor: "Rechtsgebieten" }}
        activeFiltersCount={filters.legalArea.length}
        clearFilters={() => clearFilters("legalArea")}
        items={legalAreasFilterOptions.map(legalArea => ({
          ...legalArea,
          isChecked: filters.legalArea.some(l => l.value === legalArea.value),
          toggle: () => toggleFilter("legalArea", legalArea),
        }))}
        title="Rechtsgebiet"
      />
      <FilterCategory
        search={{ searchesFor: "Themen" }}
        activeFiltersCount={filters.topic.length}
        clearFilters={() => clearFilters("topic")}
        items={topicsFilterOptions.map(topic => ({
          ...topic,
          isChecked: filters.topic.some(t => t.value === topic.value),
          toggle: () => toggleFilter("topic", topic),
        }))}
        title="Thema"
      />
      <FilterCategory
        search={{ searchesFor: "Tags" }}
        activeFiltersCount={filters.tags.length}
        clearFilters={() => clearFilters("tags")}
        items={tagsFilterOptions.map(tag => ({
          ...tag,
          isChecked: filters.tags.some(t => t.value === tag.value),
          toggle: () => toggleFilter("tags", tag),
        }))}
        title="Tags"
      />
    </Drawer>
  );
};
