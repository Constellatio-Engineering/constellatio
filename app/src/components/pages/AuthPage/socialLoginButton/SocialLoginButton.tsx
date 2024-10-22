import GoogleIcon from "@/components/Icons/Google_G_logo.svg";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";

import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import * as styles from "./SocialLoginButton.styles";

export type SocialLoginButtonProps = {
  readonly backgroundColor?: string;
  readonly borderColor?: string;
  readonly color?: string;
  readonly icon: StaticImport;
  readonly iconSize?: number;
  readonly name: string;
  readonly onClick: () => void;
};

export const SocialLoginButton: FunctionComponent<SocialLoginButtonProps> = ({
  backgroundColor = "#ffffff",
  borderColor = "#e7e7e7",
  color = "#383838",
  icon,
  iconSize = 22,
  name,
  onClick
}) => 
{
  return (
    <UnstyledButton onClick={onClick} css={styles.socialLoginButton({ backgroundColor, borderColor, color })}>
      <Image
        priority={true}
        src={icon}
        alt={name + " Icon"}
        width={iconSize}
        height={iconSize}
      />
      <span>Mit {name} anmelden</span>
    </UnstyledButton>
  );
};
