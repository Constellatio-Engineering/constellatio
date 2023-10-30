import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Input } from "@/components/atoms/Input/Input";
import ErrorCard from "@/components/errorCard/ErrorCard";
import { supabase } from "@/lib/supabase";
import { type UpdateEmailSchema, updateEmailSchema } from "@/schemas/auth/updateEmail.schema";
import { type UserFiltered } from "@/utils/filters";
import { getConfirmEmailChange } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";

import { Modal, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { type FunctionComponent, useEffect, useState } from "react";
import z from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import * as styles from "./ChangeEmailTab.styles";
import * as parentStyles from "../profileDetailsTab/ProfileDetailsTab.styles";

type Props = {
  readonly userDetails: UserFiltered;
};

const ChangeEmailTab: FunctionComponent<Props> = ({ userDetails }) =>
{
  const router = useRouter();
  const wasEmailChangedSuccessfully = router.query[queryParams.emailChangeSuccess] === "true";
  const { t } = useTranslation();
  const isTabletScreen = useMediaQuery("(max-width: 1100px)");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  const form = useForm<UpdateEmailSchema>({
    initialValues: {
      currentEmail: userDetails?.email ?? "",
      newEmail: "",
    },
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

      form.setValues({
        currentEmail: formValues.newEmail,
        newEmail: "",
      });
    },
    onError: (error) =>
    {
      console.error("error occurred while changing password", error);
    },
    onSuccess: () => setIsConfirmationModalOpen(true)
  });

  const handleSubmit = form.onSubmit(formValues => updateEmail(formValues));

  return (
    <>
      <div css={parentStyles.wrapper}>
        {!isTabletScreen && <Title order={3}>E-Mail Adresse ändern</Title>}
        {wasEmailChangedSuccessfully && (
          <AlertCard mb={30} variant="success">Deine E-Mail Adresse wurde erfolgreich geändert</AlertCard>
        )}
        <p style={{ fontSize: 17 }}>Deine aktuelle E-Mail Adresse ist <strong>{userDetails?.email}</strong></p>
        <div
          style={{
            backgroundColor: "#e3e3e3", height: 1, margin: "30px 0 30px", width: "100%"
          }}
        />
        {isSuccess && (
          <AlertCard style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }} variant="success">
            Wir haben dir sowohl an deine neue, als auch an deine alte E-Mail Adresse eine Bestätigungsmail gesendet.
            Bitte <strong>bestätige beide E-Mails</strong>, um deine E-Mail Adresse zu ändern.
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
              Bestätigungslink senden
            </Button>
          </form>
        )}
      </div>
      <Modal
        opened={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        centered
        size="xl">
        <div css={styles.modalContentWrapper}>
          <h1>Wichtiger Hinweis</h1>
          <p style={{ color: "red", fontSize: 30, fontWeight: 700 }}>Hint from Kotti: This must no be closable unless user presses the &apos;Verstanden&apos; button</p>
          <p>Aus Sicherheitsgründen, musst du sowohl <strong>deine alte</strong>, als auch <strong>deine neue E-Mail Adresse</strong> bestätigen.</p>
          <p>Bitte schaue daher in <strong>beiden Postfächern</strong> nach und bestätige beide Links.</p>
          <p>Erst dann wird deine E-Mail Adresse geändert.</p>
          <Button<"button"> styleType="primary" onClick={() => setIsConfirmationModalOpen(false)}>
            Verstanden
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ChangeEmailTab;
