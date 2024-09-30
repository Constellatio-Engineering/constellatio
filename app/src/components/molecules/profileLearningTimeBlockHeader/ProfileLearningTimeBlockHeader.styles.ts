import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background: ${colooors["neutrals-01"][0]};
    border-radius: 12px;
    min-height: 300px;
    min-width: 100%;
    padding: 40px 32px 32px 28px;
    box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
`;
export const blockHead = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 26px;
`;
export const blockHeadText = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
`;
export const blockHeadDescription = (theme: MantineTheme) => css`
    color: ${colooors["neutrals-01"][7]};
`;
export const blockHeadTitle = css``;
export const blockHeadIcon = css`
    pointer-events:none;
`;
export const blockHeadCallToAction = css``;
export const casesCard = css`
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin: 24px 0;
`;
export const favoritesTab = css``;
export const uploadedMaterialsTab = css`
     display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin: 24px 0;
`;

export const streak = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  `;
