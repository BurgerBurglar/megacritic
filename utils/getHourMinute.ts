export const getHourMinute = (seconds?: number) =>
  seconds ? `${Math.floor(seconds / 60)}h ${seconds % 60}m` : null;
