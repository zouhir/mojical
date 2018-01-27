import { h, Component } from "preact";
import cx from "classnames";

import style from "./style.scss";

class Day extends Component {
  render({ day, selectedDate, setDate, feeling, today, disabled, chooseDay }) {
    let classes = cx(
      style.day,
      feeling && style.feeling,
      today && style.today,
      day === selectedDate.day && style.selected
    );
    return (
      <button
        disabled={disabled}
        className={classes}
        onClick={() => {
          return setDate({ day });
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
