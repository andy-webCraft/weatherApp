export const parseTimestamp = (
  timestamp: number,
  type: "date" | "time" | "hour" | "all"
): string => {
  let stringDate = new Date(timestamp * 1000).toLocaleString();

  switch (type) {
    case "date":
      return stringDate.slice(0, 5);
    case "time":
      return stringDate.slice(stringDate.indexOf(",") + 2, -3);
    case "hour":
      return stringDate.slice(
        stringDate.indexOf(",") + 2,
        stringDate.indexOf(":")
      );
    case "all":
      return stringDate.slice(0, -3);
    default:
      return "";
  }
};

