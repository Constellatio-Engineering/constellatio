// eslint-disable-next-line max-classes-per-file
import { type AuthError } from "@supabase/gotrue-js";
import { TRPCError } from "@trpc/server";

export class UnauthorizedError extends TRPCError
{

  public constructor(cause?: Error)
  {
    super({ cause, code: "UNAUTHORIZED" });
  }
}

export class InternalServerError extends TRPCError
{
  public constructor(cause: Error)
  {
    super({
      cause,
      code: "INTERNAL_SERVER_ERROR" 
    });
  }
}

export class EmailAlreadyTakenError extends TRPCError
{
  public constructor()
  {
    super({ code: "BAD_REQUEST" });
  }
}

export class RegisterError extends TRPCError
{
  public constructor(cause: AuthError)
  {
    super({ cause, code: "BAD_REQUEST" });
  }
}

export class FileTooLargeError extends TRPCError
{
  public constructor()
  {
    super({ code: "BAD_REQUEST" });
  }
}

export class BadFileError extends TRPCError
{
  public constructor(cause: Error)
  {
    super({ cause, code: "BAD_REQUEST" });
  }
}

export class NotFoundError extends TRPCError
{
  public constructor()
  {
    super({ code: "NOT_FOUND" });
  }
}
