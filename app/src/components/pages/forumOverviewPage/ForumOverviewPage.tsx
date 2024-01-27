import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { Check } from "@/components/Icons/Check";
import { ClapHands } from "@/components/Icons/ClapHands";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { useForumQuestions } from "@/hooks/useForumQuestions";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ForumOverviewPage.styles";
import SearchBar from "./searchBar/SearchBar";

const ForumOverviewPage: FunctionComponent = () =>
{
  const { data: questions, isLoading } = useForumQuestions();

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
                  <UnstyledButton onClick={() => console.log("clap")}>
                    <ClapHands size={24}/>
                  </UnstyledButton>
                  <p css={styles.upvotesCounter}>0</p>
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
                      <button type="button">BB</button>
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
