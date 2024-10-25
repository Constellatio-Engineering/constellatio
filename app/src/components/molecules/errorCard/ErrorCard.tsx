import { AlertCard } from "@/components/atoms/Card/AlertCard";

import { isAuthApiError, isAuthError } from "@supabase/auth-js";
import React, { type FunctionComponent, type ReactNode, useMemo } from "react";

type HandledError =
  | "tooManyRequests"
  | "emailNotConfirmed"
  | "invalidCredentials"
  | "passwordsMatch"
  | "emailAlreadyRegistered"
  | "unknownError";

type OverwriteErrorMessages = {
  [key in HandledError]?: string;
};

type RenderAdditionalContent = {
  emailNotConfirmed: ReactNode;
};

export interface ErrorCardsProps
{
  readonly error: unknown;
  readonly marginBottom?: number;
  readonly overwriteErrorMessages?: OverwriteErrorMessages;
  readonly renderAdditionalContent?: RenderAdditionalContent;
  readonly shouldUseFullWidth?: boolean;
}

const ErrorCard: FunctionComponent<ErrorCardsProps> = ({
  error,
  marginBottom = 20,
  overwriteErrorMessages,
  renderAdditionalContent,
  shouldUseFullWidth,
}) =>
{
  const renderedError: HandledError | null = useMemo(() =>
  {
    if(!error)
    {
      return null;
    }

    if(isAuthError(error) || isAuthApiError(error))
    {
      if(error.status === 429)
      {
        return "tooManyRequests";
      }

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
      <AlertCard variant="error" shouldUseFullWidth={shouldUseFullWidth}>
        {renderedError === "tooManyRequests" && (
          overwriteErrorMessages?.tooManyRequests ?? "Du hast zu viele Anfragen gesendet. Bitte versuche es später erneut."
        )}
        {renderedError === "emailNotConfirmed" && (
          <>
            <p>{overwriteErrorMessages?.emailNotConfirmed ?? "Du musst zuerst deine E-Mail-Adresse bestätigen. Eine Bestätigungsmail wurde dir bereits zugesendet."}</p>
            {renderAdditionalContent?.emailNotConfirmed && renderAdditionalContent.emailNotConfirmed}
          </>
        )}
        {renderedError === "invalidCredentials" && (
          overwriteErrorMessages?.invalidCredentials ?? "Wir konnten kein Konto mit diesen Anmeldedaten finden. Bitte überprüfe deine Eingaben."
        )}
        {renderedError === "passwordsMatch" && (
          overwriteErrorMessages?.passwordsMatch ?? "Das neue Passwort muss sich vom alten Passwort unterscheiden."
        )}
        {renderedError === "emailAlreadyRegistered" && (
          overwriteErrorMessages?.emailAlreadyRegistered ?? "Diese E-Mail Adresse wird bereits verwendet."
        )}
        {renderedError === "unknownError" && (
          overwriteErrorMessages?.unknownError ?? "Da ist etwas schief gelaufen. Bitte versuche es erneut."
        )}
      </AlertCard>
    </div>
  );
};

export default ErrorCard;
