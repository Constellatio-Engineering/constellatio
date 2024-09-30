import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = ({ isShowMenu }: {isShowMenu?: boolean}) => css`
  width: 400px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 12px;
  z-index: 3;
  overflow: hidden;
    transform: ${isShowMenu ? "translateY(0)" : "translateY(110%)"};
    span{
        cursor: pointer;
    }
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
`;
export const menuHeader = (theme: MantineTheme) => css`
  background-color: ${colooors["neutrals-02"][1]};
  padding: 16px 24px 24px 24px;
  color: ${colooors["neutrals-01"][0]};
  border-radius: 12px 12px 0 0;
  min-height: 100%;
  display:flex;
  justify-content:space-between;
    align-items:center;
`;
export const menuList = (theme: MantineTheme) => css`
background-color:${colooors["neutrals-01"][0]};
position:relative;
border-radius: 12px;
transform: translateY(-8px);
`;
