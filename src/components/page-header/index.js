import { h, Component } from "preact";

import style from "./style.scss";
import { connect } from "unistore/preact";
import { actions } from "../../store";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const PageHeader = connect(["today", "selectedMonth"], actions)(
  ({ today, setDate, toggleNav, selectedMonth, goToCal, selectDay, selectMonth }) => {
    return (
      <header className={style.pageHeader}>
        <button className={style.menu} onClick={toggleNav} />
        <span className={style.label}>{MONTHS[selectedMonth - 1]}</span>
        <button
          className={style.quickAction}
          style={{ backgroundImage: `url(../../assets/Calendar.svg)` }}
          onClick={() => {
            console.log(today);
            goToCal(today.month);
            selectMonth(today.month);
            selectDay(today.day);
          }}
        />
      </header>
    );
  }
);

export default PageHeader;
