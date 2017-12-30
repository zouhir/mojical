import { h } from "preact";
import cx from "classnames";
import style from "./style.scss";

const Day = ({
  day,
  selectedDate,
  selectDate,
  feeling,
  today,
  disabled,
  chooseDay
}) => {
  let classes = cx(
    style.day,
    feeling && style.hasFeeling,
    today && style.today,
    {
      [style.selected]: day === selectedDate.day
    }
  );
  if (day !== null)
    return (
      <button
        disabled={disabled}
        className={classes}
        onClick={e => {
          console.log("clkickkkkkkkkkkkkkkkkkkkkkkkk");
          selectDate({
            year: selectedDate.year,
            month: selectedDate.month,
            day: day
          });
        }}
      >
        <div
          className={style.feeling}
          style={
            feeling
              ? { backgroundImage: `url(../../assets/emojis/${feeling}.svg)` }
              : {}
          }
        />
        <span>{day}</span>
      </button>
    );
  return null;
};

export default Day;
