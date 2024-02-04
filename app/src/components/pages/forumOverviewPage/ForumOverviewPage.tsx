import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import QuestionListItem from "@/components/pages/forumOverviewPage/questionListItem/QuestionListItem";
import QuestionsSkeleton from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import { type GetQuestionsCursorType } from "@/schemas/forum/getQuestions.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import React, {
  Fragment, type FunctionComponent, useEffect, useMemo
} from "react";
import { useInView } from "react-intersection-observer";

import * as styles from "./ForumOverviewPage.styles";
import PostQuestionModal from "./postQuestionModal/PostQuestionModal";
import SearchBar from "./searchBar/SearchBar";

export const defaultLimit = 10;

type SortingOptions = {
  [key in GetQuestionsCursorType]: {
    readonly label: string;
  };
};

const sortingOptions: SortingOptions = {
  newest: {
    label: "Neueste",
  },
  upvotes: {
    label: "Populärste",
  },
} as const;

const ForumOverviewPage: FunctionComponent = () =>
{
  const { inView: isEndOfListInView, ref: endOfListLabelRef } = useInView({
    initialInView: false,
    threshold: 0,
    triggerOnce: false,
  });
  const apiContext = api.useUtils();
  const getQuestionsApi = apiContext.forum.getQuestions;
  const cursorType = useForumPageStore(s => s.questionsCursorType);
  const setCursorType = useForumPageStore(s => s.setQuestionsCursorType);
  const { data: amountOfQuestionsQuery } = api.forum.getTotalAmountOfQuestions.useQuery(undefined, { refetchOnMount: true });
  const totalAmountOfQuestions = amountOfQuestionsQuery?.count;

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
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  const questions = useMemo(() =>
  {
    return questionsQuery?.pages.flatMap((page) => page?.questions ?? []) ?? [];
  }, [questionsQuery?.pages]);

  const changeCursor = async (newCursor: GetQuestionsCursorType): Promise<void> =>
  {
    await getQuestionsApi.cancel();

    getQuestionsApi.setInfiniteData({
      cursor: {
        cursorType: newCursor,
      },
      limit: defaultLimit,
    }, () => ({
      pageParams: [
        {
          cursorType: newCursor,
        }
      ],
      pages: []
    }));

    setCursorType(newCursor);
    await getQuestionsApi.invalidate();
  };

  const loadedQuestionsLength = questions.length;

  useEffect(() => 
  {
    if(isEndOfListInView)
    {
      void fetchNextPage();
    }
  }, [fetchNextPage, isEndOfListInView, loadedQuestionsLength]);

  return (
    <Fragment>
      <ForumHeader/>
      <SearchBar/>
      <PostQuestionModal/>
      <ContentWrapper stylesOverrides={styles.wrapper}>
        <div css={styles.head}>
          <div css={styles.totalAmountAndSortingWrapper(totalAmountOfQuestions != null)}>
            {totalAmountOfQuestions != null && (
              <p css={styles.totalAmount}>{totalAmountOfQuestions} Fragen</p>
            )}
            <div css={styles.sortWrapper}>
              <p>Sortieren nach:</p>
              <select
                css={styles.selectSorting}
                onChange={(event) =>
                {
                  const value = event.target.value as GetQuestionsCursorType;
                  void changeCursor(value);
                }}
                value={cursorType}>
                {Object.entries(sortingOptions).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
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
          )}
        </div>
      </ContentWrapper>
    </Fragment>
  );
};

export default ForumOverviewPage;
