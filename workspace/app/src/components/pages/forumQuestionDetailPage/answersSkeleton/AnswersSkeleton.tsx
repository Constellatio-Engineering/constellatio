import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";

import { Skeleton } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./AnswersSkeleton.styles";

type Props = {
  readonly numberOfSkeletons: number;
  readonly withReplyButton: boolean;
};

const AnswersSkeleton: FunctionComponent<Props> = ({ numberOfSkeletons, withReplyButton }) =>
{
  return Array.from({ length: numberOfSkeletons }).map((_, index) => (
    <ForumListItem key={index}>
      <div css={styles.wrapper}>
        <Skeleton css={styles.upvotes} height={48} width={24}/>
        <div css={styles.authorAndDate}>
          <div css={styles.author}>
            <Skeleton
              height={28}
              width={28}
              circle={true}
            />
            <Skeleton height={20} width={140}/>
          </div>
          <Skeleton height={20} width={160}/>
        </div>
        <Skeleton height={80} width="100%"/>
        {withReplyButton && (
          <div css={styles.replyWrapper}>
            <Skeleton height={20} width={120}/>
            <Skeleton height={30} width={100}/>
          </div>
        )}
      </div>
    </ForumListItem>
  ));
};

export default AnswersSkeleton;
