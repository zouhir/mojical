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

const PageHeader = connect(["selectedDate"], actions)(
  ({ setDate, toggleNav, selectedDate, goToCal }) => {
    let { month } = selectedDate;
    return (
      <header className={style.pageHeader}>
        <button className={style.menu} onClick={toggleNav} />
        <select
          name="text"
          onChange={e => {
            setDate({ month: +e.target.value });
            goToCal(+e.target.value);
          }}
        >
          {MONTHS.map((m, i) => {
            return (
              <option value={i + 1} selected={i === month - 1}>
                {m}
              </option>
            );
          })}
        </select>
        {/* <button
        className={style.quickAction}
        style={{ backgroundImage: `url(../../assets/${quickAction}.svg)` }}
      /> */}
      </header>
    );
  }
);

export default PageHeader;
