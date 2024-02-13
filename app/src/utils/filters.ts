import { type Bookmark, type ProfilePicture } from "@/db/schema";
import { type UserWithRelations } from "@/server/api/services/users.service";

export type UserFiltered = Pick<UserWithRelations, "email" | "id" | "gender" | "lastName" | "firstName" | "displayName" | "semester" | "university"> & {
  profilePicture: ProfilePicture | null;
};

export const filterUserForClient = (user: UserWithRelations): UserFiltered => ({
  displayName: user.displayName,
  email: user.email,
  firstName: user.firstName,
  gender: user.gender,
  id: user.id,
  lastName: user.lastName,
  profilePicture: user.profilePictures[0] ?? null,
  semester: user.semester,
  university: user.university
});

export type BookmarkFiltered = Pick<Bookmark, "resourceId" | "resourceType">;

export const filterBookmarkForClient = (bookmark: Bookmark): BookmarkFiltered => ({
  resourceId: bookmark.resourceId,
  resourceType: bookmark.resourceType
});
