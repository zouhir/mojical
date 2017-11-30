import { h, Component } from "preact";

import style from "./style.scss";
import CalendarHeader from "../calender-header";
import Day from "../day";
import Feelings from "../feelings";

import "../../lib/database";
import firebase from "../../lib/firebase";

import { calendarPageDays, monthToString } from "../../lib/calendar-utils";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

class Calendar extends Component {
  state = {
    userDeviceDate: {
      day: null,
      month: null,
      year: null
    },
    selectedDate: {
      day: null,
      month: null,
      year: null
    },
    calendarPage: [],
    loading: true
  };
  componentDidMount() {
    let date = new Date();
    // get currentMonth user's in
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let userDeviceDate = {
      day,
      month,
      year
    };
    let selectedDate = userDeviceDate;
    let calendarPage = calendarPageDays(month, year);
    this.setState({
      selectedDate,
      userDeviceDate,
      calendarPage
    });

    // check for data
    this.readMonthFeelings();
  }

  changeMonth = value => {
    let selectedDate = Object.assign({}, this.state.selectedDate);
    selectedDate.month += value;
    if (selectedDate.month >= 0 && selectedDate.month <= 11) {
      let calendarPage = calendarPageDays(
        selectedDate.month,
        selectedDate.year
      );
      this.setState({ selectedDate, calendarPage });
    }
    // check for data
    this.readMonthFeelings();
  };

  chooseDay = ({ day }) => {
    let selectedDate = Object.assign({}, this.state.selectedDate);
    selectedDate.day = day;
    this.setState({
      selectedDate
    });
  };

  postFeeling = feeling => {
    let userId = firebase.auth().currentUser.uid;
    let { year, month, day } = this.state.selectedDate;
    let selectedDate = Object.assign({}, this.state.selectedDate);
    let oldCalendarPage = Object.assign({}, this.state.calendarPage);
    let calendarPage = this.state.calendarPage.map(day => {
      if (day && day.day === selectedDate.day) {
        day.feeling = feeling;
      }
      return day;
    });

    this.setState({ calendarPage });

    let databaseRef = firebase
      .database()
      .ref(`calendar/${userId}/${year}-${month}`);
    databaseRef.update({
      [day]: feeling
    });
    databaseRef.on("value", snapshot => {
      if (!snapshot.val()) {
        this.setState({ calendarPage: oldCalendarPage });
      }
    });
  };

  readMonthFeelings = () => {
    var userId = firebase.auth().currentUser.uid;
    let { year, month } = this.state.selectedDate;
    return firebase
      .database()
      .ref(`calendar/${userId}/${year}-${month}`)
      .once("value")
      .then(snapshot => {
        let vals = snapshot.val();
        this.assignFeelingsToDate(vals);
      });
  };

  assignFeelingsToDate = feelingsSnapshot => {
    let m = this.state.calendarPage.map(d => {
      if (d && feelingsSnapshot && d.day && feelingsSnapshot[d.day]) {
        return { day: d.day, feeling: feelingsSnapshot[d.day] };
      }
      return d;
    });
    this.setState({ calendarPage: m });
  };

  render({}, { selectedDate, userDeviceDate, calendarPage }) {
    return (
      <div className={style.cal}>
        <CalendarHeader
          month={monthToString(selectedDate.month)}
          changeMonth={this.changeMonth}
        />
        <section>
          <ul className={style.headers}>{DAYS.map(d => <li>{d}</li>)}</ul>
          <ul className={style.body}>
            {calendarPage.map((d, idx) => {
              let disabled = false;
              let today = false;
              if (selectedDate.month > userDeviceDate.month) {
                disabled = true;
              }
              if (
                selectedDate.month === userDeviceDate.month &&
                d &&
                d.day > userDeviceDate.day
              ) {
                disabled = true;
              }
              if (
                selectedDate.month === userDeviceDate.month &&
                d &&
                d.day === userDeviceDate.day
              ) {
                today = true;
              }
              return (
                <li>
                  <Day
                    day={d ? d.day : null}
                    feeling={d ? d.feeling : null}
                    userDeviceDate={userDeviceDate}
                    selectedDate={selectedDate}
                    disabled={disabled}
                    today={today}
                    chooseDay={this.chooseDay}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        <Feelings selectedDate={selectedDate} postFeeling={this.postFeeling} />
      </div>
    );
  }
}

export default Calendar;
