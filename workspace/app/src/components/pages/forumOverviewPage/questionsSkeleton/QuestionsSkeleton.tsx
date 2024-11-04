import { defaultLimit } from "@/components/pages/forumOverviewPage/ForumOverviewPage";

import { Skeleton } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./QuestionsSkeleton.styles";
import ForumListItem from "../forumListItem/ForumListItem";

type Props = {
  readonly numberOfSkeletons?: number;
};

export const TagsSkeleton: FunctionComponent = () => (
  <div css={styles.tags}>
    <Skeleton height={20} width={90}/>
    <Skeleton height={20} width={90}/>
    <Skeleton height={20} width={90}/>
  </div>
);

const QuestionsSkeleton: FunctionComponent<Props> = ({ numberOfSkeletons = defaultLimit }) =>
{
  return Array.from({ length: numberOfSkeletons }).map((_, index) => (
    <ForumListItem key={index}>
      <div css={styles.wrapper}>
        <Skeleton css={styles.upvotes} height={48} width={24}/>
        <Skeleton css={styles.bookmark} height={24} width={24}/>
        <Skeleton css={styles.comments} height={24} width={48}/>
        <Skeleton height={24} mb={20} width={400}/>
        <Skeleton height={16} mb={20} width={300}/>
        <Skeleton height={100} mb={20} width="100%"/>
        <TagsSkeleton/>
      </div>
    </ForumListItem>
  ));
};

export default QuestionsSkeleton;
