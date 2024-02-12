import Tag from "@/components/atoms/tag/Tag";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import { TagsSkeleton } from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import QuestionUpvoteButton from "@/components/pages/forumOverviewPage/questionUpvoteButton/QuestionUpvoteButton";
import { type ForumAnswer } from "@/db/schema";
import { useForumAnswerReplies } from "@/hooks/useForumAnswerReplies";
import { api } from "@/utils/api";

import { Title, TypographyStylesProvider } from "@mantine/core";
import Image from "next/image";
import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./AnswerListItem.styles";
import genericProfileIcon from "../../../../../public/images/icons/generic-user-icon.svg";
import ForumListItem from "../../forumOverviewPage/forumListItem/ForumListItem";

type Props = ForumAnswer;

const AnswerListItem: FunctionComponent<Props> = ({
  createdAt,
  id: answerId,
  text,
  updatedAt
}) =>
{
  const { isPending: isPostingAnswer, mutate: postAnswer } = api.forum.postAnswer.useMutation({
    onError: (error) => console.error(error),
    onSuccess: () =>
    {
      console.log("Success");
      // void apiContext.forum.getAnswers.invalidate({ questionId });
    },
  });

  const { data: replies, isLoading: areRepliesLoading } = useForumAnswerReplies(answerId);

  return (
    <Fragment>
      <ForumListItem>
        <div
          css={styles.wrapper}
          style={{ cursor: "pointer" }}
          onClick={() =>
          {
            postAnswer({
              parent: {
                answerId,
                parentType: "answer"
              },
              text: "This is a test answer " + Math.random()
            });
          }}>
          <div css={styles.upvoteColumn}>
            {/* <QuestionUpvoteButton
          isUpvoted={question.isUpvoted}
          questionId={question.id}
          upvotesCount={question.upvotesCount}
        />*/}
          </div>
          {/* <div css={styles.contentColumn}>
        <div css={styles.authorAndDateWrapper}>
          <div css={styles.authorWrapper}>
            <Image
              css={styles.profilePicture}
              src={genericProfileIcon.src}
              alt="Avatar"
              width={28}
              height={28}
            />
            <p css={styles.author}>{question.author.username}</p>
          </div>
          <p css={styles.date}>
            {question.createdAt.toLocaleDateString("de", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            {(question.createdAt.getTime() !== question.updatedAt.getTime()) && " (bearbeitet)"}
          </p>
        </div>
      </div>*/}
          {text}
        </div>
      </ForumListItem>
      <div style={{ paddingLeft: 80 }}>
        {replies?.map((reply) => (
          <p key={reply.id}>{reply.text}</p>
        ))}
      </div>
    </Fragment>
  );
};

export default AnswerListItem;
