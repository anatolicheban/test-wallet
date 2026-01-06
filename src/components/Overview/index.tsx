import Styles from "./styles.module.scss";

export const Overview = () => {
  return (
    <div className={Styles.overview}>
      <h1>The Wallet App</h1>
      <p>
        This is test task provided by Get report. The task was completed by{" "}
        <a
          href="https://www.linkedin.com/in/anatoli-cheban-251959246/"
          target={"_blank"}
        >
          Anatoli Cheban
        </a>
        . You can view the source code <a href="#">here</a>. Enjoy!
      </p>
    </div>
  );
};
