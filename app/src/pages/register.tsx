import PageHead from "@/components/organisms/pageHead/PageHead";
import { AuthPage } from "@/components/pages/AuthPage/AuthPage";
import { type ServerSidePropsResult } from "@/pages/login";

import { type FunctionComponent } from "react";

export { getServerSideProps } from "./login";

const Login: FunctionComponent<ServerSidePropsResult> = () => (
  <>
    <PageHead pageTitle="Registrierung"/>
    <AuthPage tab="register"/>
  </>
);

export default Login;
