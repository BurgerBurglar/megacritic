export const formatDates = (
  isoDate: string,
  addtionalOptions: Intl.DateTimeFormatOptions = {}
) => {
  const date = Date.parse(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...addtionalOptions,
  };
  try {
    return Intl.DateTimeFormat(navigator.language, options).format(date);
  } catch (error) {
    return "";
  }
};
