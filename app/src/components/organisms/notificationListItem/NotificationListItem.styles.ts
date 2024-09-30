import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const notificationWrapper = css`
  border: solid 1px ${colooors["neutrals-01"][3]};
  background-color: white;
  padding: 20px 27px;
  border-radius: 8px;
  color: inherit;
  position: relative;
  overflow: hidden;
`;

export const wrapperUnread = css`
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
`;

export const unreadLeftBar = css`
  width: 6px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${colooors["brand-01"][4]};
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

export const userIconAndTitle = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const title = css`
  font-size: 18px;
  font-weight: 600;
`;

export const dateAndMarkReadWrapper = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const date = css`
  color: ${colooors["neutrals-01"][7]};
  font-size: 14px;
`;

export const markRead = css`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  border: solid 1px ${colooors["neutrals-01"][4]};
  transition: background-color 0.1s, transform 0.1s;

  svg {
    transition: fill 0.1s;;
    fill: #333333;
  }
  
  :hover, :active {
    transform: scale(1.05);
    background-color: ${colooors["neutrals-01"][1]};
    
    svg {
      fill: #000000;
    }
  }
`;
