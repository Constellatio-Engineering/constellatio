import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { NotFoundError } from "@/utils/serverError";

import { eq } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUserWithRelations = async (userId: string) =>
{
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      profilePictures: true
    }
  });

  if(!user)
  {
    throw new NotFoundError();
  }

  return user;
};

export type UserWithRelations = Awaited<ReturnType<typeof getUserWithRelations>>;
