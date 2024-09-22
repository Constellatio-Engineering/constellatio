import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
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
  const closeDrawer = useOverviewFiltersStore(s => s.closeDrawer);
  const isDrawerOpened = useOverviewFiltersStore(s => s.isDrawerOpened);
  const filteredStatuses = useOverviewFiltersStore(s => s.filteredStatuses);
  const toggleStatus = useOverviewFiltersStore(s => s.toggleStatus);
  const filteredTopics = useOverviewFiltersStore(s => s.filteredTopics);
  const toggleTopic = useOverviewFiltersStore(s => s.toggleTopic);

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
      <h2>Status</h2>
      {statuses.map(status => (
        <Checkbox
          key={status}
          checked={filteredStatuses.includes(status)}
          onChange={(_event) => toggleStatus(status)}
          label={status}
        />
      ))}
      <h2>Thema</h2>
      {uniqueTopics.map(topic => (
        <Checkbox
          key={topic.id}
          checked={filteredTopics.includes(topic.id)}
          onChange={(_event) => toggleTopic(topic.id)}
          label={topic.title}
        />
      ))}
    </Drawer>
  );
};
