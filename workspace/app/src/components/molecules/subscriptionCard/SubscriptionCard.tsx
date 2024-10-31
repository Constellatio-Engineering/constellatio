import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";

import { type FunctionComponent } from "react";

import * as styles from "./SubscriptionCard.styles";

const SubscriptionCard: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <div css={styles.discountBadge}>
      <CaptionText styleType="caption-01-bold" component="p">Dauerhaft 80 % Rabatt</CaptionText>
    </div>
    <div css={styles.price}>
      <SubtitleText styleType="subtitle-01-bold" css={styles.totalPrice} component="span">10 €</SubtitleText>
      <SubtitleText styleType="subtitle-01-bold" css={styles.undiscountedPrice} component="span">50 €</SubtitleText>
      <SubtitleText styleType="subtitle-01-medium" component="span">pro Monat</SubtitleText>
    </div>
  </div>
);
// disble unused modules because of card isn't utilized yet
// eslint-disable-next-line import/no-unused-modules
export default SubscriptionCard;
