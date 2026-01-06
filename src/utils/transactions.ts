import type { Transaction, TransactionVM } from "@/types";

/** ---- Utils ---- */
const MS_DAY = 24 * 60 * 60 * 1000;

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function isWithinLastDays(
  date: Date,
  days: number,
  now: Date = new Date(),
): boolean {
  const a = startOfDay(date).getTime();
  const b = startOfDay(now).getTime();
  const diffDays = Math.floor((b - a) / MS_DAY);
  return diffDays >= 0 && diffDays < days;
}

export function formatWeekday(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);
}

/**
 * Формат даты для "старых" записей.
 * На скрине "10/1/22" — это en-US short.
 */
export function formatShortDate(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  }).format(date);
}

/**
 * Правило ТЗ:
 * - last week => weekday name
 * - older => date
 */
export function formatTransactionDate(
  date: Date,
  opts?: { now?: Date; locale?: string; lastDays?: number },
): string {
  const now = opts?.now ?? new Date();
  const locale = opts?.locale ?? "en-US";
  const lastDays = opts?.lastDays ?? 7;

  return isWithinLastDays(date, lastDays, now)
    ? formatWeekday(date, locale)
    : formatShortDate(date, locale);
}

/**
 * Amount formatting:
 * - payment => "+$174.00"
 * - credit  => "$14.06"
 */
export function formatTransactionAmount(
  t: Pick<Transaction, "type" | "amount">,
  opts?: { currency?: string; locale?: string },
): string {
  const currency = opts?.currency ?? "USD";
  const locale = opts?.locale ?? "en-US";

  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(t.amount);

  return t.type === "payment" ? `+${money}` : money;
}

/**
 * Pending prefix:
 * If pending => "Pending - <description>"
 * else => "<description>"
 */
export function buildSubtitle(
  t: Pick<Transaction, "description" | "pending">,
): string {
  return t.pending ? `Pending - ${t.description}` : t.description;
}

/**
 * Authorized user:
 * If exists => "<User> — <DateText>"
 * else => "<DateText>"
 */
export function buildDateLine(
  t: Pick<Transaction, "authorizedUser">,
  dateText: string,
): string {
  return t.authorizedUser ? `${t.authorizedUser} — ${dateText}` : dateText;
}

/** ---- Mapping ---- */

export function toTransactionVM(
  t: Transaction,
  opts?: { now?: Date; locale?: string; currency?: string; lastDays?: number },
): TransactionVM {
  const locale = opts?.locale ?? "en-US";
  const currency = opts?.currency ?? "USD";

  const dateText = formatTransactionDate(t.date, {
    now: opts?.now,
    locale,
    lastDays: opts?.lastDays,
  });

  const amountText = formatTransactionAmount(t, { locale, currency });

  const subtitle = buildSubtitle(t);
  const dateLine = buildDateLine(t, dateText);

  return {
    id: t.id,
    title: t.name,
    subtitle,
    rightAmountText: amountText,
    dateText: dateLine,
    icon: t.icon,
  };
}

export function mapTransactionsToVM(
  list: Transaction[],
  opts?: { now?: Date; locale?: string; currency?: string; lastDays?: number },
): TransactionVM[] {
  return list.map((t) => toTransactionVM(t, opts));
}
