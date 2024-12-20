import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./ProfileReferralExplanationSection.styles";

const ProfileReferralCodeSection: FunctionComponent = () =>
{
  return (
    <div css={styles.wrapper}>
      <Title order={3}>
        Empfehle uns weiter und verdiene bares Geld!
      </Title>
      <p css={styles.hinweis}>
        So einfach funktioniert&apos;s: Für <b>jeden Freund</b>, den du erfolgreich wirbst und der zahlender Nutzer wird, bekommst du <b>10 €</b>.
      </p>
      <p css={styles.hinweis}>
        Aber es wird noch besser: Sobald du 5 zahlende Freunde geworben hast, legen wir <b>einen Bonus von 50 €</b> obendrauf. 
        Das bedeutet, du kannst mit 5 Empfehlungen <b>insgesamt 100 €</b> verdienen (5 x 10 € + 50 € Bonus)!
      </p>
    </div>
  );
};

export default ProfileReferralCodeSection;
