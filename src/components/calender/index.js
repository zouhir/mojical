import { h, Component } from "preact";

import style from "./style.scss";
import getDaysInMonth from "date-fns/get_days_in_month";
import getDay from "date-fns/get_day";
import CalendarHeader from "../calender-header";
import Day from "../day";

import "../../lib/database";
import firebase from "../../lib/firebase";

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

    // check for data
    this.readMonthFeelings();
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
        monthDays.push({ day: i, feeling: null });
      }
    }
    this.setState({ monthDays: monthDays });
  };

  updateMonth = value => {
    let month = this.state.month;
    month += value;
    if (month >= 0 && month <= 11) {
      this.setState({ month });
      this.setCurrentMonthDays();
    }
    // check for data
    this.readMonthFeelings();
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

  postFeeling = feeling => {
    let userId = firebase.auth().currentUser.uid;
    let { year, month, day } = this.state.selectedDate;
    firebase
      .database()
      .ref(`calendar/${userId}/${year}-${month}`)
      .update({
        [day]: feeling
      });
  };

  readMonthFeelings = () => {
    var userId = firebase.auth().currentUser.uid;
    let { year, month } = this.state;
    return firebase
      .database()
      .ref(`calendar/${userId}/${year}-${month}`)
      .once("value")
      .then(snapshot => {
        let vals = snapshot.val();
        let m = this.state.monthDays.map(d => {
          if (d && vals && d.day && vals[d.day]) {
            return { day: d.day, feeling: vals[d.day] };
          }
          return d;
        });
        this.setState({ monthDays: m });
      });
  };

  render({}, { month, year, monthDays, selectedDate, currentUserDate }) {
    return (
      <div className={style.cal}>
        <CalendarHeader
          month={this.monthToString()}
          updateMonth={this.updateMonth}
        />
        <section>
          <ul className={style.headers}>{DAYS.map(d => <li>{d}</li>)}</ul>
          <ul className={style.body}>
            {monthDays.map((d, idx) => (
              <li>
                <Day
                  day={d ? d.day : null}
                  feeling={d ? d.feeling : null}
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
        {selectedDate.day > -1 && (
          <Feeling selectedDate={selectedDate} postFeeling={this.postFeeling} />
        )}
      </div>
    );
  }
}

export default Calendar;
