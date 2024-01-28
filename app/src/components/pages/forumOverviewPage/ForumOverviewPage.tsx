import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import QuestionListItem from "@/components/pages/forumOverviewPage/questionListItem/QuestionListItem";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { useForumQuestions } from "@/hooks/useForumQuestions";

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
              <QuestionListItem question={question}/>
            </ForumListItem>
          ))}
        </div>
      </ContentWrapper>
    </>
  );
};

export default ForumOverviewPage;
