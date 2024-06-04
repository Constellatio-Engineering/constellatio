import type { IGenTopic } from "@/services/graphql/__generated/sdk";
import type { Nullable } from "@/utils/types";

export type TopicSearchIndexItem = {
  id: Nullable<string>;
  topicName: Nullable<string>;
};

export type TopicSearchItemNodes = keyof TopicSearchIndexItem;
export type TopicSearchItemUpdate = TopicSearchIndexItem;

export const createTopicSearchIndexItem = ({ id, topicName }: IGenTopic): TopicSearchIndexItem =>
{
  const topicSearchIndexItem: TopicSearchIndexItem = {
    id,
    topicName
  };

  return topicSearchIndexItem;
};

export const topicSearchIndexItemPrimaryKey: keyof TopicSearchIndexItem = "id";
