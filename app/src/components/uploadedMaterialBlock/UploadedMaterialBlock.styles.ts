import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";


export const wrapper = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
`;
export const uploadedMaterialBlockHead = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][0]};
  span {
    color: ${theme.colors["neutrals-01"][7]};
  }
  padding: 24px;
  border-bottom: 1px solid ${theme.colors["neutrals-01"][2]};
`;

export const badge = css`
width: 100%;
height:300px;
position: relative;
input{
    position: absolute;
    top:0;
    left:0;
    opacity:0.0;
    width: 100%;
    height:300px;
}
`;

export const uploader = (theme: MantineTheme) => css`
padding: 24px;
`;

export const content = css`
padding: 24px;
`;
