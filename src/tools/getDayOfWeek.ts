export const getDayOfWeek = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const daysOfWeek = [
    "Восскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return daysOfWeek[date.getDay()];
};
