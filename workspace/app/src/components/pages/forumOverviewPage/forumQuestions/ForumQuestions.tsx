import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import { defaultLimit } from "@/components/pages/forumOverviewPage/ForumOverviewPage";
import QuestionListItem from "@/components/pages/forumOverviewPage/questionListItem/QuestionListItem";
import QuestionsSkeleton from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import { appPaths } from "@constellatio/shared/paths";
import { useRouter } from "next/router";
import React, { Fragment, type FunctionComponent, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import * as styles from "./ForumQuestions.styles";

type Props = {
  readonly questionIds?: string[];
};

const QuestionsEmptyStateCard: FunctionComponent = () =>
{
  const router = useRouter();

  return (
    <EmptyStateCard
      text={"Du kannst Fälle, Lexikon-Artikel und sogar einzelne markierte Textpassagen als deine persönlichen Favoriten speichern"}
      title={"Du hast noch keine Fragen als Favoriten gespeichert"}
      variant={"For-large-areas"}
      button={{
        content: "Alle Fragen ansehen",
        onClick: async () => router.push(appPaths.forum)
      }}
    />
  );
};

const ForumQuestions: FunctionComponent<Props> = ({ questionIds }) =>
{
  const { inView: isEndOfListInView, ref: endOfListLabelRef } = useInView({
    initialInView: false,
    rootMargin: "30% 0px 30%",
    threshold: 0,
    triggerOnce: false,
  });

  const {
    data: questionsQuery,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isRefetching,
    status,
  } = api.forum.getQuestions.useInfiniteQuery({
    limit: defaultLimit,
    questionIds,
  }, {
    getNextPageParam: (previouslyFetchedPage) =>
    {
      const { questionsCursorType: currentlySelectedCursor } = useForumPageStore.getState();

      if(previouslyFetchedPage?.nextCursor == null)
      {
        // backend returned no cursor, we're at the end of the list
        return null;
      }

      if(currentlySelectedCursor === previouslyFetchedPage?.nextCursor?.cursorType)
      {
        // cursor hasn't changed, continue with the next page/cursor
        return previouslyFetchedPage.nextCursor;
      }

      // cursor has changed
      return { cursorType: currentlySelectedCursor };
    },
    initialCursor: { cursorType: "newest" },
    refetchOnMount: "always",
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  const questions = useMemo(() =>
  {
    return questionsQuery?.pages.flatMap((page) => page?.questions ?? []) ?? [];
  }, [questionsQuery?.pages]);

  const loadedQuestionsLength = questions.length;

  useEffect(() =>
  {
    if(isEndOfListInView)
    {
      void fetchNextPage();
    }
  }, [fetchNextPage, isEndOfListInView, loadedQuestionsLength]);

  return (
    <div css={styles.questionsWrapper}>
      {questionIds != null && questionIds.length === 0 ? (
        <QuestionsEmptyStateCard/>
      ) : (isPending || isRefetching) ? (
        <QuestionsSkeleton/>
      ) : status === "error" ? (
        <p>Error: {error.message}</p>
      ) : questions.length > 0 ? (
        <Fragment>
          {questions.map((question) => (
            <ForumListItem key={question.id}>
              <QuestionListItem questionId={question.id}/>
            </ForumListItem>
          ))}
          {isFetchingNextPage && (
            <QuestionsSkeleton/>
          )}
          <p
            ref={endOfListLabelRef}
            css={[
              styles.endOfListReached,
              (!hasNextPage && !isFetchingNextPage) && styles.endOfListReachedVisible
            ]}>
            Es gibt keine weiteren Fragen
          </p>
        </Fragment>
      ) : (
        <QuestionsEmptyStateCard/>
      )}
    </div>
  );
};

export default ForumQuestions;
