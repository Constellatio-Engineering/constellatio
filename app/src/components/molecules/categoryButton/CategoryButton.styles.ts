import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  cursor: pointer;
  width: 100%;
  display: flex;
  padding: 16px 16px 16px 24px;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${colooors["neutrals-01"][3]};
  background-color: ${colooors["neutrals-01"][0]};
  transition: border-color 0.3s ease-in-out;
  color: ${colooors["neutrals-02"][1]};

  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    border-color: ${colooors["neutrals-01"][5]};
  }
`;
