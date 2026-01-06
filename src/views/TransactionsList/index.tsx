import Styles from "./styles.module.scss";
import {
  CardBalance,
  DailyPoints,
  LatestTransactions,
  NoPaymentsDue,
} from "@/views/TransactionsList/components";
import type { Transaction } from "@/types";
import type { FC } from "react";

type Props = {
  onSelect(t: Transaction): void;
};

export const TransactionsList: FC<Props> = ({ onSelect }) => {
  return (
    <div className={Styles.transactionsList}>
      <div className={Styles.general}>
        <div className={Styles.left}>
          <CardBalance />
          <DailyPoints />
        </div>
        <NoPaymentsDue />
      </div>
      <LatestTransactions onSelect={onSelect} />
    </div>
  );
};
