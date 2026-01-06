import Styles from "./styles.module.scss";
import { mockTransactions } from "@/data";
import { mapTransactionsToVM } from "@/utils/transactions.ts";
import { Icon } from "@components/Icon";
import type { Transaction } from "@/types";
import type { FC } from "react";

const transactionsVM = mapTransactionsToVM(mockTransactions);

type Props = {
  onSelect(t: Transaction): void;
};

export const LatestTransactions: FC<Props> = ({ onSelect }) => {
  return (
    <div className={Styles.latestTransactions}>
      <h2>Latest Transactions</h2>
      <ul className={Styles.list}>
        {transactionsVM.map((tx) => (
          <li
            onClick={() =>
              onSelect(mockTransactions.find((el) => el.id === tx.id)!)
            }
            key={tx.id}
            className={Styles.item}
          >
            {/* ICON */}
            <div className={Styles.icon}>
              <Icon name={tx.icon} size={20} />
            </div>

            {/* MAIN CONTENT */}
            <div className={Styles.content}>
              <div className={Styles.topRow}>
                <span className={Styles.name}>{tx.title}</span>
                <span className={Styles.amount}>
                  {tx.rightAmountText} <Icon name={"arrow"} />
                </span>
              </div>

              <div className={Styles.bottomRow}>
                <span className={Styles.description}>{tx.subtitle}</span>
                <span className={Styles.date}>{tx.dateText}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
