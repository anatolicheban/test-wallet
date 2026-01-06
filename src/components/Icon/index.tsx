import Styles from "./styles.module.scss";
import { ICONS } from "@assets/icons";
import type { IconType } from "@/types";
import type { FC } from "react";

type Props = {
  name: IconType;
  size?: number;
  alt?: string;
};

export const Icon: FC<Props> = ({ name, alt, size }) => {
  return (
    <div
      className={Styles.icon}
      style={{
        width: size || 16,
        height: size || 16,
      }}
    >
      <img src={ICONS[name]} alt={alt || "icon"} />
    </div>
  );
};
