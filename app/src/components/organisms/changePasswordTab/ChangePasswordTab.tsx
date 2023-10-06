import React, { type FunctionComponent } from "react";

import * as styles from "../profileDetailsTab/ProfileDetailsTab.styles";
import { Input, TextInput, Title } from "@mantine/core";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { useForm } from "@mantine/form";
import { Button } from "../../atoms/Button/Button";

interface ChangePasswordTabProps
{

}

const ChangePasswordTab: FunctionComponent<ChangePasswordTabProps> = ({  }) => {
  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword:"",
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form.values);
  }
  return (
    <div css={styles.wrapper}>
      <Title order={3}>Change password</Title>
      <form onSubmit={handleSubmit}>
      <Input.Wrapper label={<BodyText styleType={"body-01-regular"}>Current password</BodyText>} description="" error="" >
          <TextInput placeholder="" type="text" {...form.getInputProps('currentPassword')}/>
        </Input.Wrapper>
        <Input.Wrapper label={<BodyText styleType={"body-01-regular"}>New password</BodyText>} description="" error="">
          <TextInput placeholder="" type="text" {...form.getInputProps('newPassword')}/>
        </Input.Wrapper>
        <Input.Wrapper label={<BodyText styleType={"body-01-regular"}>Confirm password</BodyText>} description="" error="">
          <TextInput placeholder="" type="text" {...form.getInputProps('confirmPassword')}/>
          <Button<"button"> type="submit" styleType="primary">Change password</Button>
        </Input.Wrapper>
      </form>
    </div>
  );
};

export default ChangePasswordTab;
