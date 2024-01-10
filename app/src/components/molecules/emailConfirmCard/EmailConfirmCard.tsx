/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { useResendConfirmationEmail } from "@/hooks/useResendConfirmationEmail";
import { supabase } from "@/lib/supabase";

import { Title } from "@mantine/core";
import { AuthError, type AuthResponse } from "@supabase/gotrue-js";
import { useMutation } from "@tanstack/react-query";
import React, {
  type FunctionComponent, useState, useEffect, useMemo
} from "react";

import { type ParsedUrlQuery } from "querystring";

import * as styles from "./EmailConfirmCard.styles";

type ConfirmationState = "showConfirmationButton" | "invalidLink" | "showError" | "showResendError" | "success" | "linkResentSuccessfully";

type Content = {
  desc: string;
  showConfirmationButton: boolean;
  showResendButton: boolean;
  title: string;
};

interface EmailConfirmCardProps 
{
  readonly params: ParsedUrlQuery;
}

const EmailConfirmCard: FunctionComponent<EmailConfirmCardProps> = ({ params }) =>
{
  const [confirmationState, setConfirmationState] = useState<ConfirmationState | null>(null);
  const { email, token } = params;

  const { isLoading: isConfirmationLoading, mutate: confirmEmail } = useMutation({
    mutationFn: async (): Promise<AuthResponse["data"]> =>
    {
      const result = await supabase.auth.verifyOtp({
        email: email as string,
        token: token as string,
        type: "email",
      });

      if(result.error)
      {
        throw result.error;
      }

      return result.data;
    },
    mutationKey: ["confirmEmail"],
    onError: (error) =>
    {
      if(error instanceof AuthError && error.message === "Token has expired or is invalid")
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

  const { isLoading: isResendConfirmationEmailLoading, mutate: resendConfirmationEmail } = useResendConfirmationEmail({
    email: email as string,
    onError: () => setConfirmationState("showResendError"),
    onSuccess: () => setConfirmationState("linkResentSuccessfully"),
    showNotifications: false
  });

  useEffect(() =>
  {
    if(typeof email !== "string" || typeof token !== "string")
    {
      return setConfirmationState("showError");
    }
    else
    {
      return setConfirmationState("showConfirmationButton");
    }
  }, [confirmEmail, email, token]);

  const {
    desc,
    showConfirmationButton,
    showResendButton,
    title
  }: Content = useMemo(() =>
  {
    let content: Content;

    switch (confirmationState)
    {
      case "showConfirmationButton":
        content = {
          desc: "Bitte klicke auf den folgenden Link, um deine E-Mail Adresse zu bestätigen und die Registrierung abzuschließen.",
          showConfirmationButton: true,
          showResendButton: false,
          title: "E-Mail Adresse bestätigen",
        };
        break;
      case "success":
        content = {
          desc: "Du kannst diesen Tab jetzt schließen.",
          showConfirmationButton: false,
          showResendButton: false,
          title: "Bestätigung erfolgreich",
        };
        break;
      case "showError":
        content = {
          desc: "Bitte versuche es erneut oder kontaktiere den Support.",
          showConfirmationButton: false,
          showResendButton: false,
          title: "Da ist leider etwas schiefgelaufen",
        };
        break;
      case "invalidLink":
        content = {
          desc: "Der Link ist ungültig oder wurde bereits verwendet. Solltest du deine E-Mail Adresse bereits bestätigt haben, kannst du diesen Tab schließen und dich anmelden. Andernfalls kannst du einen neuen Link anfordern, indem du auf den folgenden Button klickst.",
          showConfirmationButton: false,
          showResendButton: true,
          title: "Bestätigung nicht erfolgreich",
        };
        break;
      case "linkResentSuccessfully":
        content = {
          desc: "Der Link wurde erfolgreich erneut gesendet. Du kannst diesen Tab nun schließen und den Link in deinem E-Mail Postfach öffnen. Solltest du keine E-Mail erhalten haben, ist sie möglicherweise im Spam Ordner gelandet oder deine E-Mail Adresse ist bereits bestätigt.",
          showConfirmationButton: false,
          showResendButton: false,
          title: "Link erneut gesendet",
        };
        break;
      case "showResendError":
        content = {
          desc: "Es ist ein Fehler beim erneuten Senden des Links aufgetreten. Bitte versuche es erneut oder kontaktiere den Support.",
          showConfirmationButton: false,
          showResendButton: false,
          title: "Link konnte nicht erneut gesendet werden",
        };
        break;
      case null:
        content = {
          desc: "",
          showConfirmationButton: false,
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
      {showConfirmationButton && (
        <div css={styles.buttonWrapper}>
          <Button<"button">
            loading={isConfirmationLoading}
            styleType="primary"
            onClick={() => confirmEmail()}
            type="button">
            E-Mail Adresse bestätigen
          </Button>
        </div>
      )}
      {showResendButton && (
        <div css={styles.buttonWrapper}>
          <Button<"button">
            loading={isResendConfirmationEmailLoading}
            styleType="secondarySimple"
            onClick={() => resendConfirmationEmail()}
            type="button">
            Bestätigungslink erneut senden
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailConfirmCard;
