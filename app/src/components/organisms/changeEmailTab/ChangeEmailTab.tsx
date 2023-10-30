import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Input } from "@/components/atoms/Input/Input";
import ErrorCard from "@/components/errorCard/ErrorCard";
import { supabase } from "@/lib/supabase";
import { type UpdateEmailSchema, updateEmailSchema } from "@/schemas/auth/updateEmail.schema";
import { type UserFiltered } from "@/utils/filters";
import { getConfirmEmailChange } from "@/utils/paths";

import { Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import React, { type FunctionComponent, useEffect } from "react";
import z from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import * as styles from "../profileDetailsTab/ProfileDetailsTab.styles";

type Props = {
  readonly userDetails: UserFiltered;
};

const initialValues: UpdateEmailSchema = {
  newEmail: "",
};

const ChangeEmailTab: FunctionComponent<Props> = ({ userDetails }) =>
{
  const { t } = useTranslation();
  const isTabletScreen = useMediaQuery("(max-width: 1100px)");

  const form = useForm<UpdateEmailSchema>({
    initialValues,
    validate: zodResolver(updateEmailSchema),
    validateInputOnBlur: true,
  });

  useEffect(() =>
  {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  const {
    error,
    isLoading,
    isSuccess,
    mutate: updateEmail,
  } = useMutation({
    mutationFn: async (formValues: UpdateEmailSchema) =>
    {
      const changeEmailResult = await supabase.auth.updateUser({ email: formValues.newEmail }, {
        emailRedirectTo: getConfirmEmailChange(),
      });

      if(changeEmailResult.error)
      {
        console.log(changeEmailResult.error);
        throw changeEmailResult.error;
      }

      form.setValues(initialValues);
    },
    onError: (error) =>
    {
      console.error("error occurred while changing password", error);
    },
  });

  const handleSubmit = form.onSubmit(formValues => updateEmail(formValues));

  return (
    <div css={styles.wrapper}>
      {!isTabletScreen && <Title order={3}>E-Mail Adresse ändern</Title>}
      <p style={{ fontSize: 17 }}>Deine aktuelle E-Mail Adresse: <strong>{userDetails?.email}</strong></p>
      <div
        style={{
          backgroundColor: "#e3e3e3", height: 1, margin: "30px 0 30px", width: "100%"
        }}
      />
      {isSuccess && (
        <AlertCard style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }} variant="success">
          <p>Wir haben dir eine E-Mail mit einem Bestätigungslink an deine <strong>alte E-Mail Adresse</strong> geschickt.</p>
          <p style={{ marginTop: 8 }}>Bitte bestätige diese E-Mail zuerst, <strong>bevor</strong> du deine neue E-Mail Adresse bestätigen kannst.</p>
        </AlertCard>
      )}
      <ErrorCard
        error={error}
        marginBottom={10}
        overwriteErrorMessages={{
          unknownError: "Beim Ändern der E-Mail Adresse ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
        }}
      />
      {!isSuccess && (
        <form onSubmit={handleSubmit}>
          <Input
            {...form.getInputProps("newEmail")}
            inputType="text"
            label="Neue E-Mail Adresse"
            title="Neue E-Mail Adresse"
            placeholder="max.mustermann@email.de"
          />
          <Button<"button">
            type="submit"
            loading={isLoading}
            styleType="primary"
            disabled={!form.isDirty() || isLoading}
            size="large">
            1. Bestätigungslink senden
          </Button>
        </form>
      )}
    </div>
  );
};

export default ChangeEmailTab;
