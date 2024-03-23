import moment from "moment";

export const setFullLocale = () => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "seconds",
      ss: "%ss",
      m: "a minute",
      mm: "%dm",
      h: "an hour",
      hh: "%dh",
      d: "a day",
      dd: "%dd",
      M: "a month",
      MM: "%dM",
      y: "a year",
      yy: "%dY",
    },
  });
};

export const setShortLocale = () => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "sec",
      ss: "%ss",
      m: "a min",
      mm: "%dm",
      h: "an hour",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "a mo",
      MM: "%dM",
      y: "a year",
      yy: "%dY",
    },
  });
};

export const getFormattedDate = (date?: Date) => {
  if (!date) return "";
  let type = "";

  if (new Date(date).getFullYear() === new Date().getFullYear()) type = "MMM DD";
  else type = "MMMM DD, YYYY";

  return moment(date).format(type);
};

export const getDateStr = (date: Date, format = "MMM DD, YYYY") => moment(date).format(format);

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};