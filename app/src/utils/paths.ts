import { env } from "@/env.mjs";

export const paths = {
  cases: "/cases",
  confirm: "/confirm",
  dictionary: "/dictionary",
  login: "/login",
  personalSpace: "/personal-space",
  profile: "/profile",
  recover: "/recover",
  register: "/register",
};

export const getConfirmEmailUrl = (): string =>
{
  return env.NEXT_PUBLIC_FRONTEND_URL + paths.confirm;
};
