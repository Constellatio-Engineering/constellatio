import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import { ForumQuestionDetailPage } from "@/components/pages/forumQuestionDetailPage/ForumQuestionDetailPage";
import ForumQuestionDetailsPageSkeleton from "@/components/pages/forumQuestionDetailPage/forumQuestionDetailsPageSkeleton/ForumQuestionDetailsPageSkeleton";
import { type NextPageWithLayout } from "@/pages/_app";

import ErrorPage from "next/error";
import { useRouter } from "next/router";
import React from "react";

const Page: NextPageWithLayout = () =>
{
  const router = useRouter();
  const questionId = router.query?.id;

  if(!router.isReady)
  {
    return (
      <ForumQuestionDetailsPageSkeleton/>
    );
  }

  if(!questionId || typeof questionId !== "string")
  {
    return <ErrorPage statusCode={404}/>;
  }

  return (
    <>
      <PageHead pageTitle={"Frage ohne Titel"}/>
      <ForumQuestionDetailPage questionId={questionId}/>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
