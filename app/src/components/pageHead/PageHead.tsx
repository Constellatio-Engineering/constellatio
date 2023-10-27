import { env } from "@/env.mjs";

import Head from "next/head";
import React, { type FunctionComponent } from "react";

type IProps =
{
  readonly pageTitle: string;
};

const PageHead: FunctionComponent<IProps> = ({ pageTitle }) =>
{
  const title = `${pageTitle} - ${env.NEXT_PUBLIC_APP_NAME}`;

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default PageHead;
