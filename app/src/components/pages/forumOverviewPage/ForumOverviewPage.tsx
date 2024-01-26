import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";
import { useForumQuestions } from "@/hooks/useForumQuestions";

import React, { type FunctionComponent } from "react";

import SearchBar from "./searchBar/SearchBar";

const ForumOverviewPage: FunctionComponent = () =>
{
  const { data: questions, isLoading } = useForumQuestions();

  return (
    <>
      <ForumHeader/>
      <SearchBar/>
      <QuestionModal/>
      {isLoading && (<p>Loading...</p>)}
      {questions?.map((question) => (
        <div key={question.id} style={{ margin: 30 }}>
          <h1>{question.title}</h1>
          <p>{question.question}</p>
        </div>
      ))}
    </>
  );
};

export default ForumOverviewPage;
