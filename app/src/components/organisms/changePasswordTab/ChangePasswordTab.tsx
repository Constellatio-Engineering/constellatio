
import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";
import { passwordSchema } from "@/schemas/auth/registrationForm.schema";

import { Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";
import { z } from "zod";

import * as styles from "../profileDetailsTab/ProfileDetailsTab.styles";

const initialValues = {
  currentPassword: "",
  password: "",
  passwordConfirm: "",
};

const ChangePasswordTab: FunctionComponent = () => 
{
  const form = useForm({
    initialValues,
    validate: zodResolver(z
      .object({
        currentPassword: z.string(),
        password: passwordSchema,
        passwordConfirm: z.string(),
      })
      .refine(data => data.passwordConfirm === data.password, {
        message: "Die Passwörter stimmen nicht überein",
        path: ["passwordConfirm"]
      })),
    validateInputOnBlur: true,

  });
  const [err, setErr] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => 
  {
    e.preventDefault();
    
    if(Object.keys(form.errors).length > 0) 
    {
      setErr(true);
      setSuccess(false);
    }
    else 
    {
      setErr(false);
      setSuccess(true);
    }
  };
  return (
    <div css={styles.wrapper}>
      <Title order={3}>Change password</Title>
      {err && <AlertCard onClick={() => setErr(false)} variant="error">Sorry, we weren not able to change password. Please, try again</AlertCard>}
      {success && <AlertCard style={{ display: "flex", justifyContent: "flex-start" }} onClick={() => setSuccess(false)} variant="success">Your password has been changed</AlertCard>}
      <form onSubmit={handleSubmit}>
        <Input
          inputType="password"
          label="Current password"
          description="Just to make sure it is you and protect your account"
          error="Sorry, your password doesn't match our records"
        />
        <Input
          inputType="password" 
          label="New password"
          onVisibilityChange={toggle}
          {...form.getInputProps("password")}
        />
        <PasswordValidationSchema
          passwordValue={form.values.password}
          isPasswordRevealed={isPasswordRevealed}
        />
        <Input 
          {...form.getInputProps("passwordConfirm")}
          inputType="password" 
          label="Confirm password"
          error={form.errors.passwordConfirm}
        />
        <Button<"button"> type="submit" styleType="primary" size="large">Change password</Button>
      </form>
    </div>
  );
};

export default ChangePasswordTab;
