import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import DisplayNameInput from "@/components/organisms/RegistrationForm/form/DisplayNameInput";
import EmailInput from "@/components/organisms/RegistrationForm/form/EmailInput";
import PasswordInput from "@/components/organisms/RegistrationForm/form/PasswordInput";

import { env } from "@constellatio/env";
import { type RegistrationFormMinimalSchema } from "@constellatio/schemas/routers/auth/registrationFormMinimal.schema";
import { type UseFormReturnType } from "@mantine/form";
import { type FunctionComponent } from "react";

import * as styles from "../RegistrationForm.styles";

type Props = {
  readonly form: UseFormReturnType<RegistrationFormMinimalSchema>;
};

export const FormMinimal: FunctionComponent<Props> = ({ form }) =>
{
  return (
    <>
      <DisplayNameInput {...form.getInputProps("displayName")}/>
      <EmailInput {...form.getInputProps("email")}/>
      <PasswordInput
        passwordInputProps={form.getInputProps("password")}
        confirmPassword={false}
        passwordToValidate={form.values.password}
      />
      <BodyText
        component="p"
        styleType="body-01-medium"
        css={styles.dataLinkWrapper}
        mt={10}
        sx={{ fontSize: 14 }}
        c="neutrals-01.7">
        Mit der Erstellung des Kontos akzeptierst du die&nbsp;
        <CustomLink styleType="link-primary" href="https://www.constellatio.de/agb" target="_blank">Allgemeinen Geschäftsbedingungen</CustomLink>
        {" "}und die&nbsp;
        <CustomLink styleType="link-primary" href="https://www.constellatio.de/datenschutzerklaerung" target="_blank">Datenschutzerklärung</CustomLink>.<br/>
        Es wird eine kostenlose {env.NEXT_PUBLIC_TRIAL_PERIOD_IN_DAYS}-tägige Testphase gestartet,
        die völlig risikofrei ist und automatisch endet.
      </BodyText>
    </>
  );
};
