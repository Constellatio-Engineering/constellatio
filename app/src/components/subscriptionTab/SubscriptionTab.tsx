import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./SubscriptionTab.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import SubscriptionCard from "../subscriptionCard/SubscriptionCard";

const SubscriptionTab: FunctionComponent<{readonly subscriptionStatus?: string}> = ({ subscriptionStatus }) => 
{
  return (
    <div css={styles.wrapper}>
      <Title css={styles.subscriptionTabTitle} order={3}>Vertrag</Title>
      <BodyText m="32px 0" styleType="body-01-regular" component="p">{subscriptionStatus ?? "Manage your subscription by clicking the button below:"}</BodyText>
      <SubscriptionCard/>
      <Button<"button"> styleType="primary" style={{ display: "block", width: "100%" }}>Manage subscription</Button>
    </div>
  );
};

export default SubscriptionTab;
