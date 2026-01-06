export type IconType =
  | "check"
  | "arrow"
  | "apple"
  | "payment"
  | "target"
  | "amazon"
  | "spotify"
  | "star"
  | "back";

export type TransactionType = "payment" | "credit";

export type Transaction = {
  id: string;

  type: TransactionType;

  amount: number; // всегда положительное число

  name: string; // Apple, IKEA, Target и т.д.
  description: string;

  date: Date;

  pending?: boolean;

  authorizedUser?: string; // если операция не владельцем карты

  icon: IconType; // для генерации иконки/цвета (опционально)
};

/** Что будет удобно рендерить в UI */
export type TransactionVM = {
  id: string;

  title: string; // Apple / Payment / IKEA
  subtitle: string; // "Pending - Card Number Used" / "From ..."

  rightAmountText: string; // "$14.06" / "+$174.00"
  dateText: string; // "Tuesday" / "10/1/22" (или твой формат)

  // для иконки (пока заглушки)
  icon: IconType;
};
