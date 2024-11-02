import { env } from "@constellatio/env";
import Head from "next/head";
import { type FunctionComponent } from "react";

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
