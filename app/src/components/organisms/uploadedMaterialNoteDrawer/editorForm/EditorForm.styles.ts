import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

// import { Karla } from "next/font/google";

export const form = css`
  height: calc(100vh - 148px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MaterialNoteRichText = css`
  margin: 24px 32px;
`;
export const MaterialNotesCallToAction = () => css`
  position: sticky;
  bottom: 0px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 12px;
  background: ${colooors["neutrals-01"][0]};
  border-top: 1px solid ${colooors["neutrals-01"][3]};

  button {
    flex: 1;
  }
`;
export const wrapper = css``;
export const existingNote = () => css`
  padding: 24px 32px;
  background-color: ${colooors["neutrals-01"][0]};
  min-height: 78vh;

  .deleteNoteBlock {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    place-items: center;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom,
    ${colooors["neutrals-01"][0]} 20%,
    rgba(255, 255, 255, 0.5) 100%);

    button {
      margin-right: 8px;
    }
  }
`;
export const existingNoteActions = () => css`
  background: ${colooors["neutrals-01"][0]};
  margin-bottom: 24px;

  button {
    margin-right: 8px;
  }

  svg {
    margin-right: 8px;
  }
`;
export const richtext = () => css`
  blockquote {
    padding: 20px;
    background: ${colooors["neutrals-01"][1]};
    border: 1px solid ${colooors["neutrals-01"][3]};
    border-radius: 12px;
    margin: 24px 0;

    &::before {
      background-image: url("/images/icons/quote-icon.svg");
      background-repeat: no-repeat;
      content: "";
      display: block;
      height: 20px;
      width: 20px;
    }
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;

    li {
      /* font-family: Karla; */
    }
  }
`;
