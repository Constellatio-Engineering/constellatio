import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import QuestionListItem from "@/components/pages/forumOverviewPage/questionListItem/QuestionListItem";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type GetQuestionsCursorType, type GetQuestionsSchema } from "@/schemas/forum/getQuestions.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import { useQueryClient } from "@tanstack/react-query";
import React, { Fragment, type FunctionComponent, useState } from "react";

import * as styles from "./ForumOverviewPage.styles";
import SearchBar from "./searchBar/SearchBar";

const ForumOverviewPage: FunctionComponent = () =>
{
  const { invalidateForumQuestions } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const cursorType = useForumPageStore(s => s.questionsCursorType);
  const setCursorType = useForumPageStore(s => s.setQuestionsCursorType);

  const apiContext = api.useUtils();
  const {
    cancel,
    invalidate,
    reset,
    setInfiniteData
  } = apiContext.forum.getQuestions;

  const {
    data: questionsQuery,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    status,
  } = api.forum.getQuestions.useInfiniteQuery({
    limit: 3,
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

      let nextCursor: GetQuestionsSchema["cursor"];

      if(currentlySelectedCursor === "newest")
      {
        nextCursor = {
          cursorType: "newest",
          index: null,
        };
      }
      else
      {
        nextCursor = {
          cursorType: "upvotes",
          index: null,
          upvotes: null,
        };
      }

      console.log("cursor changed");

      return nextCursor;
    },
    initialCursor: { cursorType: "newest" },
    refetchOnWindowFocus: "always",
    staleTime: Infinity
  });

  // console.log("questionsQuery pageParams:", questionsQuery?.pageParams);

  const questions = questionsQuery?.pages.flatMap((page) => page?.questions ?? []) ?? [];

  return (
    <>
      <ForumHeader/>
      <SearchBar/>
      <button type="button" onClick={async () => refetch()}>Refetch</button>
      <button
        type="button"
        onClick={async () =>
        {
          await cancel();

          // const { questionsCursorType: _currentCursor } = useForumPageStore.getState();
          const { questionsCursorType: _currentCursor } = useForumPageStore.getState();
          const nextCursor = _currentCursor === "newest" ? "upvotes" : "newest";

          setInfiniteData({
            cursor: {
              cursorType: nextCursor,
            },
            limit: 3,
          }, () => ({
            pageParams: [
              {
                cursorType: nextCursor,
              }
            ],
            pages: []
          }));

          setCursorType(nextCursor);

          // await reset();

          void invalidateForumQuestions();
        }}>
        Change cursor
      </button>
      <p>Current cursor: {cursorType}</p>
      <QuestionModal/>
      <ContentWrapper stylesOverrides={styles.wrapper}>
        <div css={styles.questionsWrapper}>
          {status === "pending" ? (
            <p>Loading...</p>
          ) : status === "error" ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              {questions.map((question) => (
                <Fragment key={question.id}>
                  <p>{question.title} - Upvotes: {question.upvotesCount}</p>
                  {/* <ForumListItem key={question.id}>
                  <QuestionListItem question={question}/>
                </ForumListItem>*/}
                </Fragment>
              ))}
              <div>
                <button
                  type="button"
                  onClick={async () => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}>
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                      ? "Load More"
                      : "Nothing more to load"}
                </button>
              </div>
              <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
            </>
          )}
        </div>
      </ContentWrapper>
    </>
  );
};

export default ForumOverviewPage;
