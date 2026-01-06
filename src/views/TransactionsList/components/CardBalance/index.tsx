import Styles from "./styles.module.scss";
import { randomInRange } from "@/utils";
import { VARIABLES } from "@/data";

const CARD_BALANCE = randomInRange(10, 200);

export const CardBalance = () => {
  return (
    <div className={Styles.cardBalance}>
      <p>Card Balance</p>
      <h4>${CARD_BALANCE.toFixed(2)}</h4>
      <p>${(VARIABLES.CARD_LIMIT - CARD_BALANCE).toFixed(2)} Available</p>
    </div>
  );
};
