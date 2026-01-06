type Season = "spring" | "summer" | "autumn" | "winter";

function getSeasonStart(date: Date): { season: Season; start: Date } {
  const y = date.getFullYear();
  const m = date.getMonth(); // 0..11

  // Метеорологические сезоны:
  // Spring: Mar 1, Summer: Jun 1, Autumn: Sep 1, Winter: Dec 1
  if (m >= 2 && m <= 4) return { season: "spring", start: new Date(y, 2, 1) };
  if (m >= 5 && m <= 7) return { season: "summer", start: new Date(y, 5, 1) };
  if (m >= 8 && m <= 10) return { season: "autumn", start: new Date(y, 8, 1) };

  // Winter: Dec 1 .. Feb end (январь/февраль относятся к зиме, начавшейся в прошлом году)
  if (m === 11) return { season: "winter", start: new Date(y, 11, 1) };
  return { season: "winter", start: new Date(y - 1, 11, 1) };
}

function dayOfSeason(date: Date): number {
  const { start } = getSeasonStart(date);

  // считаем целые дни (без влияния времени/часового пояса)
  const d0 = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  ).getTime();
  const d1 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();

  const diffDays = Math.floor((d1 - d0) / (24 * 60 * 60 * 1000));
  return diffDays + 1; // 1..N
}

/**
 * Поинты:
 * day1 = 2
 * day2 = 3
 * dayN = 100% day(N-2) + 60% day(N-1)
 * После расчёта округляем (как в ТЗ).
 */
export function calcDailyPoints(date: Date): number {
  const n = dayOfSeason(date);

  if (n <= 0) throw new Error("Invalid day of season calculation");
  if (n === 1) return 2;
  if (n === 2) return 3;

  let p1 = 2; // day 1
  let p2 = 3; // day 2

  for (let i = 3; i <= n; i++) {
    const raw = p1 + 0.6 * p2;
    const p = Math.round(raw); // округляем итог дня
    p1 = p2;
    p2 = p;
  }

  return p2;
}

/**
 * Формат отображения:
 * - округление уже сделано в calcDailyPoints
 * - если > 1000, показываем в K (28745 -> 29K)
 */
export function formatPoints(points: number): string {
  const p = Math.round(points);

  if (p > 1000) {
    return `${Math.round(p / 1000)}K`;
  }

  return String(p);
}
