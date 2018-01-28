import { h, Component } from "preact";

import style from "./style.scss";
import FeelingsPanel from "../feelings-panel";

const TopSection = () => {
  return (
    <div className={style.top}>
      <FeelingsPanel />
    </div>
  );
};

export default TopSection;
