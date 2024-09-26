/* eslint-disable max-lines,@typescript-eslint/no-use-before-define */
import { Trash } from "@/components/Icons/Trash";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { GetArticlesOverviewPagePropsResult } from "@/pages/dictionary";
import type { AllCases } from "@/services/content/getAllCases";
import { IGenLegalArea, IGenTags, IGenTopic } from "@/services/graphql/__generated/sdk";
import {
  type ArticlesOverviewFiltersStore,
  type CasesOverviewFiltersStore, type CommonFiltersSlice, type FilterableArticleAttributes, type FilterOption,
  statusesFilterOptions,
  useArticlesOverviewFiltersStore,
  useCasesOverviewFiltersStore
} from "@/stores/overviewFilters.store";
import { type NullableProperties, RemoveUndefined } from "@/utils/types";
import { objectKeys } from "@/utils/utils";

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
      .reduce((map, item) => map.set(item.id, item), new Map<string, FilterOption>()) // Use a Map to ensure uniqueness by id
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
  currentFilterKey: FilterableArticleAttributes
): FilterOption[] =>
{
  console.log("----------------------------- getUniqueFilterOptions -----------------------------");
  console.log(`getUniqueFilterOptions for '${currentFilterKey}'`);

  // type LegalArea = NonNullable<typeof items[number]["legalArea"]>;
  // type Topic = NonNullable<typeof items[number]["topic"]>[number];
  // type Tag = NonNullable<typeof items[number]["tags"]>[number];
  // const filteredSetsOld: Array<Set<LegalArea | Topic | Tag>> = [];
 
  const filteredSets: FilterOption[][] = [];

  for(const filterKey of objectKeys(filters))
  {
    if(filterKey === currentFilterKey)
    {
      // we filter out items by all filters except the current filter key, so if the current filter key is legalArea, we filter out by all filters but legalArea
      continue;
    }

    // these are for example all topics we currently filter by
    const currentFilterOptions = filters[filterKey];

    // filteredOptions is an array of either tags, topics or legalAreas, depending on the current filter key
    const filteredOptions: FilterOption[] = items
      .map(item =>
      {
        // get the values from the current filter key, for example: legalArea, tags or topics
        const itemValuesFromCurrentFilter = item[filterKey];

        // for example tags or topics are arrays (items can have multiple), so we check if the current item matches any of the filtered tags or topics
        if(Array.isArray(itemValuesFromCurrentFilter))
        {
          if(itemValuesFromCurrentFilter.length === 0)
          {
            return null;
          }

          if(currentFilterOptions?.length === 0 || itemValuesFromCurrentFilter.some((value) => currentFilterOptions.some(filterOption => filterOption.id === value?.id)))
          {
            // if the current item matches any of the filtered tags or topics, we return the tags or topics of the current item
            return itemValuesFromCurrentFilter;
          }
        }
        // for example legalArea is an object (item can only have one), so we check if the current item matches the filtered legalAreas
        else if(currentFilterOptions?.length === 0 || currentFilterOptions.some(filterOption => filterOption.id === itemValuesFromCurrentFilter?.id))
        {
          // if the current item matches the filtered legalAreas, we return the legalArea of the current item
          return itemValuesFromCurrentFilter;
        }

        return null;
      })
      .flat()
      .map(item =>
      {
        let filterOption: NullableProperties<FilterOption> | null = null;

        switch (item?.__typename)
        {
          case "LegalArea":
          {
            filterOption = {
              id: item.id,
              title: item.legalAreaName
            };
            break;
          }
          case "Topic":
          {
            filterOption = {
              id: item.id,
              title: item.topicName
            };
            break;
          }
          case "Tags":
          {
            filterOption = {
              id: item.id,
              title: item.tagName
            };
            break;
          }
          case undefined:
          {
            filterOption = null;
            break;
          }
        }

        if(filterOption == null || filterOption.id == null || filterOption.title == null)
        {
          return null;
        }

        return ({
          id: filterOption.id,
          title: filterOption.title,
        });
      })
      .filter(Boolean);

    if(filteredOptions.length === 0)
    {
      continue;
    }

    filteredSets.push(Array.from(new Map(filteredOptions.map(item => [item.id, item])).values()));

    /* if(Array.isArray(filteredOptions[0]))
    {
      filteredSets.push(new Set(filteredOptions.flatMap(item =>
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
      filteredSets.push(new Set(filteredOptions));
    }*/
  }

  console.log(filteredSets);

  if(filteredSets.length === 0)
  {
    return [];
  }

  return Array.from(filteredSets[0]!);

  // if(filteredSets.length === 0)
  // {
  //   return Array.from(new Set(items.map(item => item[currentFilterKey]).filter(Boolean)));
  // }
  //
  // console.log("filteredSets", filteredSets);
  //
  // return [];

  /* let finalSet = filteredSets[0]!;

  for(let i = 1; i < filteredSets.length; i++) 
  {
    finalSet = finalSet.intersection(filteredSets[i]!);
  }

  return Array.from(finalSet);*/
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
    // uniqueTags: [],
    // uniqueTopics: []
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
          isChecked: filters.topic.some(t => t.id === topic.id),
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
          isChecked: filters.tags.some(t => t.id === tag.id),
          label: tag.title,
          toggle: () => toggleFilter("tags", tag)
        }))}
        title="Tags"
      />
    </Drawer>
  );
};
