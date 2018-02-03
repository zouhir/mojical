import { h, Component } from "preact";
import cx from "classnames";
import style from "./style.scss";

import Day from "../calendar-day";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["calendar", "selectedMonth", "selectedDay"], actions)
class Calendar extends Component {
  render({ currentMonth, calendar, renderDays }) {
    let currentMonthCalendar = calendar[currentMonth];
    return (
      <div className={style.cal}>
        {DAYS.map(d => <div className={style.heading}>{d}</div>)}
        {renderDays &&
          Object.keys(currentMonthCalendar).map((d, idx) => {
            let dayObj = currentMonthCalendar[d];
            if (idx === 0 && dayObj.day > 0) {
              let startDay = dayObj.day;
              let daysArr = [];
              for (let i = 0; i <= startDay; i++) {
                i === startDay
                  ? daysArr.push(
                      <Day
                        day={+d}
                        currentMonth={currentMonth}
                        feeling={dayObj.feeling}
                      />
                    )
                  : daysArr.push(<div />);
              }
              return daysArr;
            } else {
              return (
                <Day
                  currentMonth={currentMonth}
                  day={+d}
                  feeling={currentMonthCalendar[d].feeling || null}
                />
              );
            }
          })}
      </div>
    );
  }
}

export default Calendar;
