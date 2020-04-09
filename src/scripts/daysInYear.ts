import { isLeapYear } from "scripts";

export const daysInYear = (year: number) => (isLeapYear(year) ? 366 : 365);
