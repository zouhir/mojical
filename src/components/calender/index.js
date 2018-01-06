import { h, Component } from "preact";
import cx from "classnames";
import style from "./style.scss";
import Header from "../calender-header";
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
    return (
      <div className={classes}>
        <section>
          <ul className={style.headers}>{DAYS.map(d => <li>{d}</li>)}</ul>
          <ul className={style.body}>
            {!calendarPage && <h1>loading</h1>}
            {monthFillers > 0 &&
              this.emptyDaysList(monthFillers).map(d => <li />)}
            {calendarPage &&
              Object.keys(calendarPage).map((d, idx) => {
                return (
                  <li>
                    <Day
                      day={+d}
                      feeling={calendarPage[d].feeling || null}
                      userDeviceDate={userDeviceDate}
                      selectedDate={selectedDate}
                      setDate={setDate}
                    />
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
    );
  }
}

export default Calendar;
