import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css``;

export const content = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  /* outline: 1px solid red; */
  width: 100%;
  gap: 24px;
  > div {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const factsWrapper = (theme: MantineTheme) => css`
  min-width: 100%;
  margin-bottom: 24px;
  .mantine-Accordion-item {
    border-radius: 12px;
    background-color: ${theme.colors["neutrals-01"][0]};
    outline: 0;
    border: 0;
  }
  outline: 1px solid red;
`;

const CSSshowSolutionCard = css`
  height: 100%;
  max-height: 100%;
  overflow: visible;
`;

export const solutionWrapper = ({ isExpandSolution, theme }: {
  isExpandSolution?: boolean;
  theme: MantineTheme;
}) => css`
  outline: 1px solid red;
  background-color: ${theme.colors["neutrals-01"][0]};
  border-radius: 12px;
  width: 100%;
  height: 100%;
  max-height: 350px;
  overflow: hidden;
  ${isExpandSolution && CSSshowSolutionCard};
  transition: height 0.5s ease-in-out;
  position: relative;
  .solution-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
  }
  .solution-content {
    padding: 20px;
    position: relative;
    z-index: 2;

    font-family: Karla;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
  .show-all {
    z-index: 3;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    align-items: center;
    background: linear-gradient(
      to bottom,
      ${theme.colors["transparency-03"][0]} 0%,
      ${theme.colors["neutrals-01"][0]} 25%
    );
    button {
      transform: translateY(10px);
      border: 1px solid ${theme.colors["neutrals-01"][3]};
    }
  }
  padding-bottom: 80px;
`;

export const resolutionWrapper = css`
  width: 50%;
  padding: 0 20px;
  .resolution-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
    .icons-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
  }
`;
