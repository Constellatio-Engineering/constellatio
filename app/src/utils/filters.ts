import { type ProfilePicture } from "@/db/schema";
import { type UserWithRelations } from "@/server/api/services/users.service";

export type UserFiltered = Pick<UserWithRelations, "email" | "gender" | "lastName" | "firstName" | "displayName" | "semester" | "university"> & {
  profilePicture: ProfilePicture | null;
};

export const filterUserForClient = (user: UserWithRelations): UserFiltered => ({
  displayName: user.displayName,
  email: user.email,
  firstName: user.firstName,
  gender: user.gender,
  lastName: user.lastName,
  profilePicture: user.profilePictures[0] ?? null,
  semester: user.semester,
  university: user.university
});