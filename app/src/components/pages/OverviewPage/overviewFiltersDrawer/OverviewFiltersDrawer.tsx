import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import { type OverviewPageProps } from "@/components/pages/OverviewPage/OverviewPage";
import { statusesFilterOptions, useOverviewFiltersStore } from "@/stores/overviewFilters.store";
import { type NullableProperties } from "@/utils/types";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent, useMemo } from "react";

import * as styles from "./OverviewFiltersDrawer.styles";

type Props = {
  readonly items: OverviewPageProps["items"];
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

export const OverviewFiltersDrawer: FunctionComponent<Props> = ({ items }) =>
{
  const {
    clearFilteredLegalAreas,
    clearFilteredStatuses,
    clearFilteredTags,
    clearFilteredTopics,
    closeDrawer,
    filteredLegalAreas,
    filteredStatuses,
    filteredTags,
    filteredTopics,
    isDrawerOpened,
    toggleLegalArea,
    toggleStatus,
    toggleTag,
    toggleTopic
  } = useOverviewFiltersStore();

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
      <FilterCategory
        items={statusesFilterOptions.map(({ id, label }) => ({
          id,
          isChecked: filteredStatuses.includes(id),
          label,
          toggle: () => toggleStatus(id)
        }))}
        clearFilters={clearFilteredStatuses}
        activeFiltersCount={filteredStatuses.length}
        title="Status"
      />
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
