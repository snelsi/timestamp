export type MonthName =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

export interface Month {
  number: number;
  month: MonthName;
  days: 28 | 29 | 30 | 31;
}
