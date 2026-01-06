import Styles from "./styles.module.scss";
import { Icon } from "@components/Icon";

const month = new Date()
  .toLocaleString("en-US", { month: "long" })
  .replace(/^./, (c) => c.toUpperCase());

export const NoPaymentsDue = () => {
  return (
    <div className={Styles.noPaymentsDue}>
      <div>
        <p>No Payment Due</p>
        <p>You`ve paid your {month} balance</p>
      </div>
      <div className={Styles.check}>
        <Icon size={24} name={"check"} />
      </div>
    </div>
  );
};
