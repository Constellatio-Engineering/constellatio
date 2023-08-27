// eslint-disable-next-line import/no-unused-modules
import { type CSSObject, type MantineTheme } from "@mantine/core";

export type Nullable<T> = T | null | undefined;

export type MantineCssObjectStyles = (theme: MantineTheme) => CSSObject;

export type UnknownMantineStylesParams = Record<string, unknown>;
