import type { BookmarkSql } from "@/db/schema";
import { addBadgeForUser } from "@/server/api/services/badges.services";

export const bookmarkHandlerBookmarkInsert = async (record: BookmarkSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  await addBadgeForUser({ badgeIdentifier: "favorit", userId });
};
