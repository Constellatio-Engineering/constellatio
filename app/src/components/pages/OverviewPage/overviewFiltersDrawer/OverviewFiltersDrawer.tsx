/* eslint-disable max-lines,@typescript-eslint/no-use-before-define */
import { Trash } from "@/components/Icons/Trash";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import type { AllCases } from "@/services/content/getAllCases";
import {
  type ArticlesOverviewFiltersStore,
  type CasesOverviewFiltersStore, type CommonFiltersSlice, type FilterOption,
  statusesFilterOptions,
  useArticlesOverviewFiltersStore,
  useCasesOverviewFiltersStore
} from "@/stores/overviewFilters.store";
import { type NullableProperties } from "@/utils/types";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent, useEffect, useMemo } from "react";

import * as styles from "./OverviewFiltersDrawer.styles";

type CasesOverviewFiltersDrawerProps = Pick<CaseOverviewPageProps, "items" | "variant">;

export const CasesOverviewFiltersDrawer: FunctionComponent<CasesOverviewFiltersDrawerProps> = (props) =>
{
  const casesOverviewFiltersStore = useCasesOverviewFiltersStore();

  return (
    <OverviewFiltersDrawerContent {...props} filtersStore={casesOverviewFiltersStore}/>
  );
};

type ArticlesOverviewFiltersDrawerProps = Pick<GetArticlesOverviewPagePropsResult, "items" | "variant">;

export const ArticlesOverviewFiltersDrawer: FunctionComponent<ArticlesOverviewFiltersDrawerProps> = (props) =>
{
  const articlesOverviewFiltersStore = useArticlesOverviewFiltersStore();

  return (
    <OverviewFiltersDrawerContent {...props} filtersStore={articlesOverviewFiltersStore}/>
  );
};

const getUniqueFilterOptions = <T extends NullableProperties<FilterOption>>(items: T[]): FilterOption[] =>
{
  return Array
    .from(items
      .map(item =>
      {
        if(item?.id == null || item?.title == null)
        {
          return null;
        }

        return ({
          id: item.id,
          title: item.title,
        }) satisfies FilterOption;
      })
      .filter(Boolean)
      .reduce((map, item) => map.set(item.id, item), new Map<string, FilterOption>()) // Use a Map to ensure uniqueness by topic id
      .values()
    )
    .sort((a, b) =>
    {
      const aStartsWithParagraph = a.title.startsWith("§");
      const bStartsWithParagraph = b.title.startsWith("§");

      if(!aStartsWithParagraph && bStartsWithParagraph)
      {
        return -1;
      }

      if(aStartsWithParagraph && !bStartsWithParagraph)
      {
        return 1;
      }

      return a.title.localeCompare(b.title);
    });
};

const getUniqueFilterOptions2 = (
  items: OverviewFiltersDrawerContentProps["items"],
  filters: CommonFiltersSlice["filters"],
  currentFilterKey: keyof AllCases[number]
) =>
{
  return Array
    .from(items
      .map(item =>
      {
        if(item?.id == null || item?.title == null)
        {
          return null;
        }

        return ({
          id: item.id,
          title: item.title,
        }) satisfies FilterOption;
      })
      .filter(Boolean)
      .reduce((map, item) => map.set(item.id, item), new Map<string, FilterOption>()) // Use a Map to ensure uniqueness by topic id
      .values()
    )
    .sort((a, b) =>
    {
      const aStartsWithParagraph = a.title.startsWith("§");
      const bStartsWithParagraph = b.title.startsWith("§");

      if(!aStartsWithParagraph && bStartsWithParagraph)
      {
        return -1;
      }

      if(aStartsWithParagraph && !bStartsWithParagraph)
      {
        return 1;
      }

      return a.title.localeCompare(b.title);
    });
};

type OverviewFiltersDrawerContentProps = (CasesOverviewFiltersDrawerProps & {
  readonly filtersStore: CasesOverviewFiltersStore;
}) | (ArticlesOverviewFiltersDrawerProps & {
  readonly filtersStore: ArticlesOverviewFiltersStore;
});

const OverviewFiltersDrawerContent: FunctionComponent<OverviewFiltersDrawerContentProps> = ({ filtersStore, items, variant }) =>
{
  const {
    clearAllFilters,
    clearFilteredLegalAreas,
    clearFilteredTags,
    clearFilteredTopics,
    clearInvalidFilters,
    closeDrawer,
    filteredLegalAreas,
    filteredTags,
    filteredTopics,
    getTotalFiltersCount,
    isDrawerOpened,
    toggleLegalArea,
    toggleTag,
    toggleTopic
  } = filtersStore;

  const totalFiltersCount = getTotalFiltersCount();

  const uniqueLegalAreas = useMemo(() => getUniqueFilterOptions(items.map(item => item.legalArea)
    .map(t => ({
      id: t?.id,
      title: t?.legalAreaName,
    }))), [items]);

  const uniqueTopics = useMemo(() => getUniqueFilterOptions(items.flatMap((item) => (item.topic ?? [])
    .map(t => ({
      id: t?.id,
      title: t?.topicName,
    })))), [items]);

  const uniqueTags = useMemo(() => getUniqueFilterOptions(items.flatMap((item) => (item.tags ?? [])
    .map(t => ({
      id: t?.id,
      title: t?.tagName,
    })))), [items]);

  useEffect(() =>
  {
    // when the filter options change, we need to clear the filters that are not valid anymore
    clearInvalidFilters({
      uniqueLegalAreas: uniqueLegalAreas.map(l => l.id),
      uniqueTags: uniqueTags.map(t => t.id),
      uniqueTopics: uniqueTopics.map(t => t.id),
    });
  }, [uniqueLegalAreas, uniqueTopics, uniqueTags, clearInvalidFilters]);

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
      {variant === "case" && (
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
      )}
      <FilterCategory
        search={{ searchesFor: "Rechtsgebieten" }}
        activeFiltersCount={filteredLegalAreas.length}
        clearFilters={clearFilteredLegalAreas}
        items={uniqueLegalAreas.map(legalArea => ({
          id: legalArea.id,
          isChecked: filteredLegalAreas.some(l => l.id === legalArea.id),
          label: legalArea.title,
          toggle: () => toggleLegalArea(legalArea)
        }))}
        title="Rechtsgebiet"
      />
      <FilterCategory
        search={{ searchesFor: "Themen" }}
        activeFiltersCount={filteredTopics.length}
        clearFilters={clearFilteredTopics}
        items={uniqueTopics.map(topic => ({
          id: topic.id,
          isChecked: filteredTopics.some(t => t.id === topic.id),
          label: topic.title,
          toggle: () => toggleTopic(topic)
        }))}
        title="Thema"
      />
      <FilterCategory
        search={{ searchesFor: "Tags" }}
        activeFiltersCount={filteredTags.length}
        clearFilters={clearFilteredTags}
        items={uniqueTags.map(tag => ({
          id: tag.id,
          isChecked: filteredTags.some(t => t.id === tag.id),
          label: tag.title,
          toggle: () => toggleTag(tag)
        }))}
        title="Tags"
      />
    </Drawer>
  );
};
