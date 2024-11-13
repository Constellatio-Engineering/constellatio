import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { type ReactElement } from "react";

const getInitialProps = createGetInitialProps();

export default class CustomDocument extends Document 
{
  public static getInitialProps = getInitialProps;

  public render(): ReactElement
  {
    return (
      <Html lang="de">
        <Head/>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}
