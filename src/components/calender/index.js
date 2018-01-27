import { h, Component } from "preact";
import cx from "classnames";
import style from "./style.scss";

import Day from "../calendar-day";
import IndicatorButton from "../indicator-button";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class Calendar extends Component {
  emptyDaysList = ln => {
    let nullDays = [];
    for (let i = 0; i < ln; i++) {
      nullDays.push(null);
    }
    return nullDays;
  };
  render({
    index,
    selectedDate,
    userDeviceDate,
    calendarPage,
    monthFillers,
    setDate
  }) {
    let classes = cx(
      style.cal,
      selectedDate && selectedDate.day && style.shadow
    );
    console.log(calendarPage);
    return (
      <div className={classes}>
        {DAYS.map(d => <div className={style.heading}>{d}</div>)}
        {monthFillers > 0 && this.emptyDaysList(monthFillers).map(d => <div />)}
        {calendarPage &&
          Object.keys(calendarPage).map((d, idx) => {
            return (
              <div className={style.cell}>
                <Day
                  day={+d}
                  feeling={calendarPage[d].feeling || null}
                  userDeviceDate={userDeviceDate}
                  selectedDate={selectedDate}
                  setDate={setDate}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

export default Calendar;
