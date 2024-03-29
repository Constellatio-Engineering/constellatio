import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  
  html [id], body [id] {
    scroll-margin: 50px;
  }
  
  body {
    position: relative;
  }
  
  a, button {
    cursor: pointer;
  }

  strong, span, i, b {
    color: inherit;
    font-size: inherit;
  }

  span {
    font-weight: inherit;
  }

  strong, b {
    font-weight: 700;
  }

  .mantine-Select-dropdown, .mantine-MultiSelect-dropdown {
  }
  
  .mantine-Notification-body {
    > div {
      font-size: 16px;
    }
  }
  
  @supports (font: -apple-system-body) and (-webkit-appearance: none) {
    img[loading="lazy"] {
      clip-path: inset(0.6px)
    }
  }
`;

// eslint-disable-next-line import/no-unused-modules
export const centerHorizontally = css`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
