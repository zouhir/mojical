import { h, Component } from "preact";

import style from "./style.scss";
import getDaysInMonth from "date-fns/get_days_in_month";
import getDay from "date-fns/get_day";
import CalendarHeader from "../calender-header";
import Day from "../day";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const ToolTip = () => (
  <div className={style.tooltip}>
    asas
    <ul>
      <li>shshjs</li>
    </ul>
  </div>
);

class Calendar extends Component {
  state = {
    month: null,
    year: null,
    monthDays: []
  };
  componentDidMount() {
    let date = new Date();
    // get currentMonth user's in
    let currentMonth = date.getMonth();
    // get current year user's in
    let currentYear = date.getFullYear();

    this.setState({
      month: currentMonth,
      year: currentYear
    });

    this.setCurrentMonthDays();
  }
  monthToString = () => {
    return MONTHS[this.state.month];
  };

  setCurrentMonthDays = () => {
    let monthStartIndex = 1;
    // get days in this month
    let daysInCurrentMonth = getDaysInMonth(
      new Date(this.state.year, this.state.month)
    );

    // get firs day of this month
    let monthStartDay = getDay(new Date(this.state.year, this.state.month, 1));
    let monthDays = [];
    for (
      let i = monthStartIndex - monthStartDay;
      i <= daysInCurrentMonth;
      i++
    ) {
      if (i < 1) {
        monthDays.push(null);
      } else {
        monthDays.push(i);
      }
    }
    this.setState({ monthDays: monthDays });
  };

  updateMonth = value => {
    let month = this.state.month;
    month += value;
    console.log(month);
    if (month >= 0 && month <= 11) {
      this.setState({ month });
      this.setCurrentMonthDays();
    }
  };

  render({}, { month, year, monthDays }) {
    return (
      <div className={style.cal}>
        <CalendarHeader
          month={this.monthToString()}
          updateMonth={this.updateMonth}
        />
        <section>
          {/* <ToolTip /> */}
          <ul className={style.headers}>{DAYS.map(d => <li>{d}</li>)}</ul>
          <ul className={style.body}>
            {monthDays.map((d, idx) => (
              <li>
                <Day value={d} day={idx - 1} month={month} year={year} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

export default Calendar;
