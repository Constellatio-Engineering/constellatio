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

const getUniqueFilterOptionsOld = <T extends NullableProperties<FilterOption>>(items: T[]): FilterOption[] =>
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

const getUniqueFilterOptions = (
  items: OverviewFiltersDrawerContentProps["items"],
  filters: CommonFiltersSlice["filters"],
  currentFilterKey: keyof AllCases[number]
) =>
{
  const filteredSets: Array<Set<{

  }>> = [];

  for(const filter of filters)
  {
    if(filter.key === currentFilterKey)
    {
      continue;
    }
    
    const filteredValues = items.map(item => 
    {
      const values = item[filter.key as keyof typeof item];

      if(values == null)
      {
        return null;
      }

      if(Array.isArray(values)) 
      {
        if(values.length === 0) 
        {
          return null;
        } 
        if(values?.some((t) => t?.id != null && filter.filteredOptions.some(filterOption => filterOption.id === t.id))) 
        {
          return values;
        }
      }
      if(typeof values === "object" && "id" in values && values?.id != null && filter.filteredOptions.some(filterOption => filterOption.id === values?.id)) 
      {
        return values;
      }
      return null;
    }).filter(Boolean);

    if(filteredValues.length === 0) 
    {
      continue;
    }

    if(Array.isArray(filteredValues[0])) 
    {
      filteredSets.push(new Set(filteredValues.flatMap(item => 
      {
        if(item == null)
        {
          return null;
        }
        return item;
      }).filter(Boolean)));
    }
    else 
    {
      filteredSets.push(new Set(filteredValues));
    }
  }

  if(filteredSets.length === 0) 
  {
    return Array.from(new Set(items.map(item => item[currentFilterKey as keyof typeof item]).filter(Boolean)));
  }

  let finalSet = filteredSets[0]!;

  for(let i = 1; i < filteredSets.length; i++) 
  {
    finalSet = finalSet.intersection(filteredSets[i]!);
  }

  return Array.from(finalSet);
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
    clearFilters,
    clearInvalidFilters,
    closeDrawer,
    filters,
    getTotalFiltersCount,
    isDrawerOpened,
    toggleFilter,
  } = filtersStore;

  const totalFiltersCount = getTotalFiltersCount();

  const { uniqueLegalAreas, uniqueTags, uniqueTopics } = useMemo(() => ({
    uniqueLegalAreas: getUniqueFilterOptions(items, filters, "legalArea"),
    uniqueTags: getUniqueFilterOptions(items, filters, "tags"),
    uniqueTopics: getUniqueFilterOptions(items, filters, "topic")
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
          isChecked: filters.legalArea.some(l => l.id === legalArea.id),
          label: legalArea.title,
          toggle: () => toggleLegalArea(legalArea)
        }))}
        title="Rechtsgebiet"
      />
      <FilterCategory
        search={{ searchesFor: "Themen" }}
        activeFiltersCount={filters.topic.length}
        clearFilters={() => clearFilters("topic")}
        items={uniqueTopics.map(topic => ({
          id: topic.id,
          isChecked: filters.topic.some(t => t.id === topic.id),
          label: topic.title,
          toggle: () => toggleTopic(topic)
        }))}
        title="Thema"
      />
      <FilterCategory
        search={{ searchesFor: "Tags" }}
        activeFiltersCount={filters.tags.length}
        clearFilters={() => clearFilters("tags")}
        items={uniqueTags.map(tag => ({
          id: tag.id,
          isChecked: filters.tags.some(t => t.id === tag.id),
          label: tag.title,
          toggle: () => toggleTag(tag)
        }))}
        title="Tags"
      />
    </Drawer>
  );
};
