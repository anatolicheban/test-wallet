export function randomInRange(
  min: number,
  max: number,
  decimals: number = 2,
): number {
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }
  const value = Math.random() * (max - min) + min;

  return roundTo(value, decimals);
}

export function roundTo(n: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}
