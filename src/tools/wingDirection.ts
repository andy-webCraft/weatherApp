export const wingDirection = (wingDeg: number): string => {
  const directions = [
    "↑ С",
    "↗ СВ",
    "→ В",
    "↘ ЮВ",
    "↓ Ю",
    "↙ ЮЗ",
    "← З",
    "↖ СЗ",
  ];
  return directions[Math.round(wingDeg / 45) % 8];
};
