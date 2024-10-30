/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { useResendConfirmationEmail } from "@/hooks/useResendConfirmationEmail";
import { supabase } from "@/lib/supabase";

import { appPaths } from "@constellatio/shared/paths";
import { Loader, Title } from "@mantine/core";
import { sendGTMEvent } from "@next/third-parties/google";
import { isAuthError } from "@supabase/auth-js";
import { type AuthResponse } from "@supabase/gotrue-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useEffect, useMemo, useState } from "react";

import { type ParsedUrlQuery } from "querystring";

import * as styles from "./EmailConfirmCard.styles";

type ConfirmationState = "invalidLink" | "showError" | "showResendError" | "success" | "linkResentSuccessfully";

type Content = {
  desc: string;
  showDashboardButton: boolean;
  showResendButton: boolean;
  title: string;
};

interface EmailConfirmCardProps 
{
  readonly params: ParsedUrlQuery;
}

const EmailConfirmCard: FunctionComponent<EmailConfirmCardProps> = ({ params }) =>
{
  const router = useRouter();

  const [confirmationState, setConfirmationState] = useState<ConfirmationState | null>(null);
  const { email, token } = params;
  let confirmInvoked = false;

  const { isPending: isConfirmationLoading, mutate: confirmEmail } = useMutation({
    mutationFn: async (): Promise<AuthResponse["data"]> =>
    {
      confirmInvoked = true;
      const result = await supabase.auth.verifyOtp({
        email: email as string,
        token: token as string,
        type: "email",
      });

      if(result.error)
      {
        throw result.error;
      }

      sendGTMEvent({
        email: result.data.user?.email,
        event: "email_confirmed",
        userId: result.data.user?.id,
      });

      return result.data;
    },
    mutationKey: ["confirmEmail"],
    onError: (error) =>
    {
      if(isAuthError(error) && error.message === "Token has expired or is invalid")
      {
        setConfirmationState("invalidLink");
      }
      else
      {
        setConfirmationState("showError");
      }
    },
    onSuccess: (data) =>
    {
      console.log("success", data);
      setConfirmationState("success");
    },
  });

  const { isPending: isResendConfirmationEmailLoading, mutate: resendConfirmationEmail } = useResendConfirmationEmail({
    email: email as string,
    onError: () => setConfirmationState("showResendError"),
    onSuccess: () => setConfirmationState("linkResentSuccessfully"),
    showNotifications: false
  });

  useEffect(() =>
  {
    if(router.isReady) 
    {
      if(typeof email !== "string" || typeof token !== "string")
      {
        console.error("Email or token is not a string");
        return setConfirmationState("showError");
      }
      else if(!confirmInvoked) 
      {
        confirmEmail();
      }
    }
    
  }, [confirmEmail, router.isReady, email, token, confirmInvoked]);

  const {
    desc,
    showDashboardButton,
    showResendButton,
    title
  }: Content = useMemo(() =>
  {
    let content: Content;

    switch (confirmationState)
    {
      case "success":
        content = {
          desc: "Du kannst diesen Tab jetzt schließen.",
          showDashboardButton: true,
          showResendButton: false,
          title: "Bestätigung erfolgreich",
        };
        break;
      case "showError":
        content = {
          desc: "Bitte versuche es erneut oder kontaktiere den Support.",
          showDashboardButton: false,
          showResendButton: false,
          title: "Da ist leider etwas schiefgelaufen",
        };
        break;
      case "invalidLink":
        content = {
          desc: "Der Link ist ungültig oder wurde bereits verwendet. Solltest du deine E-Mail Adresse bereits bestätigt haben, kannst du diesen Tab schließen und dich anmelden. Andernfalls kannst du einen neuen Link anfordern, indem du auf den folgenden Button klickst.",
          showDashboardButton: true,
          showResendButton: true,
          title: "Bestätigung nicht erfolgreich",
        };
        break;
      case "linkResentSuccessfully":
        content = {
          desc: "Der Link wurde erfolgreich erneut gesendet. Du kannst diesen Tab nun schließen und den Link in deinem E-Mail Postfach öffnen. Solltest du keine E-Mail erhalten haben, ist sie möglicherweise im Spam Ordner gelandet oder deine E-Mail Adresse ist bereits bestätigt.",
          showDashboardButton: false,
          showResendButton: false,
          title: "Link erneut gesendet",
        };
        break;
      case "showResendError":
        content = {
          desc: "Es ist ein Fehler beim erneuten Senden des Links aufgetreten. Bitte versuche es erneut oder kontaktiere den Support.",
          showDashboardButton: false,
          showResendButton: false,
          title: "Link konnte nicht erneut gesendet werden",
        };
        break;
      case null:
        content = {
          desc: "",
          showDashboardButton: false,
          showResendButton: false,
          title: "",
        };
        break;
    }
    return content;
  }, [confirmationState]);

  return (
    <div css={styles.wrapper}>
      <Title order={2} css={styles.title}>
        {title}
      </Title>
      <BodyText
        styleType="body-01-regular"
        component="p"
        css={styles.text}>
        {desc}
      </BodyText>
      {isConfirmationLoading && (
        <Loader size={22}/>
      )}
      {(showResendButton || showDashboardButton) && (
        <div css={styles.buttonWrapper}>
          {showResendButton && (
            <Button<"button">
              css={styles.button}
              loading={isResendConfirmationEmailLoading}
              styleType="secondarySimple"
              onClick={() => resendConfirmationEmail()}
              type="button">
              Bestätigungslink erneut senden
            </Button>
          )}
          {showDashboardButton && (
            <Button<"button">
              css={styles.button}
              styleType="primary"
              onClick={async () => router.push(appPaths.dashboard)}
              type="button">
              Zum Dashboard
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailConfirmCard;
