import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import AnswersSkeletonWithSorting from "@/components/pages/forumQuestionDetailPage/answersSkeletonWithSorting/AnswersSkeletonWithSorting";
import QuestionDetailSkeleton from "@/components/pages/forumQuestionDetailPage/questionDetailSkeleton/QuestionDetailSkeleton";

import { Skeleton } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "../ForumQuestionDetailPage.styles";

const ForumQuestionDetailsPageSkeleton: FunctionComponent = () =>
{
  return (
    <>
      <div css={styles.questionWrapper}>
        <ContentWrapper stylesOverrides={styles.contentWrapper}>
          <div css={styles.backToForumLink}>
            <Skeleton width={140} height={20}/>
          </div>
          <ForumListItem stylesOverrides={styles.forumListItem}>
            <div css={styles.yellowTopBar}/>
            <QuestionDetailSkeleton/>
          </ForumListItem>
        </ContentWrapper>
      </div>
      <ContentWrapper stylesOverrides={styles.contentWrapper}>
        <div css={styles.answersWrapper}>
          <AnswersSkeletonWithSorting numberOfSkeletons={5}/>
        </div>
      </ContentWrapper>
    </>
  );
};

export default ForumQuestionDetailsPageSkeleton;
