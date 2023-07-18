import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class CustomDocument extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="de">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
          <link
            href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;700&family=Libre+Baskerville:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
