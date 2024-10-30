import { Button } from "@/components/atoms/Button/Button";

import { appPaths } from "@constellatio/shared/paths";
import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./PaymentConfirmPage.styles";

const PaymentConfirmPage: FunctionComponent = () => 
{
  const router = useRouter();
  return (
    <div css={styles.wrapper}>
      <Title order={2}>
        Das hat geklappt! Herzlich willkommen bei Constellatio!
      </Title>
      <Button<"button">
        styleType="primary"
        onClick={async () => router.push(`${appPaths.dashboard}`)}>
        Zur Constellatio Web-App
      </Button>
    </div>
  );
};

export default PaymentConfirmPage;
