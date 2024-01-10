/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { supabase } from "@/lib/supabase";
import { paths } from "@/utils/paths";

import { Loader, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AuthError, type AuthOtpResponse, type AuthResponse } from "@supabase/gotrue-js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, {
  type FunctionComponent, useState, useEffect, useRef, type ReactNode, useMemo
} from "react";

import { type ParsedUrlQuery } from "querystring";

import * as styles from "./EmailConfirmCard.styles";

interface ICardProps 
{
  readonly desc: string;
  readonly showConfirmationButton: boolean;
  // readonly isLoading?: boolean;
  readonly title: string;
}

type ConfirmationState = "showConfirmationButton" | "invalidLink" | "showError" | "showResendError" | "success" | "linkResentSuccessfully";

type Content = {
  desc: string;
  showConfirmationButton: boolean;
  title: string;
};

interface EmailConfirmCardProps 
{
  readonly params: ParsedUrlQuery;
}

const EmailConfirmCard: FunctionComponent<EmailConfirmCardProps> = ({ params }) =>
{
  const [confirmationState, setConfirmationState] = useState<ConfirmationState | null>(null);
  const redirectTimeout = useRef<NodeJS.Timeout>();
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

  const { isLoading: isResendLinkLoading, mutate: resendLink } = useMutation({
    mutationFn: async (): Promise<AuthOtpResponse["data"]> =>
    {
      const result = await supabase.auth.resend({
        email: email as string,
        type: "signup",
      });

      if(result.error)
      {
        throw result.error;
      }

      console.log("successfully resent link", result);

      return result.data;
    },
    mutationKey: ["resendLink"],
    onError: () => setConfirmationState("showResendError"),
    onSuccess: () => setConfirmationState("linkResentSuccessfully"),
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

  const { desc, showConfirmationButton, title }: Content = useMemo(() =>
  {
    let content: Content;

    switch (confirmationState)
    {
      case "showConfirmationButton":
        content = {
          desc: "Bitte klicke auf den folgenden Link, um deine E-Mail Adresse zu bestätigen und die Registrierung abzuschließen. Du wirst dann automatisch weitergeleitet.",
          showConfirmationButton: true,
          title: "E-Mail Adresse bestätigen",
        };
        break;
      case "success":
        content = {
          desc: "Du kannst diesen Tab jetzt schließen.",
          showConfirmationButton: false,
          title: "Bestätigung erfolgreich",
        };
        break;
      case "showError":
        content = {
          desc: "Bitte versuche es erneut oder kontaktiere den Support.",
          showConfirmationButton: false,
          title: "Da ist leider etwas schiefgelaufen",
        };
        break;
      case "invalidLink":
        content = {
          desc: "Der Link ist ungültig oder wurde bereits verwendet.",
          showConfirmationButton: false,
          title: "E-Mail Bestätigung nicht erfolgreich",
        };
        break;
      case "linkResentSuccessfully":
        content = {
          desc: "Der Link wurde erfolgreich erneut gesendet. Du kannst diesen Tab nun schließen und den Link in deinem E-Mail Postfach öffnen.",
          showConfirmationButton: false,
          title: "Link erneut gesendet",
        };
        break;
      case "showResendError":
        content = {
          desc: "Es ist ein Fehler beim erneuten Senden des Links aufgetreten. Bitte versuche es erneut oder kontaktiere den Support.",
          showConfirmationButton: false,
          title: "Link konnte nicht erneut gesendet werden",
        };
        break;
      case null:
        content = {
          desc: "",
          showConfirmationButton: false,
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
    </div>
  );
};

export default EmailConfirmCard;
