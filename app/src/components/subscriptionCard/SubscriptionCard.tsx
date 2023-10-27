import React, { type FunctionComponent } from "react";

import * as styles from "./SubscriptionCard.styles";
import { CaptionText } from "../atoms/CaptionText/CaptionText";
import { SubtitleText } from "../atoms/SubtitleText/SubtitleText";

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

export default SubscriptionCard;
