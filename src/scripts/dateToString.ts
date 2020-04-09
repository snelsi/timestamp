import format from "date-fns/format";

/**
 * date => dd.mm.yyyy
 */
export const dateToLocalString = (date: Date) => format(date, "dd.MM.yyyy");

/**
 * date => yyyy-mm-dd
 */
export const dateToString = (date: Date) => format(date, "yyyy-M-d");
