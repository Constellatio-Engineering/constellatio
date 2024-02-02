import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import QuestionListItem from "@/components/pages/forumOverviewPage/questionListItem/QuestionListItem";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import QuestionsSkeleton from "@/components/pages/forumOverviewPage/questionsSkeleton/QuestionsSkeleton";
import { type GetQuestionsCursorType } from "@/schemas/forum/getQuestions.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import React, {
  Fragment, type FunctionComponent, useEffect, useMemo
} from "react";
import { useInView } from "react-intersection-observer";

import * as styles from "./ForumOverviewPage.styles";
import SearchBar from "./searchBar/SearchBar";

export const defaultLimit = 1;

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
  const { inView: isLastQuestionInView, ref: lastQuestionRef } = useInView({
    initialInView: false,
    triggerOnce: true
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
    refetchOnWindowFocus: "always",
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

  const loadedQuestions = questions.length;

  useEffect(() => 
  {
    console.log("--------");
    console.log("isLastQuestionInView", isLastQuestionInView);
    console.log("isFetchingNextPage", isFetchingNextPage);
    console.log("hasNextPage", hasNextPage);
    console.log("loadedQuestions", loadedQuestions);

    if(isLastQuestionInView && !isFetchingNextPage && hasNextPage)
    {
      void fetchNextPage();
    }
  }, [fetchNextPage, isLastQuestionInView, isFetchingNextPage, hasNextPage, loadedQuestions]);

  return (
    <Fragment>
      <ForumHeader/>
      <SearchBar/>
      <QuestionModal/>
      <ContentWrapper stylesOverrides={styles.wrapper}>
        <div css={styles.head}>
          <div css={styles.totalAmountAndSortingWrapper(totalAmountOfQuestions != null)}>
            {totalAmountOfQuestions != null && (
              <p css={styles.totalAmount}>{totalAmountOfQuestions} Fragen - Loaded: {questions.length}</p>
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
              {questions.map((question, index) => (
                <ForumListItem key={question.id} ref={index === questions.length - 1 ? lastQuestionRef : undefined}>
                  <QuestionListItem questionId={question.id}/>
                </ForumListItem>
              ))}
              {isFetchingNextPage && (
                <QuestionsSkeleton/>
              )}
              <p css={styles.endOfListReached}>Es gibt keine weiteren Fragen</p>
              {(!hasNextPage && !isFetchingNextPage) && (
                <p css={styles.endOfListReached}>Es gibt keine weiteren Fragen</p>
              )}
            </Fragment>
          )}
        </div>
      </ContentWrapper>
    </Fragment>
  );
};

export default ForumOverviewPage;
