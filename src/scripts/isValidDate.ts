export const isValidDate = (date: Date) => date instanceof Date && !Number.isNaN(date.getTime());
