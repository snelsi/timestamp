/**
 * date => localFormat
 */
export const dateToLocalString = (date: Date) => date.toLocaleString().slice(0, 10);

/**
 * date => yyyy-mm-dd
 */
export const dateToString = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
