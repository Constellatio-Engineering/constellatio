export const getDateInLocalTimezone = (date: Date, timeZoneOffset: number): Date =>
{
  return new Date(date.getTime() - timeZoneOffset * 60 * 1000);
};

export const getCurrentDateInLocalTimezone = (timeZoneOffset: number): Date =>
{
  const now = new Date();
  return getDateInLocalTimezone(now, timeZoneOffset);
};
