import { h } from "preact";

import style from "./style.scss";

const Day = ({ value, today }) => {
  if (value !== null) return <div className={style.day}>{value}</div>;
  return null;
};

export default Day;
