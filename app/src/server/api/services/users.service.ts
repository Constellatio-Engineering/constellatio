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
      profilePictures: true,
      usersToRoles: {
        columns: {},
        with: {
          role: {
            columns: {
              identifier: true,
              name: true
            }
          },
        }
      }
    }
  });

  if(!user)
  {
    throw new NotFoundError();
  }

  const roles = user.usersToRoles.map(({ role }) => ({
    identifier: role.identifier,
    name: role.name
  }));
  const isForumModerator = roles.some(({ identifier }) => identifier === "forumMod");
  const isAdmin = roles.some(({ identifier }) => identifier === "admin");

  return ({
    ...user,
    isAdmin,
    isForumModerator,
    roles
  });
};

export type UserWithRelations = Awaited<ReturnType<typeof getUserWithRelations>>;
