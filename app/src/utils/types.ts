// eslint-disable-next-line import/no-unused-modules
import { type CSSObject, type MantineTheme } from "@mantine/core";
import { type ComponentType } from "react";

export type Nullable<T> = T | null | undefined;

export type MantineCssObjectStyles = (theme: MantineTheme) => CSSObject;

export type UnknownMantineStylesParams = Record<string, unknown>;

export type ExtractProps<TComponentOrTProps> =
  TComponentOrTProps extends ComponentType<infer TProps>
    ? TProps
    : TComponentOrTProps;

// export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type PartialUndefined<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | undefined : T[P];
};
