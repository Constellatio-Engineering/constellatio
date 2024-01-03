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
  isRedirecting: boolean;
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
    onSuccess: () => setConfirmationState("success"),
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

  /* useEffect(() =>
  {
    if(redirectTimeout.current)
    {
      clearTimeout(redirectTimeout.current);
    }

    if(params.error)
    {
      setCard({
        desc: params.error_description?.toString() ?? "",
        title: "E-Mail Bestätigung nicht erfolgreich",
      });
    }
    else if(params.code)
    {
      setCard({
        desc: "Du wirst in wenigen Sekunden automatisch weitergeleitet...",
        isLoading: true,
        title: "Bestätigung erfolgreich",
      });

      redirectTimeout.current = setTimeout(() =>
      {
        console.log("Redirecting to dashboard now...");
        window.location.replace(paths.dashboard);
        // void Router.replace(paths.dashboard);
      }, 4000);
    }
    else 
    {
      console.error("Email confirmation failed. Query params did not contain an error or a code. Query params were: ", window.location.search);

      setCard({
        desc: "Bitte versuche es erneut oder kontaktiere den Support.",
        title: "Da ist leider etwas schiefgelaufen",
      });
    }

    return () => clearTimeout(redirectTimeout.current);
  }, [params.code, params.error, params.error_description]);*/

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
    isRedirecting,
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
          desc: "Bitte klicke auf den folgenden Link, um deine E-Mail Adresse zu bestätigen und die Registrierung abzuschließen. Du wirst dann automatisch weitergeleitet.",
          isRedirecting: false,
          showConfirmationButton: true,
          showResendButton: false,
          title: "E-Mail Adresse bestätigen",
        };
        break;
      case "success":
        content = {
          desc: "Du wirst in wenigen Sekunden automatisch weitergeleitet...",
          isRedirecting: true,
          showConfirmationButton: false,
          showResendButton: false,
          title: "Bestätigung erfolgreich",
        };
        break;
      case "showError":
        content = {
          desc: "Bitte versuche es erneut oder kontaktiere den Support.",
          isRedirecting: false,
          showConfirmationButton: false,
          showResendButton: false,
          title: "Da ist leider etwas schiefgelaufen",
        };
        break;
      case "invalidLink":
        content = {
          desc: "Der Link ist ungültig oder wurde bereits verwendet. Mit dem folgenden Button kannst du dir einen neuen Link zusenden lassen.",
          isRedirecting: false,
          showConfirmationButton: false,
          showResendButton: true,
          title: "E-Mail Bestätigung nicht erfolgreich",
        };
        break;
      case "linkResentSuccessfully":
        content = {
          desc: "Der Link wurde erfolgreich erneut gesendet. Du kannst diesen Tab nun schließen und den Link in deinem E-Mail Postfach öffnen.",
          isRedirecting: false,
          showConfirmationButton: false,
          showResendButton: false,
          title: "Link erneut gesendet",
        };
        break;
      case "showResendError":
        content = {
          desc: "Es ist ein Fehler beim erneuten Senden des Links aufgetreten. Bitte versuche es erneut oder kontaktiere den Support.",
          isRedirecting: false,
          showConfirmationButton: false,
          showResendButton: false,
          title: "Link konnte nicht erneut gesendet werden",
        };
        break;
      case null:
        content = {
          desc: "",
          isRedirecting: false,
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
        {isRedirecting && (
          <Loader size="sm" ml={8}/>
        )}
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
      {true && (
        <div css={styles.buttonWrapper}>
          <Button<"button">
            loading={isResendLinkLoading}
            styleType="secondarySimple"
            onClick={() => resendLink()}
            type="button">
            Bestätigungslink erneut senden
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailConfirmCard;
