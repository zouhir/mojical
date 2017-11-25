import { h, Component } from "preact";

import style from "./style.scss";

import CalendarHeader from "../calender-header";

const DAYS = ["s", "m", "t", "w", "t", "f", "s"];

let DAY_NUM = [];
for (let i = 1; i <= 31; i++) {
  DAY_NUM.push(i);
}

const Calendar = () => {
  return (
    <div className={style.cal}>
      <CalendarHeader />
      <section>
        <ul className={style.headers}>{DAYS.map(d => <li>{d}</li>)}</ul>
        <ul className={style.body}>{DAY_NUM.map(d => <li> {d} </li>)}</ul>
      </section>
    </div>
  );
};

export default Calendar;
