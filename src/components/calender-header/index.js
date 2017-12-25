import { h, Component } from "preact";

import style from "./style.scss";

const CalendarHeader = ({ month, decrementMonth, incrementMonth }) => {
  return (
    <div className={style.calHeader}>
      <header>
        <button
          className={style.left}
          aria-label="Previous Month"
          onClick={() => decrementMonth()}
        />
        {month}
        <button
          className={style.right}
          aria-label="Next Month"
          onClick={() => incrementMonth()}
        />
      </header>
    </div>
  );
};

export default CalendarHeader;
