import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Input } from "@/components/atoms/Input/Input";
import ErrorCard from "@/components/molecules/errorCard/ErrorCard";
import { Modal } from "@/components/molecules/Modal/Modal";
import { queryParams } from "@/utils/query-params";

import { Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { type FunctionComponent, useEffect, useState } from "react";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import * as styles from "./ChangeEmailTab.styles";
import * as parentStyles from "../profileDetailsTab/ProfileDetailsTab.styles";

import { supabase } from "@/lib/supabase";
import { type UpdateEmailSchema, updateEmailSchema } from "@/schemas/auth/updateEmail.schema";
import { type UserFiltered } from "@/utils/filters";
import { getConfirmEmailChange } from "@/utils/paths";

type Props = {
  readonly isDisabled: boolean;
  readonly userDetails: UserFiltered;
};

const ChangeEmailTab: FunctionComponent<Props> = ({ isDisabled, userDetails }) =>
{
  const router = useRouter();
  const wasEmailChangedSuccessfully = router.query[queryParams.emailChangeSuccess] === "true";
  const { t } = useTranslation();
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
    isPending: isLoading,
    isSuccess,
    mutate: updateEmail,
  } = useMutation({
    mutationFn: async (formValues: UpdateEmailSchema) =>
    {
      if(userDetails.authProvider !== "email")
      {
        return;
      }

      const changeEmailResult = await supabase.auth.updateUser({ email: formValues.newEmail }, {
        emailRedirectTo: getConfirmEmailChange(),
      });

      if(changeEmailResult.error)
      {
        throw changeEmailResult.error;
      }

      form.setValues({
        currentEmail: formValues.newEmail,
        newEmail: "",
      });
    },
    onError: (error) => console.error("error occurred while changing email", error),
    onSuccess: () => setIsConfirmationModalOpen(true)
  });

  const handleSubmit = form.onSubmit(formValues => updateEmail(formValues));

  return (
    <>
      <div css={parentStyles.wrapper}>
        <Title css={styles.changeEmailTabTitle} order={3}>E-Mail Adresse ändern</Title>
        {isDisabled && (
          <AlertCard variant="warning" shouldUseFullWidth={true} mb={30}>
            Du kannst deine E-Mail Adresse nicht ändern, da du dich mit einem externen Anbieter angemeldet hast.
            Solltest du dein Konto auf einen Login mit E-Mail-Adresse und Passwort umstellen wollen, melde dich bitte bei unserem Support.
          </AlertCard>
        )}
        <div css={isDisabled && parentStyles.contentDisabled}>
          {wasEmailChangedSuccessfully && (
            <AlertCard mb={30} variant="success">Deine E-Mail Adresse wurde erfolgreich geändert</AlertCard>
          )}
          <BodyText pb={30} style={{ borderBottom: "1px solid #e3e3e3" }} styleType="body-01-regular">Deine aktuelle E-Mail Adresse ist <strong>{userDetails?.email}</strong></BodyText>
          {isSuccess && (
            <AlertCard style={{ display: "flex", justifyContent: "flex-start", marginBlock: 30 }} variant="success">
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
      </div>
      <Modal
        opened={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        withCloseButton={false}
        closeOnClickOutside={false}
        lockScroll={false}
        radius={12}
        centered
        size="xl">
        <div css={styles.modalContentWrapper}>
          <Title css={styles.changeEmailModalTitle} order={3}>Wichtiger Hinweis</Title>
          <BodyText styleType="body-01-medium" component="p">Aus Sicherheitsgründen, musst du sowohl <strong>deine alte</strong>, als auch <strong>deine neue E-Mail Adresse</strong> bestätigen.</BodyText>
          <BodyText styleType="body-01-medium" component="p">Bitte schaue daher in <strong>beiden Postfächern</strong> nach und bestätige beide Links. Erst dann wird deine E-Mail Adresse geändert.</BodyText>
          <BodyText styleType="body-01-medium" component="p">Solltest du keine E-Mail erhalten haben, schaue bitte auch in deinem Spam-Ordner nach.</BodyText>
          <Button<"button">
            css={styles.changeEmailButton}
            size="large"
            styleType="primary"
            onClick={() => setIsConfirmationModalOpen(false)}>
            Verstanden
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ChangeEmailTab;
