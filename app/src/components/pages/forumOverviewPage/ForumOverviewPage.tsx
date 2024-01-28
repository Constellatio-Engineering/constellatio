import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import QuestionListItem from "@/components/pages/forumOverviewPage/questionListItem/QuestionListItem";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { api } from "@/utils/api";

import React, { type FunctionComponent } from "react";

import * as styles from "./ForumOverviewPage.styles";
import SearchBar from "./searchBar/SearchBar";

const ForumOverviewPage: FunctionComponent = () =>
{
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
    limit: 2,
  }, {
    // getNextPageParam: (lastPage) => lastPage.nextCursor,
    getNextPageParam: (lastPage) => 0,
    initialCursor: {
      cursorType: "upvotes",
      cursorValue: 0,
    },
    refetchOnWindowFocus: "always",
    staleTime: Infinity
  });

  console.log(questionsQuery);

  // const questions = questionsQuery?.pages.flatMap((page) => page?.questions ?? []) ?? [];
  const questions = [];

  return (
    <>
      <ForumHeader/>
      <SearchBar/>
      <button type="button" onClick={async () => refetch()}>Refetch</button>
      <QuestionModal/>
      <ContentWrapper stylesOverrides={styles.wrapper}>
        <div css={styles.questionsWrapper}>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : status === "error" ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              {questions.map((question) => (
                <ForumListItem key={question.id}>
                  <QuestionListItem question={question}/>
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
