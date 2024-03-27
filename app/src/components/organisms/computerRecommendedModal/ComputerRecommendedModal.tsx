
import { getIsPathAppPath } from "@/utils/paths";

import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import { BodyText } from "../../atoms/BodyText/BodyText";
import { CustomLink } from "../../atoms/CustomLink/CustomLink";
import { Modal } from "../../molecules/Modal/Modal";

const ComputerRecommendedModal: FunctionComponent = () =>
{
  const { pathname } = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isOpened = isSmallScreen && getIsPathAppPath(pathname);

  return (
    <Modal
      ta="left"
      centered
      withCloseButton={false}
      size="md"
      closeOnClickOutside={false}
      overlayProps={{
        blur: 8,
      }}
      closeOnEscape={false}
      title="Bitte wechsle zu deinem Computer oder Tablet, um Constellatio zu nutzen."
      opened={isOpened}
      onClose={() => {}}>
      <BodyText
        component="p"
        styleType="body-01-regular">
        Hinweis: Diese Version von Constellatio ist momentan nur für die Verwendung am Computer optimiert. Wenn du technische Fragen hast, wende dich bitte an unseren Support
        unter{" "}
        <CustomLink
          styleType="link-primary"
          href="mailto:gutentag@constellatio.de"
          c="neutrals-01.7">
          gutentag@constellatio.de
        </CustomLink>
      </BodyText>
    </Modal>
  );
};

export default ComputerRecommendedModal;
