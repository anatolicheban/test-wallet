import Styles from "./styles.module.scss";
import type { Transaction } from "@/types";
import { Icon } from "@components/Icon";
import { toTransactionVM } from "@/utils/transactions.ts";

type Props = {
  transaction: Transaction;
  onBack(): void;
};

export const TransactionDetail = ({ transaction, onBack }: Props) => {
  const transactionVM = toTransactionVM(transaction);

  return (
    <>
      <header className={Styles.header}>
        <button onClick={onBack} className={Styles.backBtn}>
          <Icon name={"back"} />
        </button>
      </header>

      <main className={Styles.main}>
        <div className={Styles.amountBlock}>
          <div className={Styles.amount}>{transactionVM.rightAmountText}</div>
          <div className={Styles.merchant}>{transactionVM.title}</div>
          <div className={Styles.dateTime}>{transactionVM.dateText}</div>
        </div>
        <section className={Styles.card}>
          <div className={Styles.row}>
            <div className={Styles.left}>
              <div className={Styles.rowTitle}>Status: Approved</div>
              <div className={Styles.rowSub}>{transactionVM.subtitle}</div>
            </div>
          </div>

          <div className={Styles.divider} />

          <div className={Styles.row}>
            <div className={Styles.rowTitle}>Total</div>
            <div className={Styles.total}>{transactionVM.rightAmountText}</div>
          </div>
        </section>
      </main>
    </>
  );
};
