import { h } from "preact";
import cx from "classnames";
import style from "./style.scss";

const Day = ({
  day,
  selectedDate,
  setDate,
  feeling,
  today,
  disabled,
  chooseDay
}) => {
  let classes = cx(
    "custom-touch",
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
          if (selectedDate.day === day) {
            return;
          }
          setDate({
            day: day
          });
        }}
      >
        <div
          className={style.feeling + " custom-touch"}
          style={
            feeling
              ? { backgroundImage: `url(../../assets/emojis/${feeling}.svg)` }
              : {}
          }
        />
        <span className="custom-touch">{day}</span>
      </button>
    );
  return null;
};

export default Day;
