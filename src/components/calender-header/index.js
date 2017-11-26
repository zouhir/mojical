import { h, Component } from "preact";

import style from "./style.scss";

const CalendarHeader = ({ month, updateMonth }) => {
  return (
    <div className={style.calHeader}>
      <header>
        <button
          className={style.left}
          aria-label="Previous Month"
          onClick={() => updateMonth(-1)}
        />
        {month}
        <button
          className={style.right}
          aria-label="Next Month"
          onClick={() => updateMonth(+1)}
        />
      </header>
    </div>
  );
};

export default CalendarHeader;
