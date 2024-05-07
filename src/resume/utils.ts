export const parseDate = (date: string) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return ""; // check date validity
  }
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();
  return `${month} ${year}`;
};

export const getStartEndDate = (item: { startDate: string; endDate: string }) =>
  `${parseDate(item.startDate) && `${parseDate(item.startDate)} - `}${parseDate(
    item.endDate
  )}`;
