import EmailConfirmCard from "@/components/molecules/emailConfirmCard/EmailConfirmCard";

import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./ConfirmPage.styles";

const ConfirmEmailPage: FunctionComponent = () =>
{
  const router = useRouter();
  const urlSearchParams = new URLSearchParams(router.asPath.split("#")[1]);
  const params = Object.fromEntries(urlSearchParams.entries());
  return (
    <div css={styles.wrapper}>
      <EmailConfirmCard params={params}/>
    </div>
  );
};

export default ConfirmEmailPage;
