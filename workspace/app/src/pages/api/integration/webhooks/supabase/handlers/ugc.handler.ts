import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { type DocumentSql, type UploadedFileSql } from "@constellatio/db/schema";

const getNumberOfUploadedUgcs = (userId: string): number | null =>
{
  // TODO: Anzahl von Ugcs aus Document und UploadedFile Datenbanken ziehen und zurückgeben

  return 0;
};

const handleBadges = async (numberOfUploadedUgcs: number | null, userId: string) =>
{
  if(!numberOfUploadedUgcs)
  {
    return;
  }

  if(numberOfUploadedUgcs >= 1)
  {
    await addBadgeForUser({ badgeIdentifier: "ugc-1", userId });
  }
  if(numberOfUploadedUgcs >= 5)
  {
    await addBadgeForUser({ badgeIdentifier: "ugc-5", userId });
  }
  if(numberOfUploadedUgcs >= 10)
  {
    await addBadgeForUser({ badgeIdentifier: "ugc-10", userId });
  }
};

export const ugcHandlerDocumentInsert = async (record: DocumentSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  const numberOfUploadedUgcs = getNumberOfUploadedUgcs(userId);

  await handleBadges(numberOfUploadedUgcs, userId);
};

export const ugcHandlerUploadedFileInsert = async (record: UploadedFileSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  const numberOfUploadedUgcs = getNumberOfUploadedUgcs(userId);

  await handleBadges(numberOfUploadedUgcs, userId);
};
