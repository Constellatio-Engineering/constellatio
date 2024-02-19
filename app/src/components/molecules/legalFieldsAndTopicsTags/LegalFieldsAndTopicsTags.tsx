import Tag from "@/components/atoms/tag/Tag";
import { TagsSkeleton } from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import { useLegalFieldsAndTopics } from "@/hooks/useLegalFieldsAndTopics";

import React, { type FunctionComponent } from "react";

import * as styles from "./LegalFieldsAndTopicsTags.styles";

type Props = {
  readonly legalFieldsIds: string[];
  readonly subfieldsIds: string[];
  readonly topicsIds: string[];
};

const LegalFieldsAndTopicsTags: FunctionComponent<Props> = ({ legalFieldsIds, subfieldsIds, topicsIds }) =>
{
  const {
    allLegalFields,
    allSubfields,
    allTopics,
    isLoading
  } = useLegalFieldsAndTopics();

  if(isLoading)
  {
    return <TagsSkeleton/>;
  }

  const legalFields = allLegalFields.filter((field) => legalFieldsIds.includes(field.id!));
  const subfields = allSubfields.filter((subfield) => subfieldsIds.includes(subfield.id!));
  const topics = allTopics.filter((topic) => topicsIds.includes(topic.id!));

  return (
    <div css={styles.tagsWrapper}>
      {legalFields.map((legalField) => (
        <Tag key={legalField.id} title={legalField.mainCategory}/>
      ))}
      {subfields.map((subfield) => (
        <Tag key={subfield.id} title={subfield.legalAreaName}/>
      ))}
      {topics.map((topic) => (
        <Tag key={topic.id} title={topic.topicName}/>
      ))}
    </div>
  );
};

export default LegalFieldsAndTopicsTags;
