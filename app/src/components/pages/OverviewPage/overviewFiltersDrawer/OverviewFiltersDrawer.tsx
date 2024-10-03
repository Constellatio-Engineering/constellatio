/* eslint-disable max-lines,@typescript-eslint/no-use-before-define */
import { Trash } from "@/components/Icons/Trash";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import { getFilterOptions, itemValuesToFilterOptions } from "@/components/pages/OverviewPage/overviewFiltersDrawer/OverviewFiltersDrawer.utils";
import { type CaseOverviewPageProps } from "@/pages/cases";
import { type ArticleOverviewPageProps } from "@/pages/dictionary";
import { type ArticlesOverviewFiltersStore, type CasesOverviewFiltersStore, useArticlesOverviewFiltersStore, useCasesOverviewFiltersStore } from "@/stores/overviewFilters.store";
import { findIntersection } from "@/utils/array";
import { mapToObject } from "@/utils/object";
import { getDistinctItemsByKey } from "@/utils/utils";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent, useEffect, useMemo } from "react";
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

export type ArticlesOverviewFiltersDrawerProps = Pick<ArticleOverviewPageProps, "items" | "variant">;

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
    const filtersObject = mapToObject(filters);

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

    const filtersObject = mapToObject(filters);
    const allProgressStates = getFilterOptions(filtersObject, "progressStateFilterable", items);
    const intersectionProgressStates = findIntersection(allProgressStates, "value");
    const distinctProgressStates = getDistinctItemsByKey(intersectionProgressStates, "value");

    return distinctProgressStates;
  }, [filters, items, variant]);

  const seenStatusFilterOptions = useMemo(() =>
  {
    if(variant !== "dictionary")
    {
      return [];
    }

    const filtersObject = mapToObject(filters);
    const allSeenStatuses = getFilterOptions(filtersObject, "wasSeenFilterable", items);
    const intersectionSeenStatuses = findIntersection(allSeenStatuses, "value");
    const distinctSeenStatuses = getDistinctItemsByKey(intersectionSeenStatuses, "value");

    return distinctSeenStatuses;
  }, [filters, items, variant]);

  useEffect(() =>
  {
    // when the filter options change, we need to clear the filters that are not valid anymore
    clearInvalidFilters({
      legalArea: legalAreasFilterOptions,
      progressStateFilterable: progressStateFilterOptions,
      tags: tagsFilterOptions,
      topic: topicsFilterOptions,
      wasSeenFilterable: seenStatusFilterOptions,
    });
  }, [clearInvalidFilters, legalAreasFilterOptions, progressStateFilterOptions, tagsFilterOptions, topicsFilterOptions, seenStatusFilterOptions]);

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
      {variant === "case" && (
        <FilterCategory
          items={progressStateFilterOptions.map((progressState) => ({
            ...progressState,
            isChecked: filtersStore.filters.get("progressStateFilterable")?.filterOptions.some(s => s.value === progressState.value) ?? false,
            toggle: () => filtersStore.toggleFilter("progressStateFilterable", progressState),
          }))}
          clearFilters={() => filtersStore.clearFilters("progressStateFilterable")}
          activeFiltersCount={filtersStore.filters.get("progressStateFilterable")?.filterOptions.length ?? 0}
          title="Bearbeitungsstatus"
        />
      )}
      {variant === "dictionary" && (
        <FilterCategory
          clearFilters={() => filtersStore.clearFilters("wasSeenFilterable")}
          activeFiltersCount={filtersStore.filters.get("wasSeenFilterable")?.filterOptions.length ?? 0}
          items={seenStatusFilterOptions.map(wasSeenFilterOption => ({
            ...wasSeenFilterOption,
            isChecked: filtersStore.filters.get("wasSeenFilterable")?.filterOptions.some(s => s.value === wasSeenFilterOption.value) ?? false,
            toggle: () => filtersStore.toggleFilter("wasSeenFilterable", wasSeenFilterOption),
          }))}
          title="Bearbeitungsstatus"
        />
      )}
      <FilterCategory
        search={{ searchesFor: "Rechtsgebieten" }}
        activeFiltersCount={filters.get("legalArea")?.filterOptions.length ?? 0}
        clearFilters={() => clearFilters("legalArea")}
        items={legalAreasFilterOptions.map(legalArea => ({
          ...legalArea,
          isChecked: filters.get("legalArea")?.filterOptions.some(l => l.value === legalArea.value) ?? false,
          toggle: () => toggleFilter("legalArea", legalArea),
        }))}
        title="Rechtsgebiet"
      />
      <FilterCategory
        search={{ searchesFor: "Themen" }}
        activeFiltersCount={filters.get("topic")?.filterOptions.length ?? 0}
        clearFilters={() => clearFilters("topic")}
        items={topicsFilterOptions.map(topic => ({
          ...topic,
          isChecked: filters.get("topic")?.filterOptions.some(t => t.value === topic.value) ?? false,
          toggle: () => toggleFilter("topic", topic),
        }))}
        title="Thema"
      />
      <FilterCategory
        search={{ searchesFor: "Tags" }}
        activeFiltersCount={filters.get("tags")?.filterOptions.length ?? 0}
        clearFilters={() => clearFilters("tags")}
        items={tagsFilterOptions.map(tag => ({
          ...tag,
          isChecked: filters.get("tags")?.filterOptions.some(t => t.value === tag.value) ?? false,
          toggle: () => toggleFilter("tags", tag),
        }))}
        title="Tags"
      />
    </Drawer>
  );
};
