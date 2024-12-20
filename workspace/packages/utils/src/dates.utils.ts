export const getDateInLocalTimezone = (date: Date, timeZoneOffset: number): Date =>
{
  return new Date(date.getTime() - timeZoneOffset * 60 * 1000);
};

export const getCurrentDateInLocalTimezone = (timeZoneOffset: number): Date =>
{
  const now = new Date();
  return getDateInLocalTimezone(now, timeZoneOffset);
};

type ConvertSecondsToDuration = (seconds: number) => { hours: number; minutes: number; seconds: number };

export const convertSecondsToDuration: ConvertSecondsToDuration = (seconds) =>
{
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return { hours, minutes, seconds: remainingSeconds };
};

export const formatDate = (inputDate: Date): string =>
{
  const date = new Date(inputDate);
  const day = date.getDate();

  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${monthName}, ${year}`;
};

export const getCurrentDate = () => new Date();
