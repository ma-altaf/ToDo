export function dateFromISO(date: string) {
  if (date.endsWith("Z")) return new Date(date);
  return new Date(date + "Z");
}
