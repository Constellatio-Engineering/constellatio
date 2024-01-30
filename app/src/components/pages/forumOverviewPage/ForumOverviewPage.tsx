import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import QuestionListItem from "@/components/pages/forumOverviewPage/questionListItem/QuestionListItem";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./ForumOverviewPage.styles";
import SearchBar from "./searchBar/SearchBar";

export const defaultLimit = 1;

const ForumOverviewPage: FunctionComponent = () =>
{
  const apiContext = api.useUtils();
  const { cancel, invalidate, setInfiniteData } = apiContext.forum.getQuestions;
  const cursorType = useForumPageStore(s => s.questionsCursorType);
  const setCursorType = useForumPageStore(s => s.setQuestionsCursorType);

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
    limit: defaultLimit,
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
    refetchOnWindowFocus: "always",
    staleTime: Infinity
  });

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
          const { questionsCursorType: _currentCursor } = useForumPageStore.getState();
          const nextCursor = _currentCursor === "newest" ? "upvotes" : "newest";

          setInfiniteData({
            cursor: {
              cursorType: nextCursor,
            },
            limit: defaultLimit,
          }, () => ({
            pageParams: [
              {
                cursorType: nextCursor,
              }
            ],
            pages: []
          }));

          setCursorType(nextCursor);
          await invalidate();
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
                <ForumListItem key={question.id}>
                  <QuestionListItem questionId={question.id}/>
                </ForumListItem>
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
