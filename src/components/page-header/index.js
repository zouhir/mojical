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

const PageHeader = ({ validAuth, selectedDate }) => {
  let month = -1;
  if (selectedDate) {
    month = selectedDate.month;
  }
  return (
    <header className={style.pageHeader}>
      <button className={style.menu} />
      {validAuth && (
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
      )}
    </header>
  );
};

export default PageHeader;
