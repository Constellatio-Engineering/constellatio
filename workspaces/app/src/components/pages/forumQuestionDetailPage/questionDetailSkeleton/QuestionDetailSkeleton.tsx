import { TagsSkeleton } from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";

import { Skeleton } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./QuestionDetailSkeleton.styles";

const QuestionDetailSkeleton: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <Skeleton css={styles.upvotes} height={48} width={24}/>
    <Skeleton css={styles.bookmark} height={24} width={24}/>
    <Skeleton height={40} mb={20} width={"90%"}/>
    <TagsSkeleton/>
    <Skeleton
      height={24}
      mt={40}
      mb={20}
      width={400}
    />
    <Skeleton height={80} mb={20} width="100%"/>
    <Skeleton height={120} mb={20} width="100%"/>
    <Skeleton height={110} mb={20} width="100%"/>
  </div>
);

export default QuestionDetailSkeleton;
