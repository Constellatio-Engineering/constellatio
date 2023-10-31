import { env } from "@/env.mjs";

export const paths = {
  cases: "/cases",
  confirm: "/confirm",
  confirmEmailChange: "/confirm-email-change",
  dashboard: "/dashboard",
  dictionary: "/dictionary",
  downloadDocument: "/api/documents/download",
  login: "/login",
  paymentConfirm: "/paymentSuccess",
  personalSpace: "/personal-space",
  profile: "/profile",
  recover: "/recover",
  register: "/register",
  search: "/search",
} as const;

export type Path = typeof paths[keyof typeof paths];

export const getConfirmEmailUrl = (): string =>
{
  return env.NEXT_PUBLIC_WEBSITE_URL + paths.confirm;
};

export const getConfirmEmailChange = (): string =>
{
  return env.NEXT_PUBLIC_WEBSITE_URL + paths.confirmEmailChange;
};
