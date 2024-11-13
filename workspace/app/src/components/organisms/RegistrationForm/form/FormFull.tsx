import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import DisplayNameInput from "@/components/organisms/RegistrationForm/form/DisplayNameInput";
import EmailInput from "@/components/organisms/RegistrationForm/form/EmailInput";
import FirstNameInput from "@/components/organisms/RegistrationForm/form/FirstNameInput";
import GenderDropdown from "@/components/organisms/RegistrationForm/form/GenderDropdown";
import LastNameInput from "@/components/organisms/RegistrationForm/form/LastNameInput";
import PasswordInput from "@/components/organisms/RegistrationForm/form/PasswordInput";
import SemesterDropdown from "@/components/organisms/RegistrationForm/form/SemesterDropdown";
import UniversityDropdown from "@/components/organisms/RegistrationForm/form/UniversityDropdown";

import { env } from "@constellatio/env";
import { type RegistrationFormSchema } from "@constellatio/schemas/routers/auth/registrationForm.schema";
import { type UseFormReturnType } from "@mantine/form";
import { type FunctionComponent } from "react";

import * as styles from "../RegistrationForm.styles";

type Props = {
  readonly form: UseFormReturnType<RegistrationFormSchema>;
};

export const FormFull: FunctionComponent<Props> = ({ form }) =>
{
  return (
    <>
      <FirstNameInput {...form.getInputProps("firstName")}/>
      <LastNameInput {...form.getInputProps("lastName")}/>
      <DisplayNameInput {...form.getInputProps("displayName")}/>
      <EmailInput {...form.getInputProps("email")}/>
      <PasswordInput
        passwordInputProps={form.getInputProps("password")}
        confirmPassword={form.getInputProps("passwordConfirmation")}
        passwordToValidate={form.values.password}
      />
      <UniversityDropdown {...form.getInputProps("university")}/>
      <SemesterDropdown {...form.getInputProps("semester")}/>
      <GenderDropdown {...form.getInputProps("gender")}/>
      <Checkbox
        {...form.getInputProps("acceptTOS", { type: "checkbox" })}
        label={(
          <BodyText component="p" styleType="body-01-medium" css={styles.dataLinkWrapper}>
            Ich akzeptiere die&nbsp;
            <CustomLink styleType="link-primary" href="https://www.constellatio.de/agb" target="_blank">Allgemeinen Geschäftsbedingungen</CustomLink>
            {" "}und die&nbsp;
            <CustomLink styleType="link-primary" href="https://www.constellatio.de/datenschutzerklaerung" target="_blank">Datenschutzerklärung</CustomLink>.<br/>
            Mit der Erstellung des Kontos wird unmittelbar deine kostenlose {env.NEXT_PUBLIC_TRIAL_PERIOD_IN_DAYS}-tägige Testphase gestartet.
            Diese Testphase ist völlig risikofrei und endet automatisch.
          </BodyText>
        )}
        title="acceptTOS"
      />
    </>
  );
};
