import { type SocialLoginButtonProps } from "@/components/pages/AuthPage/socialLoginButton/SocialLoginButton";

import { css } from "@emotion/react";

export const socialLoginButton = ({
  backgroundColor,
  borderColor,
  color
}: Pick<SocialLoginButtonProps, "backgroundColor" | "color" | "borderColor">) => css`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  color: ${color};
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  background-color: ${backgroundColor};
  border-color: ${borderColor ?? backgroundColor};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  width: 100%;
  font-weight: 600;
  transition: all .15s ease-in-out;
  :hover {
    transform: scale(1.01);
    opacity: .8;
  }
`;
