/* eslint-disable max-lines,@typescript-eslint/no-use-before-define */
import { Trash } from "@/components/Icons/Trash";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import { getFilterOptions, sortFilterOptions } from "@/components/pages/OverviewPage/overviewFiltersDrawer/OverviewFiltersDrawer.utils";
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import { type ArticlesOverviewFiltersStore, type CasesOverviewFiltersStore, useArticlesOverviewFiltersStore, useCasesOverviewFiltersStore } from "@/stores/overviewFilters.store";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent, useMemo } from "react";
import { useStore } from "zustand";

import * as styles from "./OverviewFiltersDrawer.styles";

export type CasesOverviewFiltersDrawerProps = Pick<CaseOverviewPageProps, "items" | "variant">;

export const CasesOverviewFiltersDrawer: FunctionComponent<CasesOverviewFiltersDrawerProps> = (props) =>
{
  const casesOverviewFiltersStore = useStore(useCasesOverviewFiltersStore);

  return (
    <OverviewFiltersDrawerContent {...props} filtersStore={casesOverviewFiltersStore}/>
  );
};

export type ArticlesOverviewFiltersDrawerProps = Pick<GetArticlesOverviewPagePropsResult, "items" | "variant">;

export const ArticlesOverviewFiltersDrawer: FunctionComponent<ArticlesOverviewFiltersDrawerProps> = (props) =>
{
  const articlesOverviewFiltersStore = useStore(useArticlesOverviewFiltersStore);

  return (
    <OverviewFiltersDrawerContent {...props} filtersStore={articlesOverviewFiltersStore}/>
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
    closeDrawer,
    filters,
    getTotalFiltersCount,
    isDrawerOpened,
    toggleFilter,
  } = filtersStore;

  // TODO
  const clearInvalidFilters = () =>
  {
    console.log("clearInvalidFilters");
  };

  const totalFiltersCount = getTotalFiltersCount();

  const test = getFilterOptions(filters, "legalArea", items);

  console.log("test", test);

  const { uniqueLegalAreas, uniqueTags, uniqueTopics } = useMemo(() => ({
    // uniqueLegalAreas: getUniqueFilterOptions(items, filters, "legalArea").sort(sortFilterOptions),
    // uniqueTags: getUniqueFilterOptions(items, filters, "tags").sort(sortFilterOptions),
    // uniqueTopics: getUniqueFilterOptions(items, filters, "topic").sort(sortFilterOptions)
    uniqueLegalAreas: [],
    uniqueTags: [],
    uniqueTopics: [],
  }), [items, filters]);

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
        items={uniqueLegalAreas.map(legalArea => ({
          id: legalArea.id,
          isChecked: filters.legalArea.some(l => l.value === legalArea.id),
          label: legalArea.title,
          toggle: () => toggleFilter("legalArea", legalArea)
        }))}
        title="Rechtsgebiet"
      />
      <FilterCategory
        search={{ searchesFor: "Themen" }}
        activeFiltersCount={filters.topic.length}
        clearFilters={() => clearFilters("topic")}
        items={uniqueTopics.map(topic => ({
          id: topic.id,
          isChecked: filters.topic.some(t => t.value === topic.id),
          label: topic.title,
          toggle: () => toggleFilter("topic", topic)
        }))}
        title="Thema"
      />
      <FilterCategory
        search={{ searchesFor: "Tags" }}
        activeFiltersCount={filters.tags.length}
        clearFilters={() => clearFilters("tags")}
        items={uniqueTags.map(tag => ({
          id: tag.id,
          isChecked: filters.tags.some(t => t.value === tag.id),
          label: tag.title,
          toggle: () => toggleFilter("tags", tag)
        }))}
        title="Tags"
      />
    </Drawer>
  );
};
