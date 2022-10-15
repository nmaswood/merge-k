export function parseDate(d: string): Date {
  var [month, day, year] = d.split("/").map((n) => parseInt(n, 10));

  // month index gotcha
  return new Date(year, month - 1, day);
}
