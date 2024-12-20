/* eslint-disable import/no-unused-modules */
import { env } from "@constellatio/env";
import { type Values } from "@constellatio/utility-types";

export const appPaths = {
  admin: "/admin",
  cases: "/cases",
  dashboard: "/dashboard",
  dictionary: "/dictionary",
  forum: "/forum",
  learningPaths: "/learning-paths",
  notifications: "/notifications",
  personalSpace: "/personal-space",
  profile: "/profile",
  search: "/search",
} as const;

export type AppPath = Values<typeof appPaths>;

export const appPathsArray = Object.values(appPaths);
export const getIsPathAppPath = (path: string): boolean => appPathsArray.some((appPath) => path.startsWith(appPath));

export const authPaths = {
  confirm: "/confirm",
  confirmEmailChange: "/confirm-email-change",
  login: "/login",
  paymentConfirm: "/payment-success",
  recover: "/recover",
  register: "/register",
} as const;

export const authPathsArray = Object.values(authPaths);
export const isPathAuthPath = (path: string): boolean => authPathsArray.some((authPath) => path.startsWith(authPath));

export const apiPaths = {
  downloadDocument: "/api/documents/download",
} as const;

export const apiPathsArray = Object.values(apiPaths);
export const isPathApiPath = (path: string): boolean => apiPathsArray.some((apiPath) => path.startsWith(apiPath));

/* const paths = {
  ...appPaths,
  ...authPaths,
  ...apiPaths,
} as const;*/

/* export type AppPath = typeof appPaths[keyof typeof appPaths];
export type AuthPath = typeof authPaths[keyof typeof authPaths];
export type ApiPath = typeof apiPaths[keyof typeof apiPaths];
export type Path = typeof paths[keyof typeof paths];*/

export const getConfirmEmailUrl = (): string =>
{
  return env.NEXT_PUBLIC_WEBSITE_URL + authPaths.confirm;
};

export const getConfirmEmailChange = (): string =>
{
  return env.NEXT_PUBLIC_WEBSITE_URL + authPaths.confirmEmailChange;
};

export const getForumQuestionUrl = (question: { id: string }): string =>
{
  return `${appPaths.forum}/${question.id}`;
};
