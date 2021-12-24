export const getHourMinute = (seconds: number) =>
  `${Math.floor(seconds / 60)}h${seconds % 60}s`;
