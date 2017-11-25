import { h, Component } from "preact";

import style from "./style.scss";

const CalendarHeader = () => {
  return (
    <div className={style.calHeader}>
      <header>
        <button className={style.left} aria-label="Previous Month" />
        Feb
        <button className={style.right} aria-label="Next Month" />
      </header>
    </div>
  );
};

export default CalendarHeader;
