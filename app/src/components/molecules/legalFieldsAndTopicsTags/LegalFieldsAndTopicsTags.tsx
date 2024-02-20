import Tag, { type ITag } from "@/components/atoms/tag/Tag";
import { TagsSkeleton } from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import { useLegalFieldsAndTopics } from "@/hooks/useLegalFieldsAndTopics";
import { type Nullable } from "@/utils/types";

import React, { type FunctionComponent } from "react";

import * as styles from "./LegalFieldsAndTopicsTags.styles";

type TagsProps = {
  readonly areTagsClickable: ITag["isNotClickable"];
  readonly legalFieldId: Nullable<string>;
  readonly subfieldsIds: string[];
  readonly topicsIds: string[];
};

const Tags: FunctionComponent<TagsProps> = ({
  areTagsClickable,
  legalFieldId,
  subfieldsIds,
  topicsIds
}) =>
{
  const { allLegalFields, allSubfields, allTopics } = useLegalFieldsAndTopics();
  const legalField = allLegalFields.find((legalField) => legalField.id === legalFieldId);
  const subfields = allSubfields.filter((subfield) => subfieldsIds.includes(subfield.id!));
  const topics = allTopics.filter((topic) => topicsIds.includes(topic.id!));

  return (
    <>
      {legalField && (
        <Tag key={legalField.id} title={legalField.mainCategory} isNotClickable={!areTagsClickable}/>
      )}
      {subfields.map((subfield) => (
        <Tag key={subfield.id} title={subfield.legalAreaName} isNotClickable={!areTagsClickable}/>
      ))}
      {topics.map((topic) => (
        <Tag key={topic.id} title={topic.topicName} isNotClickable={!areTagsClickable}/>
      ))}
    </>
  );
};

type LegalFieldsAndTopicsTags = TagsProps & {
  readonly displayMode: "singleLine" | "multiLine" | "inline";
};

const LegalFieldsAndTopicsTags: FunctionComponent<LegalFieldsAndTopicsTags> = ({
  displayMode,
  ...props
}) =>
{
  const {
    isLoading
  } = useLegalFieldsAndTopics();

  if(isLoading)
  {
    return <TagsSkeleton/>;
  }

  if(displayMode === "inline")
  {
    return <Tags {...props}/>;
  }

  return (
    <div css={[styles.tagsWrapper, displayMode === "multiLine" ? styles.tagsWrapperMultiLine : styles.tagsWrapperSingleLine]}>
      <Tags {...props}/>
    </div>
  );
};

export default LegalFieldsAndTopicsTags;
