import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { FilterCategory } from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/FilterCategory";
import { type OverviewPageProps } from "@/components/pages/OverviewPage/OverviewPage";
import { allCaseProgressStates } from "@/db/schema";
import { useOverviewFiltersStore } from "@/stores/overviewFilters.store";

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
    closeDrawer,
    filteredStatuses,
    filteredTopics,
    isDrawerOpened,
    toggleStatus,
    toggleTopic
  } = useOverviewFiltersStore();
  const statuses = allCaseProgressStates;

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
        items={statuses.map(status => ({
          id: status,
          isChecked: filteredStatuses.includes(status),
          label: status,
          toggle: () => toggleStatus(status)
        }))}
        title="Status"
      />
      <FilterCategory
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
