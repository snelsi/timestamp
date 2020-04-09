const oneDay = 1000 * 60 * 60 * 24;

export const dayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  // @ts-ignore
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;

  return Math.floor(diff / oneDay);
};
