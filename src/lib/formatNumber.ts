export const formatNumber = (value: string | number): string => {
  if (typeof value === "number") {
    return isNaN(value) ? `${value}` : value.toLocaleString("en");
  } else {
    const num = Number(value);
    return isNaN(num) ? value : num.toLocaleString("en");
  }
};
