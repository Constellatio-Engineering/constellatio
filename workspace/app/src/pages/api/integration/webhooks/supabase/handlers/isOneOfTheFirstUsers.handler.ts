
import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { count } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { users, type UserSql } from "@constellatio/db/schema";

const getUsersCount = async (): Promise<number | undefined> =>
{
  return (await db.select({ count: count(users.id) }).from(users))?.[0]?.count;
};

const handleBadges = async (usersCount: number | undefined, userId: string) =>
{
  if(!usersCount)
  {
    return;
  }

  if(usersCount <= 100)
  {
    await addBadgeForUser({ badgeIdentifier: "1-100", userId });
  }
  else if(usersCount <= 1000)
  {
    await addBadgeForUser({ badgeIdentifier: "1-1000", userId });
  }
};

export const isOneOfTheFirstUsersHandlerUserInsert = async (record: UserSql["columns"]): Promise<void> =>
{
  const { Id: userId } = record;

  const usersCount = await getUsersCount();

  await handleBadges(usersCount, userId);
};
