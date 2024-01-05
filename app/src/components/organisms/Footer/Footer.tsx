import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";

import { Flex, Group } from "@mantine/core";
import Image from "next/image";
import { type FC } from "react";

import { SFooter } from "./Footer.style";
import ConstellatioLogoIcon from "../../../../public/images/icons/constellatio-icon.svg";
import ConstellatioLogoWhiteIcon from "../../../../public/images/icons/logo-symbol-white.svg";

export interface FooterProps
{
  readonly variant?: "default" | "simpleColoredBg" | "simpleWhiteBg";
}

export const Footer: FC<FooterProps> = ({ variant = "default" }) =>
{
  return (
    <>
      {variant === "default" ? (
        <SFooter variant={variant}>
          <Group position="apart">
            <span/>
            <Group spacing="spacing-8">
              <Image src={ConstellatioLogoIcon} alt="Constellatio"/>{" "}
              <CaptionText
                component="p"
                styleType="caption-01-medium"
                tt="uppercase"
                c="neutrals-01.9">
                &reg; Constellatio 2024
              </CaptionText>
            </Group>
          </Group>
        </SFooter>
      ) : variant === "simpleColoredBg" ? (
        <SFooter variant={variant}>
          <Flex justify="center">
            <Group spacing="spacing-8">
              <Image src={ConstellatioLogoWhiteIcon} alt="Constellatio"/>{" "}
              <CaptionText
                component="p"
                styleType="caption-01-medium"
                tt="uppercase"
                c="neutrals-01.0">
                &reg; Constellatio 2024
              </CaptionText>
            </Group>
          </Flex>
        </SFooter>
      ) : (
        <SFooter variant={variant}>
          <Flex justify="center">
            <Group spacing="spacing-8">
              <Image src={ConstellatioLogoIcon} alt="Constellatio"/>{" "}
              <CaptionText
                component="p"
                styleType="caption-01-medium"
                tt="uppercase"
                c="neutrals-01.9">
                &reg; Constellatio 2024
              </CaptionText>
            </Group>
          </Flex>
        </SFooter>
      )}
    </>
  );
};
