import EmailConfirmCard from "@/components/molecules/emailConfirmCard/EmailConfirmCard";

import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./ConfirmPage.styles";

const ConfirmEmailPage: FunctionComponent = () =>
{
  const router = useRouter();

  return (
    <div css={styles.wrapper}>
      <EmailConfirmCard params={router.query}/>
    </div>
  );
};

export default ConfirmEmailPage;
