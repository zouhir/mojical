import { h, Component } from "preact";
import cx from "classnames";

import style from "./style.scss";

class Day extends Component {
  render({ day, month, selectedDate, selectDate, feeling, today }) {
    let classes = cx(
      style.day,
      feeling && style.feeling,
      today && style.today,
      selectedDate.day === day && selectDate.month === month && style.selected
    );
    return (
      <button
        className={classes}
        onClick={() => {
          return selectDate({ day });
        }}
        style={
          feeling && {
            backgroundImage: `url(../../assets/emojis/${feeling}.svg)`
          }
        }
      >
        <span>{day}</span>
      </button>
    );
  }
}

export default Day;
