import PageHead from "@/components/pageHead/PageHead";
import { AuthPage } from "@/components/pages/AuthPage/AuthPage";

import { type FunctionComponent } from "react";

const Login: FunctionComponent = () => (
  <>
    <PageHead pageTitle="Login"/>
    <AuthPage tab="login"/>
  </>
);

export default Login;
