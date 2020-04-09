import { dateToLocalString } from "scripts";

import startOfISOWeek from "date-fns/startOfISOWeek";
import endOfISOWeek from "date-fns/endOfISOWeek";

export function fancyWeek(date: Date) {
  const weekStart = startOfISOWeek(date);
  const weekEnd = endOfISOWeek(date);
  return `${dateToLocalString(weekStart)} - ${dateToLocalString(weekEnd)}`;
}
