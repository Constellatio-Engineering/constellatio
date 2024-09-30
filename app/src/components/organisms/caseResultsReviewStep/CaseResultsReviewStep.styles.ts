import { css } from "@emotion/react";
import { type SpoilerStylesNames, type SpoilerStylesParams } from "@mantine/core";
import { type Styles, type MantineTheme } from "@mantine/styles";

export const wrapper = css``;

export const content = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 24px;
  > div {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
`;

export const factsWrapper = (theme: MantineTheme) => css`
  min-width: 100%;
  margin-bottom: 24px;
  .mantine-Accordion-item {
    border-radius: 12px;
    background-color: ${colooors["neutrals-01"][0]};
    outline: 0;
    border: 0;
  }
  overflow: auto;
`;

export const solutionWrapper = (theme: MantineTheme) => css`
  background-color: ${colooors["neutrals-01"][0]};
  border-radius: 12px;
  width: 100%;
  transition: height 0.5s ease-in-out;

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

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    margin-bottom: 32px;
  }

  padding-bottom: 20px;
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

export const leftSideWrapper = css`
position: sticky;
top: 80px;
@media screen and (max-width: 1100px) {
  position: relative;
  top: 0px;

}
`;

type SpoilerStyles = Styles<SpoilerStylesNames, SpoilerStylesParams>;

export const spoilerStyles = ({ isExpandSolution }: { isExpandSolution: boolean }): SpoilerStyles =>
{
  const styles: SpoilerStyles = () => ({
    control: {
      bottom: 0,
      left: "20px",
      position: "absolute",
      zIndex: 3
    },
    root: {
      ":before": {
        background: !isExpandSolution
          ? "linear-gradient(360deg, #fff  64%, rgba(255, 255, 255, 0) 97%)"
          : "transparent",
        bottom: 0,
        content: "''",
        display: !isExpandSolution ? "block" : "none",
        height: "90px",
        position: "absolute",
        width: "100%",
        zIndex: 3,
      },
    }
  });

  return styles;
};
