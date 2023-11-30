export const timeFormatter = (time: Date) => {
  return new Intl.DateTimeFormat("en-us", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  }).format(Number(time));
};
