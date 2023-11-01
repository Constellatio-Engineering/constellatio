import { AlertCard } from "@/components/atoms/Card/AlertCard";

import { AuthApiError, AuthError } from "@supabase/gotrue-js";
import React, { type FunctionComponent, useMemo } from "react";

type HandledError =
  | "emailNotConfirmed"
  | "invalidCredentials"
  | "passwordsMatch"
  | "emailAlreadyRegistered"
  | "unknownError";

type OverwriteErrorMessages = {
  [key in HandledError]?: string;
};

interface ErrorCardsProps
{
  readonly error: unknown;
  readonly marginBottom?: number;
  readonly overwriteErrorMessages?: OverwriteErrorMessages;
}

const ErrorCard: FunctionComponent<ErrorCardsProps> = ({ error, marginBottom = 20, overwriteErrorMessages }) =>
{
  const renderedError: HandledError | null = useMemo(() =>
  {
    if(!error)
    {
      return null;
    }

    if(error instanceof AuthError || error instanceof AuthApiError)
    {
      switch (error.message)
      {
        case "Email not confirmed": { return "emailNotConfirmed"; }
        case "Invalid login credentials": { return "invalidCredentials"; }
        case "New password should be different from the old password.": { return "passwordsMatch"; }
        case "A user with this email address has already been registered": { return "emailAlreadyRegistered"; }
        default: { return "unknownError"; }
      }
    }

    return "unknownError";
  }, [error]);

  if(!renderedError)
  {
    return null;
  }

  return (
    <div style={{ marginBottom }}>
      {renderedError === "emailNotConfirmed" && (
        <AlertCard variant="error">
          {overwriteErrorMessages?.emailNotConfirmed ?? "Du musst zuerst deine E-Mail-Adresse bestätigen. Eine Bestätigungsmail wurde dir zugesendet."}
        </AlertCard>
      )}
      {renderedError === "invalidCredentials" && (
        <AlertCard variant="error">
          {overwriteErrorMessages?.invalidCredentials ?? "Wir konnten kein Konto mit diesen Anmeldedaten finden. Bitte überprüfe deine Eingaben."}
        </AlertCard>
      )}
      {renderedError === "passwordsMatch" && (
        <AlertCard variant="error">
          {overwriteErrorMessages?.passwordsMatch ?? "Das neue Passwort muss sich vom alten Passwort unterscheiden."}
        </AlertCard>
      )}
      {renderedError === "emailAlreadyRegistered" && (
        <AlertCard variant="error">
          {overwriteErrorMessages?.emailAlreadyRegistered ?? "Diese E-Mail Adresse wird bereits verwendet."}
        </AlertCard>
      )}
      {renderedError === "unknownError" && (
        <AlertCard variant="error">
          {overwriteErrorMessages?.unknownError ?? "Da ist etwas schief gelaufen. Bitte versuche es erneut."}
        </AlertCard>
      )}
    </div>
  );
};

export default ErrorCard;
