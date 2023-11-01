import React, { type FunctionComponent } from "react";

import { BodyText } from "../atoms/BodyText/BodyText";
import { CustomLink } from "../atoms/CustomLink/CustomLink";
import { Modal } from "../molecules/Modal/Modal";

interface IComputerRecommendedModalProps 
{
  readonly close: () => void;
  readonly opened: boolean;
}

const ComputerRecommendedModal: FunctionComponent<IComputerRecommendedModalProps> = ({ close, opened }) => (
  <Modal 
    ta="left" 
    centered 
    size="md" 
    title="Computer screen recommended!" 
    opened={opened} 
    onClose={close}>
    <BodyText
      component="p"
      styleType="body-02-medium"
      c="neutrals-01.7">
      Hinweis: Diese Version von Constellatio ist nur für die Verwendung am Computer optimiert. Wenn du technische Fragen hast, wende dich bitte an unseren Support 
      unter&nbsp;
      <CustomLink
        styleType="link-primary"
        href="mailto:webmaster@constellatio.de"
        c="neutrals-01.7">
        webmaster@constellatio.de
      </CustomLink>
    </BodyText>
    <BodyText styleType="body-01-regular" component="p">Bitte wechsle zu deinem Computer oder Tablet, um Constellatio zu nutzen.</BodyText>
  </Modal>
);

export default ComputerRecommendedModal;
