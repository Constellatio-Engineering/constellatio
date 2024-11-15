import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { type BookmarkSql } from "@constellatio/db/schema";

export const bookmarkHandlerBookmarkInsert = async (record: BookmarkSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  await addBadgeForUser({ badgeIdentifier: "favorit", userId });
};
