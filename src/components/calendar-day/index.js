import { h, Component } from "preact";
import cx from "classnames";

import style from "./style.scss";
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["today", "selectedMonth", "selectedDay"], actions)
class Day extends Component {
  render({
    day,
    selectedDay,
    selectedMonth,
    currentMonth,
    selectDay,
    feeling,
    today
  }) {
    let cls = cx(
      style.day,
      feeling && style.feeling,
      day === today.day && currentMonth === today.month && style.today,
      selectedDay === day && selectedMonth === currentMonth && style.selected
    );
    return (
      <button
        className={cls}
        onClick={() => {
          return selectDay(day);
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
