import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import { type OverviewPageProps } from "@/components/pages/OverviewPage/OverviewPage";
import { allCaseProgressStates } from "@/db/schema";
import { statusesFilterOptions, useOverviewFiltersStore } from "@/stores/overviewFilters.store";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./OverviewFiltersDrawer.styles";

type Topic = {
  readonly id: string;
  readonly title: string;
};

type Props = {
  readonly items: OverviewPageProps["items"];
};

export const OverviewFiltersDrawer: FunctionComponent<Props> = ({ items }) =>
{
  const {
    clearFilteredStatuses,
    clearFilteredTopics,
    closeDrawer,
    filteredStatuses,
    filteredTopics,
    isDrawerOpened,
    toggleStatus,
    toggleTopic
  } = useOverviewFiltersStore();

  const uniqueTopics = Array
    .from(items
      .flatMap((item) => (item.topic ?? [])
        .map(t =>
        {
          if(t?.id == null || t?.topicName == null)
          {
            return null;
          }

          return ({
            id: t.id,
            title: t.topicName,
          }) satisfies Topic;
        }))
      .filter(Boolean)
      .reduce((map, topic) => map.set(topic.id, topic), new Map<string, Topic>()) // Use a Map to ensure uniqueness by topic id
      .values()
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Drawer
      lockScroll={false}
      opened={isDrawerOpened}
      onClose={closeDrawer}
      withCloseButton={false}
      position="right"
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
    </Drawer>
  );
};
