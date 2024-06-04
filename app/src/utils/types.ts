/* eslint-disable @typescript-eslint/ban-types, import/no-unused-modules */

// import { Bookmark } from "@/db/schema";

import { type CSSObject, type MantineTheme } from "@mantine/core";
import { type TRPCClientErrorBase } from "@trpc/client";
import { type DefaultErrorShape } from "@trpc/server/unstable-core-do-not-import";
import { type ComponentType, type ReactNode } from "react";

export type Values<T> = T[keyof T];

export type Nullable<T> = T | null | undefined;

export type NullableProperties<T> = {
  [K in keyof T]: T[K] | null | undefined;
};

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {};

export type RemoveUndefined<T> = T extends undefined ? never : T;

export type RemoveSymbol<T> = T extends symbol ? never : T;

// export type DotSeparatedKeys<T, Prefix extends string = ""> = {
//   [K in keyof T]: T[K] extends object
//     ? T[K] extends unknown[]
//       ? T[K][0] extends Date
//         ? `${Prefix}${K & string}`
//         : `${Prefix}${K & string}.${Exclude<RemoveSymbol<keyof T[K][0]>, keyof unknown[]>}` | DotSeparatedKeys<T[K][0], `${Prefix}${K & string}.`>
//       : T[K] extends Date
//         ? `${Prefix}${K & string}`
//         : DotSeparatedKeys<T[K], `${Prefix}${K & string}.`>
//     : T[K] extends Date
//       ? `${Prefix}${K & string}`
//       : `${Prefix}${K & string}`;
// }[keyof T];

// export type DotSeparatedKeys<T, Prefix extends string = ""> = {
//   [K in keyof T]: T[K] extends Array<infer U>
//     ? U extends object
//       ? `${Prefix}${K & string}.${DotSeparatedKeys<U>}`
//       : `${Prefix}${K & string}`
//     : `${Prefix}${K & string}`;
// }[keyof T];

export type MantineCssObjectStyles = (theme: MantineTheme) => CSSObject;

export type UnknownMantineStylesParams = Record<string, unknown>;

export type ExtractProps<TComponentOrTProps> =
  TComponentOrTProps extends ComponentType<infer TProps>
    ? TProps
    : TComponentOrTProps;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type PartialUndefined<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | undefined : T[P];
};

export type TrpcClientErrorBase = TRPCClientErrorBase<DefaultErrorShape> | null;

export type UseQueryResult<T> = {
  error: TrpcClientErrorBase;
  isLoading: boolean;
} & T;

export type CommonKeysInTypes<T1, T2> = {
  [K in keyof T1 & keyof T2]: T1[K];
};

export type WithChildren<T> = T & {
  children: ReactNode | ReactNode[];
};

export type NonEmptyArray<T> = [T, ...T[]] | [...T[], T] | [T, ...T[], T];
