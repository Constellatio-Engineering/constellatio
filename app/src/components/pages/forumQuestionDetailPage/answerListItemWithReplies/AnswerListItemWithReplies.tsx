import { Button } from "@/components/atoms/Button/Button";
import AnswerUpvoteButton from "@/components/pages/forumOverviewPage/upvoteButton/AnswerUpvoteButton";
import { type ForumAnswer } from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { useForumAnswerDetails } from "@/hooks/useForumAnswerDetails";
import { useForumAnswers } from "@/hooks/useForumAnswers";
import { usePostAnswer } from "@/hooks/usePostAnswer";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import type { GetAnswersSchema } from "@/schemas/forum/getAnswers.schema";
import { type Answer } from "@/server/api/routers/forum.router";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import { TypographyStylesProvider } from "@mantine/core";
import Image from "next/image";
import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./AnswerListItemWithReplies.styles";
import genericProfileIcon from "../../../../../public/images/icons/generic-user-icon.svg";
import ForumListItem from "../../forumOverviewPage/forumListItem/ForumListItem";

type Props = {
  readonly answerId: string;
  readonly parent: GetAnswersSchema["parent"];
};

const AnswerListItemWithReplies: FunctionComponent<Props> = ({ answerId, parent }) =>
{
  const expandAnswerReplies = useForumPageStore(s => s.expandAnswerReplies);
  const toggleAnswerReplies = useForumPageStore(s => s.toggleAnswerReplies);
  const closeAnswerReplies = useForumPageStore(s => s.closeAnswerReplies);
  const areRepliesExpanded = useForumPageStore(s => s.getAreRepliesExpanded(answerId));

  const { data: answer } = useForumAnswerDetails({ answerId, parent });
  const { isPending: isPostingAnswer, mutate: postAnswer } = usePostAnswer();
  const { data: replies, isLoading: areAnswersLoading } = useForumAnswers({
    parent: {
      answerId,
      parentType: "answer"
    }
  });

  if(answer == null)
  {
    return <p>Answer not found</p>;
  }

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
            <AnswerUpvoteButton
              isUpvoted={answer.isUpvoted}
              answerId={answer.id}
              upvotesCount={answer.upvotesCount}
            />
          </div>
          <div css={styles.contentColumn}>
            <div css={styles.authorAndDateWrapper}>
              <div css={styles.authorWrapper}>
                <Image
                  css={styles.profilePicture}
                  src={genericProfileIcon.src}
                  alt="Avatar"
                  width={28}
                  height={28}
                />
                <p css={styles.author}>{answer.author.username}</p>
              </div>
              <p css={styles.date}>
                {answer.createdAt.toLocaleDateString("de", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                {(answer.createdAt.getTime() !== answer.updatedAt.getTime()) && " (bearbeitet)"}
              </p>
            </div>
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: answer.text }}/>
            </TypographyStylesProvider>
            <div
              css={styles.replyWrapper}
              style={{ cursor: "pointer" }}
              onClick={(e) =>
              {
                e.stopPropagation();
                toggleAnswerReplies(answerId);
              }}>
              <p>{replies?.length ?? 0} Antworten</p>
              <Button<"button"> styleType={"primary"} size={"medium"}>
                Antworten
              </Button>
            </div>
          </div>
        </div>
      </ForumListItem>
      {areRepliesExpanded && (
        <div style={{ paddingLeft: 80 }}>
          {replies?.map((reply) => (
            <p key={reply.id}>{reply.text}</p>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default AnswerListItemWithReplies;
