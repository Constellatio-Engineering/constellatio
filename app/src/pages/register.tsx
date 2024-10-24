import PageHead from "@/components/organisms/pageHead/PageHead";
import { AuthPage } from "@/components/pages/AuthPage/AuthPage";
import { type ServerSidePropsResult } from "@/pages/login";

import { type FunctionComponent } from "react";

export { getServerSideProps } from "./login";

const Register: FunctionComponent<ServerSidePropsResult> = ({ formVariant, socialAuthError }) => (
  <>
    <PageHead pageTitle="Registrierung"/>
    <AuthPage
      tab="register"
      socialAuthError={socialAuthError}
      formVariant={formVariant}
    />
  </>
);

export default Register;
