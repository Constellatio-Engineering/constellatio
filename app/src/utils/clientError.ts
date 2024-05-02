type ClientErrorIdentifiers = "email-already-taken" | "internal-server-error" | "unauthorized" | "too-many-requests";

interface ClientErrorShape
{
  details: unknown;
  readonly identifier: ClientErrorIdentifiers;
}

type ClientErrors = {
  [key in ClientErrorIdentifiers]: ClientErrorShape;
};

export const clientErrors: ClientErrors = {
  "email-already-taken": {
    details: { message: "Diese E-Mail Adresse wird bereits verwendet" },
    identifier: "email-already-taken"
  },
  "internal-server-error": {
    details: { message: "Es ist etwas schief gelaufen" },
    identifier: "internal-server-error"
  },
  "too-many-requests": {
    details: { message: "Zu viele Anfragen" },
    identifier: "too-many-requests"
  },
  unauthorized: {
    details: { message: "Du bist nicht angemeldet" },
    identifier: "unauthorized"
  }
} as const;

export type ClientError = typeof clientErrors[ClientErrorIdentifiers];
