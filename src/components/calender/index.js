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

const FEELINGS = ["happiness", "love", "surprise", "anger", "fear", "sadness"];

const Feeling = ({ selectedDate, postFeeling }) => (
  <div className={style.feeling}>
    <div className={style.day}>{selectedDate.day}</div>
    <ul className={style.moji}>
      {FEELINGS.map(f => (
        <li>
          <button
            aria-label={`feeling ${f}`}
            onClick={() => postFeeling(f.toLowerCase())}
            style={{ backgroundImage: `url(../../assets/emojis/${f}.svg)` }}
          />
        </li>
      ))}
    </ul>
  </div>
);

class Calendar extends Component {
  state = {
    day: null,
    month: null,
    year: null,
    monthDays: [],
    currentUserDate: null,
    selectedDate: { day: -1, month: -1 }
  };
  componentDidMount() {
    let date = new Date();
    // get currentMonth user's in
    let currentMonth = date.getMonth();
    // get current year user's in
    let currentYear = date.getFullYear();

    let currentDay = date.getDate();

    this.setState({
      month: currentMonth,
      year: currentYear,
      day: currentDay,
      currentUserDate: {
        month: currentMonth,
        year: currentYear,
        day: currentDay
      }
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

  selectDay = ({ day, month }) => {
    this.setState({
      selectedDate: {
        day: day,
        month: month,
        year: this.state.year
      }
    });
  };

  postFeeling = () => {};

  render({}, { month, year, monthDays, selectedDate, currentUserDate }) {
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
                <Day
                  day={d}
                  month={month}
                  year={year}
                  currentUserDate={currentUserDate}
                  selectedDate={selectedDate}
                  selectDay={this.selectDay}
                />
              </li>
            ))}
          </ul>
        </section>
        {selectedDate.day > -1 && <Feeling selectedDate={selectedDate} />}
      </div>
    );
  }
}

export default Calendar;
