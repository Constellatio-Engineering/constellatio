/* eslint-disable max-lines,@typescript-eslint/no-use-before-define */
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import {
  type ArticlesOverviewFiltersStore,
  type CasesOverviewFiltersStore,
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

type FilterOption = {
  readonly id: string;
  readonly title: string;
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

type OverviewFiltersDrawerContentProps = (CasesOverviewFiltersDrawerProps & {
  readonly filtersStore: CasesOverviewFiltersStore;
}) | (ArticlesOverviewFiltersDrawerProps & {
  readonly filtersStore: ArticlesOverviewFiltersStore;
});

const OverviewFiltersDrawerContent: FunctionComponent<OverviewFiltersDrawerContentProps> = ({ filtersStore, items, variant }) =>
{
  const {
    clearFilteredLegalAreas,
    clearFilteredTags,
    clearFilteredTopics,
    clearInvalidFilters,
    closeDrawer,
    filteredLegalAreas,
    filteredTags,
    filteredTopics,
    isDrawerOpened,
    toggleLegalArea,
    toggleTag,
    toggleTopic
  } = filtersStore;

  const uniqueLegalAreas = useMemo(() =>
  {
    const allLegalAreas = items
      .map(item => item.legalArea)
      .map(t => ({
        id: t?.id,
        title: t?.legalAreaName,
      }));

    return getUniqueFilterOptions(allLegalAreas);
  }, [items]);

  const uniqueTopics = useMemo(() =>
  {
    const allTopics = items.flatMap((item) => (item.topic ?? [])
      .map(t => ({
        id: t?.id,
        title: t?.topicName,
      })));

    return getUniqueFilterOptions(allTopics);
  }, [items]);

  const uniqueTags = useMemo(() =>
  {
    const allTags = items.flatMap((item) => (item.tags ?? [])
      .map(t => ({
        id: t?.id,
        title: t?.tagName,
      })));

    return getUniqueFilterOptions(allTags);
  }, [items]);

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
          variant="default"
          closeButtonAction={closeDrawer}
        />
      )}>
      {variant === "case" && (
        <FilterCategory
          items={statusesFilterOptions.map(({ id, label }) => ({
            id,
            isChecked: filtersStore.filteredStatuses.includes(id),
            label,
            toggle: () => filtersStore.toggleStatus(id)
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
          isChecked: filteredLegalAreas.includes(legalArea.id),
          label: legalArea.title,
          toggle: () => toggleLegalArea(legalArea.id)
        }))}
        title="Rechtsgebiet"
      />
      <FilterCategory
        search={{ searchesFor: "Themen" }}
        activeFiltersCount={filteredTopics.length}
        clearFilters={clearFilteredTopics}
        items={uniqueTopics.map(topic => ({
          id: topic.id,
          isChecked: filteredTopics.includes(topic.id),
          label: topic.title,
          toggle: () => toggleTopic(topic.id)
        }))}
        title="Thema"
      />
      <FilterCategory
        search={{ searchesFor: "Tags" }}
        activeFiltersCount={filteredTags.length}
        clearFilters={clearFilteredTags}
        items={uniqueTags.map(tag => ({
          id: tag.id,
          isChecked: filteredTags.includes(tag.id),
          label: tag.title,
          toggle: () => toggleTag(tag.id)
        }))}
        title="Tags"
      />
    </Drawer>
  );
};
