import { dateToLocalString } from "scripts";

export function fancyWeek(d: Date) {
  const date = new Date(d);
  const weekStart = dateToLocalString(date);
  date.setDate(date.getDate() + 6);
  const weekEnd = dateToLocalString(date);
  return `${weekStart} - ${weekEnd}`;
}
