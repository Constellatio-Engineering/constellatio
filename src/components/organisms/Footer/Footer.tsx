import { Flex, Group } from "@mantine/core";
import Image from "next/image";
import { FC } from "react";
import { SFooter } from "./Footer.style";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { Help } from "@/components/Icons/Help";
import { Heart } from "@/components/Icons/Heart";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import logo from "../../../../public/images/icons/constellatio-icon.svg";

type TFooter = {
  variant?: "default" | "simpleColoredBg" | "simpleWhiteBg";
};

export const Footer: FC<TFooter> = ({ variant = "default" }) => {
  console.log(logo);

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
              <Image src={logo} alt="Constellatio" />{" "}
              <CaptionText styleType="caption-01-medium" tt={"uppercase"} c={"neutrals-01.9"}>
                &copy; Constellatio 2023. All Rights Reserved.
              </CaptionText>
            </Group>
          </Group>
        </SFooter>
      ) : variant === "simpleColoredBg" ? (
        <SFooter variant={variant}>
          <Flex justify={"center"}>
            <Group spacing={"spacing-8"}>
              <Image src={logo} alt="Constellatio" />{" "}
              <CaptionText styleType="caption-01-medium" tt={"uppercase"} c={"neutrals-01.0"}>
                &copy; Constellatio 2023. All Rights Reserved.
              </CaptionText>
            </Group>
          </Flex>
        </SFooter>
      ) : (
        <SFooter variant={variant}>
          <Flex justify={"center"}>
            <Group spacing={"spacing-8"}>
              <Image src={"/images/icons/constellatio-icon.svg"} alt="Constellatio" width={20} height={20} />{" "}
              <CaptionText styleType="caption-01-medium" tt={"uppercase"} c={"neutrals-01.9"}>
                &copy; Constellatio 2023. All Rights Reserved.
              </CaptionText>
            </Group>
          </Flex>
        </SFooter>
      )}
    </>
  );
};
