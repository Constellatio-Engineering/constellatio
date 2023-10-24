import { type User } from "@/db/schema";

export type UserFiltered = Pick<User, "email" | "gender" | "lastName" | "firstName" | "displayName" | "semester" | "university">;

export const filterUserForClient = (user: User): UserFiltered => ({
  displayName: user.displayName,
  email: user.email,
  firstName: user.firstName,
  gender: user.gender,
  lastName: user.lastName,
  semester: user.semester,
  university: user.university
});
