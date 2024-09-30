import { colooors } from "@/constants/styles/colors";
import { type MantineCssObjectStyles } from "@/utils/types";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const popoverDropdownStyles = () => 
{
  const styles: MantineCssObjectStyles = (theme) => ({
    backgroundColor: colooors["neutrals-02"][1],
    border: "none",
    borderRadius: "12px 12px 14px 14px",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.16)",
    display: "flex",
    flexDirection: "column",
    padding: 0,
  }); 

  return styles;
};

export const stepHeader = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 24px;
`;

export const countLabel = (theme: MantineTheme) => css`
	> div {
		background-color: ${colooors["neutrals-02"][2]};
	}
`;

export const stepBody = (theme: MantineTheme) => css`
	background-color: ${colooors["neutrals-01"][0]};
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  border-radius: 12px;
  gap: 20px;
`;

export const itemsContainer = css`
display: flex;
flex-direction: column;
`;

export const stepItem = (theme: MantineTheme) => css`
display: flex;
padding: 20px 24px;
gap: 12px;
border-bottom: 1px solid ${colooors["neutrals-01"][3]};
`;

export const iconBox = (theme: MantineTheme) => css`
width: 40px;
min-width: 40px;
height: 40px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
border: 1px solid ${colooors["neutrals-01"][3]};
`;

export const itemContent = css`
display: flex;
flex-direction: column;
gap: 2px;
`;

export const buttonsWrapper = css`
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 8px;
`;
