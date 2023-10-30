import { env } from "@/env.mjs";

export const paths = {
  cases: "/cases",
  confirm: "/confirm",
  confirmEmailChange: "/confirm-email-change",
  dashboard: "/dashboard",
  dictionary: "/dictionary",
  downloadDocument: "/api/documents/download",
  login: "/login",
  personalSpace: "/personal-space",
  profile: "/profile",
  recover: "/recover",
  register: "/register",
  search: "/search"
};

export const getConfirmEmailUrl = (): string =>
{
  return env.NEXT_PUBLIC_WEBSITE_URL + paths.confirm;
};

export const getConfirmEmailChange = (): string =>
{
  return env.NEXT_PUBLIC_WEBSITE_URL + paths.confirmEmailChange;
};
