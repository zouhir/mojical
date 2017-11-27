import { h } from "preact";

import style from "./style.scss";

const Day = ({
  value,
  day,
  month,
  year,
  currentUserDate = { month: -1, day: -1 },
  selectedDate = {},
  selectDay,
  feeling
}) => {
  let cx = [style.day];
  if (currentUserDate.day === day && currentUserDate.month === month) {
    cx.push(style.today);
  }
  if (selectedDate.day === day && selectedDate.month === month) {
    cx.push(style.selected);
  }
  if (feeling) {
    cx.push(style.hasFeeling);
  }
  if (day !== null)
    return (
      <button
        className={cx.join(" ")}
        onClick={() => selectDay({ day: day, month: month })}
        style={
          feeling
            ? { backgroundImage: `url(../../assets/emojis/${feeling}.svg)` }
            : {}
        }
      >
        <span>{day}</span>
      </button>
    );
  return null;
};

export default Day;
