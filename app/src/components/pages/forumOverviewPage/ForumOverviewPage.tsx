import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { Check } from "@/components/Icons/Check";
import { ClapHands } from "@/components/Icons/ClapHands";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import QuestionUpvoteButton from "@/components/pages/forumOverviewPage/questionUpvoteButton/QuestionUpvoteButton";
import useBookmarks from "@/hooks/useBookmarks";
import { useForumQuestions } from "@/hooks/useForumQuestions";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ForumOverviewPage.styles";
import SearchBar from "./searchBar/SearchBar";

const ForumOverviewPage: FunctionComponent = () =>
{
  const { data: questions, isLoading } = useForumQuestions();
  const { bookmarks: questionBookmarks, isLoading: isGetQuestionBookmarksLoading } = useBookmarks("forumQuestion", { enabled: true });

  return (
    <>
      <ForumHeader/>
      <SearchBar/>
      <QuestionModal/>
      <ContentWrapper stylesOverrides={styles.wrapper}>
        <div css={styles.questionsWrapper}>
          {isLoading && (<p>Loading...</p>)}
          {questions?.map((question) => (
            <ForumListItem key={question.id}>
              <div css={styles.questionContentWrapper}>
                <div css={styles.upvoteColumn}>
                  <QuestionUpvoteButton
                    isUpvoted={false}
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
                  <p>{question.question}</p>
                </div>
              </div>
            </ForumListItem>
          ))}
        </div>
      </ContentWrapper>
    </>
  );
};

export default ForumOverviewPage;
