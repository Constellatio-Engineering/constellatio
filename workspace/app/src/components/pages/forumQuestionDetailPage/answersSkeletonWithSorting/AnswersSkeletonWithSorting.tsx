import AnswersSkeleton from "@/components/pages/forumQuestionDetailPage/answersSkeleton/AnswersSkeleton";

import { Skeleton } from "@mantine/core";
import { Fragment, type FunctionComponent } from "react";

import * as styles from "./AnswersSkeletonWithSorting.styles";

type Props = {
  readonly numberOfSkeletons: number;
};

const AnswersSkeletonWithSorting: FunctionComponent<Props> = ({ numberOfSkeletons }) => 
{
  return (
    <>
      <Fragment>
        <div css={styles.sortingSkeletonWrapper}>
          <Skeleton height={20} width={120}/>
          <Skeleton height={20} width={140}/>
        </div>
        <AnswersSkeleton
          numberOfSkeletons={numberOfSkeletons}
          withReplyButton={true}
        />
      </Fragment>
    </>
  );
};

export default AnswersSkeletonWithSorting;
