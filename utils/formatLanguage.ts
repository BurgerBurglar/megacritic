export const formatLanguage = (code?: string, locale: string = "en-US") => {
  if (!code) return null;
  return new Intl.DisplayNames([locale], { type: "language" }).of(code);
};
