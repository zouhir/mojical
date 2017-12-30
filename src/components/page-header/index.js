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

const PageHeader = ({ toggleNav, path, validAuth, selectedDate }) => {
  let { month } = selectedDate;
  let quickAction = path === "/" ? "Feed" : "Calendar";
  return (
    <header className={style.pageHeader}>
      <button className={style.menu} onClick={toggleNav} />
      <select
        name="text"
        onChange={e => {
          console.log(e.target.selectedIndex);
        }}
      >
        {MONTHS.map((m, i) => {
          return (
            <option value={m} selected={i === month - 1}>
              {m}
            </option>
          );
        })}
      </select>
      <button
        className={style.quickAction}
        style={{ backgroundImage: `url(../../assets/${quickAction}.svg)` }}
      />
    </header>
  );
};

export default PageHeader;
