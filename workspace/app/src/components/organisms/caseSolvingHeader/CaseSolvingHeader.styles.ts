import { colooors } from "@/constants/styles/colors";

import { css, type SerializedStyles } from "@emotion/react";

export const wrapper = ({ variant }: {
  variant: "case" | "dictionary";
}): SerializedStyles => css`
  position: relative;
  background: ${variant === "case"
    ? colooors["cc-cases"][2]
    : colooors["cc-dictionary"][2]};

  #overlay-lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    z-index: 2;
    color: ${variant === "case"
    ? colooors["cc-cases"][2]
    : colooors["cc-dictionary"][2]};
  }
`;

export const body = css`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  min-width: 100%;
  padding: 70px 0px;
  @media (max-width: 1100px) {
    padding: 60px 0;
    justify-content: center;
    text-align: center;
    gap: 32px;
  }
`;

export const bodyArticles = css`
  padding-bottom: 120px;
`;

export const bodyText = (): SerializedStyles => css`
  width: 48%;

  h1 {
    word-break: break-word;
    hyphens: auto;
    line-height: 1.2;
    white-space: wrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  
  .icons-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .bread-crumb {
    margin: 32px 0 8px 0;

    a {
      color: ${colooors["transparency-01"][5]};
      text-transform: uppercase;
    }
  }

  .title {
    color: ${colooors["transparency-02"][1]};
  }

  @media (max-width: 1100px) {
    h1 {
      -webkit-line-clamp: none;
    }
    width: 100%;
    .icons-bar {
      justify-content: center;
    }
  }
`;

export const bodyCard = css`
  width: 45%;
  min-width: 350px;
  max-width: 536px;
  position: relative;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

export const navButtonsWrapper = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 25px;
  left: 0;
  z-index: 3;
`;

export const navButton = css`
  color: #3b3b3b;
  border-radius: 8px;
  border: solid 1px rgba(0, 0, 0, 0.10);
  background-color: rgba(255, 255, 255, 0.03);
  &:hover, &:focus, &:active {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const navButtonDisabled = css`
  background-color: rgba(255, 255, 255, 0.03) !important;
`;

export const backToLearningPathButton = css`
  background-color: #ffffff;
  :hover, :focus, :active {
    background-color: #F6F6F5;
  }
`;

export const stepsBar = (): SerializedStyles => css`
  position: relative;
  z-index: 2;
  background-color: ${colooors["neutrals-01"][0]};
  padding: 16px 32px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;

  .steps {
    display: flex;
    gap: 8px;
    justify-content: flex-start;
    align-items: center;

    .step {
      outline: 1px solid red;
      display: flex;
      gap: 8px;
      justify-content: flex-start;
      align-items: center;

      span {
        background-color: ${colooors["support-notice"][5]};
        color: ${colooors["neutrals-01"][0]};
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        border-radius: 50%;
      }
    }
  }
`;
