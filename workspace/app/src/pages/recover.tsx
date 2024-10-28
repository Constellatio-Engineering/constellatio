import PageHead from "@/components/organisms/pageHead/PageHead";
import RecoverPage from "@/components/pages/RecoverPage/RecoverPage";

import React, { type FunctionComponent } from "react";

const Recover: FunctionComponent = () =>
{
  return (
    <>
      <PageHead pageTitle="Passwort zurücksetzen"/>
      <RecoverPage/>
    </>
  );
};

export default Recover;
