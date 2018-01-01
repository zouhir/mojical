import { h, Component } from "preact";

import style from "./style.scss";

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

const PageHeader = ({
  selectDate,
  toggleNav,
  path,
  validAuth,
  selectedDate,
  dragToCalendar
}) => {
  let { month } = selectedDate;
  return (
    <header className={style.pageHeader}>
      <button className={style.menu} onClick={toggleNav} />
      <select
        name="text"
        onChange={e => {
          let sd = Object.assign({}, selectedDate);
          sd.month = e.target.value;
          selectDate(sd);
          dragToCalendar(sd.month);
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
};

export default PageHeader;
