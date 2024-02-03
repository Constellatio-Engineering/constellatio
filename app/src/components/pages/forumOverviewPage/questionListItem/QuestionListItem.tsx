import Tag from "@/components/atoms/tag/Tag";
import { Chat } from "@/components/Icons/Chat";
import { Check } from "@/components/Icons/Check";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import { defaultLimit } from "@/components/pages/forumOverviewPage/ForumOverviewPage";
import QuestionUpvoteButton from "@/components/pages/forumOverviewPage/questionUpvoteButton/QuestionUpvoteButton";
import useBookmarks from "@/hooks/useBookmarks";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";
import { removeHtmlTagsFromString } from "@/utils/utils";

import { Title } from "@mantine/core";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import * as styles from "./QuestionListItem.styles";
import genericProfileIcon from "../../../../../public/images/icons/generic-user-icon.svg";

type Props = {
  readonly questionId: string;
};

const QuestionListItem: FunctionComponent<Props> = ({ questionId }) =>
{
  const apiContext = api.useUtils();
  const { bookmarks: questionBookmarks, isLoading: isGetQuestionBookmarksLoading } = useBookmarks("forumQuestion", { enabled: true });
  const { data: question, /* isFetching*/ } = api.forum.getQuestionById.useQuery({ questionId }, {
    initialData: () =>
    {
      // There seems to be a bug with the types where cursor is required for getInfiniteData, but it is not (taken from the docs)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const getQuestionsCacheData = apiContext.forum.getQuestions.getInfiniteData({ limit: defaultLimit });
      const questionsFromCache = getQuestionsCacheData?.pages.flatMap((page) => page?.questions ?? []) ?? [];
      return questionsFromCache.find((question) => question.id === questionId);
    },
    staleTime: Infinity,
  });

  const setEditQuestionState = useForumPageStore((state) => state.setEditQuestionState);

  if(question == null)
  {
    return <p>Question not found</p>;
  }

  return (
    <div css={styles.questionContentWrapper} style={{ cursor: "pointer" }} onClick={() => setEditQuestionState(questionId)}>
      <div css={styles.upvoteColumn}>
        <QuestionUpvoteButton
          isUpvoted={question.isUpvoted}
          questionId={question.id}
          upvotesCount={question.upvotesCount}
        />
      </div>
      <div css={styles.contentColumn}>
        <div css={styles.titleWrapper}>
          <div css={styles.titleAndCheckmarkWrapper}>
            <Title order={2} css={styles.title}>{question.title}</Title>
            <div css={styles.checkmark}>
              <Check/>
            </div>
          </div>
          <div css={styles.bookmarkButtonWrapper}>
            <BookmarkButton
              areAllBookmarksLoading={isGetQuestionBookmarksLoading}
              isBookmarked={questionBookmarks.some(bookmark => bookmark?.resourceId === question?.id) || false}
              resourceId={question.id}
              variant="forumQuestion"
            />
          </div>
        </div>
        <div>
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
            <div css={styles.authorAndDateSeparator}/>
            <p css={styles.date}>
              {question.createdAt.toLocaleDateString("de", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              {(question.createdAt.getTime() !== question.updatedAt.getTime()) && " (bearbeitet)"}
            </p>
          </div>
          <p css={styles.excerpt}>
            {removeHtmlTagsFromString(question.questionText, true)}
          </p>
        </div>
        <div css={styles.bottomWrapper}>
          <div css={styles.tagsWrapper}>
            <Tag title={question.legalArea}/>
            <Tag title={question.legalField}/>
            <Tag title={question.legalTopic}/>
          </div>
          <div css={styles.answersCountWrapper}>
            <Chat size={20}/>
            <p>12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionListItem;
