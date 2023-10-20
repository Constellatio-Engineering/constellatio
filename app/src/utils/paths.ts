import { env } from "@/env.mjs";

export const paths = {
  cases: "/cases?category=civil-law",
  confirm: "/confirm",
  dashboard: "/dashboard",
  dictionary: "/dictionary?category=civil-law",
  downloadDocument: "/api/documents/download",
  login: "/login",
  personalSpace: "/personal-space",
  profile: "/profile",
  recover: "/recover",
  register: "/register",
  search: "/search"
};

export const queryParams = {
  passwordResetSuccess: "passwordResetSuccess",
};

export const getConfirmEmailUrl = (): string =>
{
  return env.NEXT_PUBLIC_WEBSITE_URL + paths.confirm;
};
