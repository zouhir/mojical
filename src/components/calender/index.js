import { h, Component } from "preact";
import cx from "classnames";
import style from "./style.scss";

import Day from "../calendar-day";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class Calendar extends Component {
  render({ today, selectedDate, selectDate, currentMonthCalendar }) {
    return (
      <div className={style.cal}>
        {DAYS.map(d => <div className={style.heading}>{d}</div>)}
        {Object.keys(currentMonthCalendar).map((d, idx) => {
          let dayObj = currentMonthCalendar[d];
          if (idx === 0 && dayObj.day > 0) {
            let startDay = dayObj.day;
            let daysArr = [];
            for (let i = 0; i <= startDay; i++) {
              i === startDay
                ? daysArr.push(
                    <div className={style.cell}>
                      <Day
                        day={+d}
                        feeling={dayObj.feeling}
                        selectedDate={selectedDate}
                        selectDate={selectDate}
                      />
                    </div>
                  )
                : daysArr.push(<div />);
            }
            return daysArr;
          } else {
            return (
              <div className={style.cell}>
                <Day
                  day={+d}
                  feeling={currentMonthCalendar[d].feeling || null}
                  selectedDate={selectedDate}
                  selectDate={selectDate}
                />
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Calendar;
