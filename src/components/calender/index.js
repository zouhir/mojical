import { h, Component } from "preact";

import style from "./style.scss";
import CalendarHeader from "../calender-header";
import Day from "../day";
import Feelings from "../feelings";

import "../../lib/database";

import { monthToString } from "../../lib/calendar-utils";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

class Calendar extends Component {
  render({ selectedDate, userDeviceDate, calendarPage }) {
    return (
      <div className={style.cal}>
        <CalendarHeader
          month={monthToString(selectedDate.month)}
          changeMonth={this.props.changeMonth}
        />
        <section>
          <ul className={style.headers}>{DAYS.map(d => <li>{d}</li>)}</ul>
          <ul className={style.body}>
            {calendarPage.fillers.map(d => <li />)}
            {Object.keys(calendarPage.days).map((d, idx) => {
              let disabled = false;
              let today = false;
              if (selectedDate.month > userDeviceDate.month) {
                disabled = true;
              }
              if (
                selectedDate.month === userDeviceDate.month &&
                d &&
                +d > userDeviceDate.day
              ) {
                disabled = true;
              }
              if (
                selectedDate.month === userDeviceDate.month &&
                d &&
                +d === userDeviceDate.day
              ) {
                today = true;
              }
              return (
                <li>
                  <Day
                    day={+d}
                    feeling={calendarPage.days[d].feeling || null}
                    userDeviceDate={userDeviceDate}
                    selectedDate={selectedDate}
                    disabled={disabled}
                    today={today}
                    chooseDay={this.props.chooseDay}
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
