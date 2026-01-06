import Styles from "./styles.module.scss";
import {
  calcDailyPoints,
  formatPoints,
} from "@/views/TransactionsList/components/DailyPoints/calcPoints.ts";

export const DailyPoints = () => {
  return (
    <div className={Styles.dailyPoints}>
      <p> Daly Points</p>
      <p>{formatPoints(calcDailyPoints(new Date()))}</p>
    </div>
  );
};
