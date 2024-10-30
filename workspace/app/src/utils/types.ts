/* eslint-disable @typescript-eslint/ban-types, import/no-unused-modules */

import { type CSSObject } from "@mantine/core";
import { type TRPCClientErrorBase } from "@trpc/client";
import { type DefaultErrorShape } from "@trpc/server/unstable-core-do-not-import";
import { type ReactNode } from "react";

export type MantineCssObjectStyles = () => CSSObject;

export type TrpcClientErrorBase = TRPCClientErrorBase<DefaultErrorShape> | null;

export type UseQueryResult<T> = {
  error: TrpcClientErrorBase;
  isLoading: boolean;
} & T;

export type WithChildren<T> = T & {
  children: ReactNode | ReactNode[];
};

export type UnknownMantineStylesParams = Record<string, unknown>;
