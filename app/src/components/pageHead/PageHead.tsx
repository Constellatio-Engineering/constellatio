/* eslint-disable react/jsx-newline,react/jsx-max-props-per-line */
import Head from "next/head";
import { useRouter } from "next/router";
import React, { type FunctionComponent, type ReactElement } from "react";

type IProps =
{
  readonly additionalHtmlHeadTags?: ReactElement;
  readonly ogImage: string;
  readonly pageDescription: string;
  readonly pageTitle?: string;
  readonly websiteTitle: string;
  readonly websiteUrl: string;
};

const PageHead: FunctionComponent<IProps> = ({
  additionalHtmlHeadTags,
  ogImage,
  pageDescription,
  pageTitle,
  websiteTitle,
  websiteUrl
}) =>
{
  const router = useRouter();
  const { asPath } = router || "";
  const url = websiteUrl + asPath;
  const title = `${pageTitle} - ${websiteTitle}`;
  const ogImageUrlSplitUp = ogImage.split(".");
  const ogImageFileExtension = ogImageUrlSplitUp[ogImageUrlSplitUp.length - 1];

  if(ogImageFileExtension !== "jpg")
  {
    throw Error("Favicon file extension ist not '.jpg'");
  }

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8"/>
      <meta name="description" content={pageDescription}/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=10.0"/>
      <meta name="author" content="Dualmeta"/>
      <meta name="robots" content="index, follow"/>
      <meta name="theme-color" content="#191c29"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1"/>
      <link rel="manifest" href="/site.webmanifest?v=1"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#3b4354"/>
      <link rel="shortcut icon" href="/favicon.ico?v=1"/>
      <meta name="apple-mobile-web-app-title" content={t("seo.websiteTitle")}/>
      <meta name="application-name" content={t("seo.websiteTitle")}/>
      <meta name="msapplication-TileColor" content="#333a48"/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={pageDescription}/>
      <meta property="og:image" content={ogImage}/>
      <meta property="og:image:type" content="image/jpeg"/>
      <meta property="og:url" content={url}/>
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content="de_DE"/>
      <meta itemProp="name" content={title}/>
      <meta itemProp="description" content={pageDescription}/>
      <meta itemProp="image" content={ogImage}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={pageDescription}/>
      <meta name="twitter:image" content={ogImage}/>
      {additionalHtmlHeadTags}
    </Head>
  );
};

export default PageHead;
