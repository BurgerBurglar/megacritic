export const formatDates = (isoDate: string) => {
  const date = Date.parse(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return Intl.DateTimeFormat(navigator.language, options).format(date);
};
