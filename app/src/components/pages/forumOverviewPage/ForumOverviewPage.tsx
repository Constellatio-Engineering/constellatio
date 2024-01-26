import ForumHeader from "@/components/pages/forumOverviewPage/forumHeader/ForumHeader";
import QuestionModal from "@/components/pages/forumOverviewPage/questionModal/QuestionModal";

import React, { type FunctionComponent } from "react";

import * as styles from "./ForumOverviewPage.styles";
import SearchBar from "./searchBar/SearchBar";

const ForumOverviewPage: FunctionComponent = () =>
{
  return (
    <>
      <ForumHeader/>
      <SearchBar/>
      <QuestionModal/>
    </>
  );
};

export default ForumOverviewPage;
