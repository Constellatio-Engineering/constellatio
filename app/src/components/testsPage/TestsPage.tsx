import { BodyText } from "@/components/atoms/BodyText/BodyText";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./TestsPage.styles";
import ResetPasswordForm from "../resetPasswordForm/ResetPasswordForm";

const TestsPage: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <Title order={3}>Tests page to test unimplemented components</Title>
      <BodyText pb={24} styleType="body-02-medium">This page is used to test components that are not yet implemented. when adding components here make sure it doesn&apos;t contain any spacing or positioned absolute based on page because it will be used somewhere else</BodyText>
      <div css={styles.components}>
        <ResetPasswordForm/>
      </div>
    </div>
  );
};

export default TestsPage;
