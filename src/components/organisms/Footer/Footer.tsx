import { Flex, Group, Text, FooterProps } from "@mantine/core";
import Image from "next/image";
import { FC } from "react";
import { SFooter } from "./Footer.style";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { Help } from "@/components/Icons/Help";
import { Heart } from "@/components/Icons/Heart";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import ConstellatioLogoIcon from "../../../../public/images/icons/constellatio-icon.svg";
import ConstellatioLogoWhiteIcon from "../../../../public/images/icons/logo-symbol-white.svg";

type TFooter = {
  variant?: "default" | "simpleColoredBg" | "simpleWhiteBg";
};

export const Footer: FC<TFooter> = ({ variant = "default" }) => {
  return (
    <>
      {variant === "default" ? (
        <SFooter variant={variant}>
          <Group position="apart">
            <Group spacing={"spacing-16"}>
              <LinkButton icon={<Help />} title={"Need help?"} size="big" />
              <LinkButton icon={<Heart />} title={"Support us"} size="big" />
            </Group>
            <Group spacing={"spacing-8"}>
              <Image src={ConstellatioLogoIcon} alt="Constellatio" />{" "}
              <CaptionText component="p" styleType="caption-01-medium" tt={"uppercase"} c={"neutrals-01.9"}>
                &copy; Constellatio 2023. All Rights Reserved.
              </CaptionText>
            </Group>
          </Group>
        </SFooter>
      ) : variant === "simpleColoredBg" ? (
        <SFooter variant={variant}>
          <Flex justify={"center"}>
            <Group spacing={"spacing-8"}>
            <Image src={ConstellatioLogoWhiteIcon} alt="Constellatio" />{" "}
              <CaptionText component="p" styleType="caption-01-medium" tt={"uppercase"} c={"neutrals-01.0"}>
                &copy; Constellatio 2023. All Rights Reserved.
              </CaptionText>
            </Group>
          </Flex>
        </SFooter>
      ) : (
        <SFooter variant={variant}>
          <Flex justify={"center"}>
            <Group spacing={"spacing-8"}>
            <Image src={ConstellatioLogoIcon} alt="Constellatio" />{" "}
              <CaptionText component="p" styleType="caption-01-medium" tt={"uppercase"} c={"neutrals-01.9"}>
                &copy; Constellatio 2023. All Rights Reserved.
              </CaptionText>
            </Group>
          </Flex>
        </SFooter>
      )}
    </>
  );
};
