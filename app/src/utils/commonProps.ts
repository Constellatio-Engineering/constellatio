import { type SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type GetCommonPropsParams = {
  locale: string;
};

type GetCommonPropsResult = SSRConfig;

type GetCommonProps = (params: GetCommonPropsParams) => Promise<GetCommonPropsResult>;

export const getCommonProps: GetCommonProps = async ({ locale }) =>
{
  const serverSideTranslationsConfig = await serverSideTranslations(locale);

  return ({
    ...serverSideTranslationsConfig
  });
};
