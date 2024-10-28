import { Bookmark } from "@constellatio/db/schema";
import { UserWithRelations } from "~/services/users.service";

export type UserFiltered = Pick<UserWithRelations, "email" | "id" | "gender" | "lastName" | "firstName" | "displayName" | "semester" | "university" | "roles" | "isForumModerator" | "isAdmin" | "profilePicture" | "authProvider">;

export const filterUserForClient = (user: UserWithRelations): UserFiltered => ({
  authProvider: user.authProvider,
  displayName: user.displayName,
  email: user.email,
  firstName: user.firstName,
  gender: user.gender,
  id: user.id,
  isAdmin: user.isAdmin,
  isForumModerator: user.isForumModerator,
  lastName: user.lastName,
  profilePicture: user.profilePicture,
  roles: user.roles,
  semester: user.semester,
  university: user.university
});

export type BookmarkFiltered = Pick<Bookmark, "resourceId" | "resourceType">;

export const filterBookmarkForClient = (bookmark: Bookmark): BookmarkFiltered => ({
  resourceId: bookmark.resourceId,
  resourceType: bookmark.resourceType
});
