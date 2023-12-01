import moment from "moment";
export const timeFormatter = (time: Date) => {
  if (moment(time).fromNow() === "7 days ago")
    return new Intl.DateTimeFormat("en-us", {
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Manila",
    }).format(Number(time));

  return moment(time).fromNow();
};
