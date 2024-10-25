import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Input } from "@/components/atoms/Input/Input";
import ErrorCard from "@/components/molecules/errorCard/ErrorCard";
import PasswordInput from "@/components/organisms/RegistrationForm/form/PasswordInput";
import useUserDetails from "@/hooks/useUserDetails";
import { supabase } from "@/lib/supabase";
import { type UpdatePasswordSchema, updatePasswordSchema, type UpdatePasswordValues } from "@/schemas/auth/updatePassword.schema";

import { Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import React, { type FunctionComponent, useEffect } from "react";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import * as styles from "../profileDetailsTab/ProfileDetailsTab.styles";

type Props = {
  readonly isDisabled: boolean;
};

const ChangePasswordTab: FunctionComponent<Props> = ({ isDisabled }) =>
{
  const { t } = useTranslation();
  const user = useUser();
  const { userDetails } = useUserDetails();

  const initialValues: UpdatePasswordSchema = {
    currentPassword: "",
    email: user?.email || "",
    newPassword: "",
    newPasswordConfirm: "",
  };

  const form = useForm<UpdatePasswordSchema>({
    initialValues,
    validate: zodResolver(updatePasswordSchema),
    validateInputOnBlur: true,
  });

  useEffect(() =>
  {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  const {
    error,
    isPending: isLoading,
    isSuccess,
    mutate: changePassword,
  } = useMutation({
    mutationFn: async (formValues: UpdatePasswordValues) =>
    {
      if(userDetails?.authProvider !== "email")
      {
        return;
      }

      // get current session so the user does not get logged out after failed password change with invalid current password
      const { data, error: getCurrentSessionError } = await supabase.auth.getSession();

      if(getCurrentSessionError)
      {
        throw getCurrentSessionError;
      }

      if(!data?.session)
      {
        throw new Error("Could not get current session");
      }

      const loginResult = await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.currentPassword,
      });

      if(loginResult.error)
      {
        await supabase.auth.setSession({
          access_token: data.session?.access_token,
          refresh_token: data.session?.refresh_token,
        });

        throw loginResult.error;
      }

      const changePasswordResult = await supabase.auth.updateUser({ password: formValues.newPassword });

      if(changePasswordResult.error)
      {
        throw changePasswordResult.error;
      }

      form.setValues(initialValues);
    },
    onError: (error) =>
    {
      console.error("error occurred while changing password", error);
    },
  });

  const handleSubmit = form.onSubmit(formValues => changePassword(formValues as UpdatePasswordValues));

  return (
    <div css={styles.wrapper}>
      <Title css={styles.changePasswordTitle} order={3}>Passwort ändern</Title>
      {isDisabled && (
        <AlertCard variant="warning" shouldUseFullWidth={true} mb={30}>
          Du kannst dein Passwort nicht ändern, da du dich mit einem externen Anbieter angemeldet hast.
          Solltest du dein Konto auf einen Login mit E-Mail-Adresse und Passwort umstellen wollen, melde dich bitte bei unserem Support.
        </AlertCard>
      )}
      <ErrorCard
        error={error}
        marginBottom={0}
        overwriteErrorMessages={{
          invalidCredentials: "Sorry, das eingegebene Passwort stimmt nicht mit unserer Datenbank überein.",
          unknownError: "Entschuldigung, wir konnten das Passwort nicht ändern. Bitte versuche es später erneut.",
        }}
      />
      <div css={isDisabled && styles.contentDisabled}>
        {isSuccess && (
          <AlertCard style={{ display: "flex", justifyContent: "flex-start" }} variant="success">
            Dein Passwort wurde erfolgreich geändert
          </AlertCard>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            {...form.getInputProps("currentPassword")}
            inputType="password"
            label="Aktuelles Passwort"
            description="Um dein Konto zu schützen, möchten wir sicher gehen, dass du es bist."
          />
          <PasswordInput
            passwordInputProps={form.getInputProps("newPassword")}
            passwordLabelOverride="Neues Passwort"
            passwordConfirmLabelOverride="Neues Passwort erneut eingeben"
            confirmPassword={form.getInputProps("newPasswordConfirm")}
            passwordToValidate={form.values.newPassword}
          />
          <Button<"button">
            type="submit"
            loading={isLoading}
            styleType="primary"
            disabled={!form.isDirty() || isLoading}
            size="large">
            Passwort ändern
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordTab;
