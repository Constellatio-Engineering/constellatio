type ClientErrorIdentifiers = "email-already-taken" | "internal-server-error";

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
    details: {
      message: "Diese E-Mail Adresse wird bereits verwendet",
    },
    identifier: "email-already-taken"
  },
  "internal-server-error": {
    details: {
      message: "Diese E-Mail Adresse wird bereits verwendet",
    },
    identifier: "internal-server-error"
  }
} as const;

export type ClientError = typeof clientErrors[ClientErrorIdentifiers];
