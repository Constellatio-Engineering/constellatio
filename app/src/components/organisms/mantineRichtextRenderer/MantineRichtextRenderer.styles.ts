import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const contentWrapper = (theme: MantineTheme) => css`
  background: ${colooors["neutrals-01"][0]};
  padding: 30px 0;
  min-height: calc(100vh - 255px);
  > *:not(:not(:last-child) ~ *) {
    margin-top: 0 !important;
  }
  blockquote {
    *:last-child {
      margin-bottom: 0;
    }
  }
  ol, ul {
    margin-top: -.8rem !important;
  }
  li {
    margin-top: 0.3rem !important;
    > p {
      margin-bottom: 0;
    }
  }
`;
