import { eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type User, type UserRole, users } from "@constellatio/db/schema";

import { NotFoundError } from "../utils/serverError";
import { getProfilePictureUrl } from "../utils/users";

export type UserWithRelations = User & {
  isAdmin: boolean;
  isForumModerator: boolean;
  profilePicture: null | {
    url: string;
  };
  roles: Array<Pick<UserRole, "identifier" | "name">>;
};

export const getUserWithRelations = async (userId: string): Promise<UserWithRelations> =>
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
