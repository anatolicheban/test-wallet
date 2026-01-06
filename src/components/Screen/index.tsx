import Styles from "./styles.module.scss";
import { TransactionDetail, TransactionsList } from "@/views";
import { useState } from "react";
import type { Transaction } from "@/types";

export const Screen = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  return (
    <div className={Styles.screen}>
      <div className={Styles.screenContent}>
        {selectedTransaction ? (
          <TransactionDetail
            onBack={() => setSelectedTransaction(null)}
            transaction={selectedTransaction}
          />
        ) : (
          <TransactionsList onSelect={setSelectedTransaction} />
        )}
      </div>
      <div className={Styles.phoneLine}></div>
    </div>
  );
};
