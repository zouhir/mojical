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

const PageHeader = connect(["selectedMonth"], actions)(
  ({ setDate, toggleNav, selectedMonth, goToCal }) => {
    return (
      <header className={style.pageHeader}>
        <button className={style.menu} onClick={toggleNav} />
        <span className={style.label}>{MONTHS[selectedMonth - 1]}</span>
        {/* <button
        className={style.quickAction}
        style={{ backgroundImage: `url(../../assets/${quickAction}.svg)` }}
      /> */}
      </header>
    );
  }
);

export default PageHeader;
