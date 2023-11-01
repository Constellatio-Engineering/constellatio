import React, { type FunctionComponent } from "react";

import * as styles from "./ComputerRecommendedModal.styles";
import { Modal } from "../molecules/Modal/Modal";
import { BodyText } from "../atoms/BodyText/BodyText";
import { CustomLink } from "../atoms/CustomLink/CustomLink";

interface IComputerRecommendedModalProps {
  opened: boolean;
  close: () => void;
}

const ComputerRecommendedModal: FunctionComponent<IComputerRecommendedModalProps> = ({close,opened}) => (
  <Modal ta="center" centered size={"sm"} title="Computer screen recommended" opened={opened} onClose={close}>
 <BodyText
        component="p"
        styleType="body-02-medium"
        c="neutrals-01.7">
        Hinweis: Diese Version von Constellatio ist nur für die Verwendung am Computer optimiert.
        Wenn du technische Fragen hast, wende dich bitte an unseren
        Support unter&nbsp;
        <CustomLink
          href="mailto:webmaster@constellatio.de"
          styleType="link-secondary"
          c="neutrals-01.7">
          webmaster@constellatio.de
        </CustomLink>
      </BodyText>
  </Modal>
);

export default ComputerRecommendedModal;
