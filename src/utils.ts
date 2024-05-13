export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export const getDateString = (date: string) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return "";
  }
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();
  return `${month} ${year}`;
};

export const getStartEndDateStart = (item: {
  startDate: string;
  endDate: string;
}) =>
  `${
    getDateString(item.startDate) && `${getDateString(item.startDate)} - `
  }${getDateString(item.endDate)}`;
