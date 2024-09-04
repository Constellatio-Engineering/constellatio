import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: ${theme.colors["neutrals-01"][0]};
  width: fit-content;
  border-radius: 12px;
  padding: 9px 18px 18px 18px;
`;

export const streakWrapper = (theme: MantineTheme) => css`
  display: flex;
  flex-direction: row;
`;

export const feuerWrapper = (theme: MantineTheme) => css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 210px;
  padding-right: 12px;
`;

export const dayFireWrapper = (theme: MantineTheme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const streakNumberWrapper = (theme: MantineTheme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-left: 1px solid ${theme.colors["neutrals-01"][7]};
  padding-left: 12px;
`;

export const streakText = (theme: MantineTheme) => css`
  font-size: 28px;
`;

export const streakTextSub = (theme: MantineTheme) => css`
  font-size: 16px;
`;

export const dayTextGrey = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][5]};
`;

export const headerText = (theme: MantineTheme) => css`
  font-size: 18px;
  padding-bottom: 6px;
  font-weight: 700;
`;