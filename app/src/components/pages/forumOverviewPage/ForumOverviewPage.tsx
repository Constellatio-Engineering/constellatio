import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import QuestionListItem from "@/components/pages/forumOverviewPage/questionListItem/QuestionListItem";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import QuestionsSkeleton from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import React, {
  Fragment, type FunctionComponent, useEffect, useMemo, useState 
} from "react";

import * as styles from "./ForumOverviewPage.styles";
import SearchBar from "./searchBar/SearchBar";

export const defaultLimit = 10;

const ForumOverviewPage: FunctionComponent = () =>
{
  const apiContext = api.useUtils();
  const { cancel, invalidate, setInfiniteData } = apiContext.forum.getQuestions;
  const cursorType = useForumPageStore(s => s.questionsCursorType);
  const setCursorType = useForumPageStore(s => s.setQuestionsCursorType);
  const { data: amountOfQuestionsQuery } = api.forum.getTotalAmountOfQuestions.useQuery(undefined, { refetchOnMount: true });
  const totalAmountOfQuestions = amountOfQuestionsQuery?.count;

  const {
    data: questionsQuery,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isPending,
    isRefetching,
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

  const logObject = useMemo(() => ({
    isFetching,
    isFetchingNextPage,
    isLoading,
    isPending,
    isRefetching,
  }), [isFetching, isFetchingNextPage, isLoading, isPending, isRefetching]);

  useEffect(() =>
  {
    console.log("useEffect", logObject);
  }, [logObject]);

  return (
    <Fragment>
      <ForumHeader/>
      <SearchBar/>
      <button type="button" onClick={async () => refetch()}>Refetch</button>
      <button
        type="button"
        onClick={async () =>
        {
          console.log("--- Change cursor ---");
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
        <div css={styles.head}>
          <div css={styles.totalAmountAndSortingWrapper(totalAmountOfQuestions != null)}>
            {totalAmountOfQuestions != null && (
              <p css={styles.totalAmount}>{totalAmountOfQuestions} Fragen</p>
            )}
            <div css={styles.sortWrapper}>
              <p>Sortieren nach</p>
              <select
                css={styles.selectSorting}
                onChange={(event) =>
                {
                  const { value } = event.target;
                  console.log("value", value);
                  // setCursorType(value);
                }}
                value={cursorType}>
                <option value="newest">Neueste</option>
                <option value="upvotes">Upvotes</option>
              </select>
            </div>
          </div>
        </div>
        <div css={styles.questionsWrapper}>
          {(isPending || isRefetching) ? (
            <QuestionsSkeleton/>
          ) : status === "error" ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              {questions.map((question) => (
                <ForumListItem key={question.id}>
                  <QuestionListItem questionId={question.id}/>
                </ForumListItem>
              ))}
              {isFetchingNextPage && (
                <QuestionsSkeleton/>
              )}
              {(!hasNextPage && !isFetchingNextPage) && (
                <p css={styles.endOfListReached}>Es gibt keine weiteren Fragen</p>
              )}
              <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
            </>
          )}
        </div>
      </ContentWrapper>
    </Fragment>
  );
};

export default ForumOverviewPage;
