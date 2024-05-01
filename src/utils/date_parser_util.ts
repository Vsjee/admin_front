export const date_parser_util = (date: number): string => {
  return date.toString().length === 10
    ? new Date(date * 1000).toLocaleDateString()
    : new Date(date).toLocaleDateString();
};
