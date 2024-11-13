import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";

import { env } from "@constellatio/env";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { type FunctionComponent, type MouseEvent } from "react";

import * as styles from "./SocialLoginButton.styles";

export type SocialLoginButtonProps = {
  readonly backgroundColor?: string;
  readonly borderColor?: string;
  readonly color?: string;
  readonly icon: StaticImport;
  readonly iconHeight?: number;
  readonly iconWidth?: number;
  readonly isDisabledInDevelopment?: boolean;
  readonly name: string;
  readonly onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const SocialLoginButton: FunctionComponent<SocialLoginButtonProps> = ({
  backgroundColor = "#ffffff",
  borderColor = "#e7e7e7",
  color = "#383838",
  icon,
  iconHeight = 22,
  iconWidth,
  isDisabledInDevelopment = false,
  name,
  onClick
}) => 
{
  return (
    <UnstyledButton
      onClick={(e) =>
      {
        if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "development" && isDisabledInDevelopment)
        {
          window.alert("This login provider is not available in development");
          return;
        }

        onClick(e);
      }}
      css={styles.socialLoginButton({ backgroundColor, borderColor, color })}>
      <Image
        priority={true}
        src={icon}
        alt={name + " Icon"}
        width={iconWidth}
        height={iconHeight}
      />
      <span>Mit {name} anmelden</span>
    </UnstyledButton>
  );
};
