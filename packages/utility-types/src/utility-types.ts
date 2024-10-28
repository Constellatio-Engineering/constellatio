/* eslint-disable @typescript-eslint/ban-types, import/no-unused-modules */

export type Values<T extends object> = T[keyof T];

export type Nullable<T> = T | null | undefined;

export type NullableProperties<T> = {
  [K in keyof T]: T[K] | null | undefined;
};

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {};

export type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;

export type RemoveUndefined<T> = T extends undefined ? never : T;

export type RemoveNull<T> = T extends null ? never : T;

export type RemoveSymbol<T> = T extends symbol ? never : T;

export type DotSeparatedKeys<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends unknown[]
      ? T[K][0] extends Date
        ? `${Prefix}${K & string}`
        : `${Prefix}${K & string}.${Exclude<RemoveSymbol<keyof T[K][0]>, keyof unknown[]>}` | DotSeparatedKeys<T[K][0], `${Prefix}${K & string}.`>
      : T[K] extends Date
        ? `${Prefix}${K & string}`
        : DotSeparatedKeys<T[K], `${Prefix}${K & string}.`>
    : T[K] extends Date
      ? `${Prefix}${K & string}`
      : `${Prefix}${K & string}`;
}[keyof T];

export type UnknownMantineStylesParams = Record<string, unknown>;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type PartialUndefined<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | undefined : T[P];
};

export type CommonKeysInTypes<T1, T2> = {
  [K in keyof T1 & keyof T2]: T1[K];
};

export type NonEmptyArray<T> = [T, ...T[]] | [...T[], T] | [T, ...T[], T];

export type Primitive = string | number | boolean;
