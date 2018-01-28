import { h, Component } from "preact";

import style from "./style.scss";

import Calendar from "../calender";
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["calendar", "selectedDate"], actions)
class Carousel extends Component {
  render({ selectedDate, calendar, selectDate }) {
    return (
      <div id="carousel" className={style.carousel}>
        {Object.keys(calendar).map((mc, idx) => {
          let selectedMonth = +selectedDate.month;
          let monthToRender = +mc;
          if (
            monthToRender === selectedMonth - 1 ||
            monthToRender === selectedMonth ||
            monthToRender === selectedMonth + 1
          ) {
            return (
              <Calendar
                currentMonthCalendar={calendar[mc]}
                selectDate={selectDate}
                selectedDate={selectedDate}
                key={idx}
              />
            );
          }
          return (
            <Calendar
              currentMonthCalendar={{}}
              selectDate={selectDate}
              selectedDate={selectedDate}
              key={idx}
            />
          );
        })}
      </div>
    );
  }
}

export default Carousel;
