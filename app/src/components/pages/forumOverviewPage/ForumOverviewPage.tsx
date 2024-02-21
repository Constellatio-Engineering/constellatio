import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumQuestions from "@/components/pages/forumOverviewPage/forumQuestions/ForumQuestions";
import { type GetQuestionsCursorType } from "@/schemas/forum/getQuestions.schema";
import { useForumPageStore } from "@/stores/forumPage.store";
import { api } from "@/utils/api";

import React, { Fragment, type FunctionComponent } from "react";

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
  const apiContext = api.useUtils();
  const getQuestionsApi = apiContext.forum.getQuestions;
  const cursorType = useForumPageStore(s => s.questionsCursorType);
  const setCursorType = useForumPageStore(s => s.setQuestionsCursorType);
  const { data: amountOfQuestionsQuery } = api.forum.getTotalAmountOfQuestions.useQuery(undefined, { refetchOnMount: true });
  const totalAmountOfQuestions = amountOfQuestionsQuery?.count;

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

  return (
    <Fragment>
      <ForumHeader/>
      <SearchBar/>
      <PostQuestionModal/>
      <ContentWrapper stylesOverrides={styles.wrapper}>
        {totalAmountOfQuestions != null && totalAmountOfQuestions === 0 ? (
          <EmptyStateCard
            title="Es gibt noch keine Fragen"
            text="Sei der Erste, der eine Frage stellt! Nutze dafür einfach den Button oben."
            variant="For-large-areas"
          />
        ) : (
          <>
            <div css={styles.head}>
              <div css={styles.totalAmountAndSortingWrapper(totalAmountOfQuestions != null)}>
                {totalAmountOfQuestions != null && (
                  <p css={styles.totalAmount}>{totalAmountOfQuestions} Fragen</p>
                )}
                <div css={[styles.sortWrapper, (totalAmountOfQuestions == null || totalAmountOfQuestions === 0) && styles.sortWrapperHidden]}>
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
            <ForumQuestions/>
          </>
        )}
      </ContentWrapper>
    </Fragment>
  );
};

export default ForumOverviewPage;
