import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { NotFoundError } from "@/utils/serverError";
import { getProfilePictureUrl } from "@/utils/users";

import { eq } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUserWithRelations = async (userId: string) =>
{
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      profilePictures: {
        columns: {
          profilePictureSource: true,
          serverFilename: true, 
          url: true,
          userId: true,
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
    profilePicture: !_profilePicture ? null : {
      url: getProfilePictureUrl(_profilePicture),
    },
    roles
  });
};

export type UserWithRelations = Awaited<ReturnType<typeof getUserWithRelations>>;
