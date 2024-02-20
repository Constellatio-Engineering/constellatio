import { db } from "@/db/connection";
import { profilePictures, users } from "@/db/schema";
import { env } from "@/env.mjs";
import { NotFoundError } from "@/utils/serverError";

import { eq, sql } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUserWithRelations = async (userId: string) =>
{
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      profilePictures: {
        columns: {
          serverFilename: true,
        },
      },
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
  const _profilePicture = user.profilePictures?.[0];

  return ({
    ...user,
    isAdmin,
    isForumModerator,
    profilePicture: _profilePicture ? {
      url: `https://storage.googleapis.com/${env.GOOGLE_CLOUD_STORAGE_PUBLIC_BUCKET_NAME}/${user.id}/${_profilePicture.serverFilename}`
    } : null,
    roles
  });
};

export type UserWithRelations = Awaited<ReturnType<typeof getUserWithRelations>>;
