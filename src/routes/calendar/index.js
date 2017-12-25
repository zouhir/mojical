import { h, Component } from "preact";
import style from "./style.scss";

// components
import Calendar from "../../components/calender";
import Footer from "../../components/footer";

// util
import { getFromCalendar, postToCalendar } from "../../lib/rest";

//store
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(
  ["user", "today", "selectedDate", "monthStartDay", "monthCalendar"],
  actions
)
class CalendarPage extends Component {
  state = {
    monthFillers: 0,
    calendarPage: {},
    loading: true,
    seletedDateState: null
  };
  componentDidMount() {
    console.log("mounted");
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let { setToday } = this.props;
    this.setState({ seletedDateState: "asas" });
    setToday({ year, month, day });
  }

  postFeeling = feeling => {
    let userId = firebase.auth().currentUser.uid;
    let { year, month, day } = this.state.selectedDate;
    let selectedDate = Object.assign({}, this.state.selectedDate);
    let oldCalendarPage = Object.assign({}, this.state.calendarPage);

    let calendarPage = Object.assign({}, oldCalendarPage, {
      [day]: { feeling: feeling }
    });

    let allCalendars = {};
    if (!allCalendars[year]) {
      allCalendars[year] = {};
    }
    allCalendars[year][month] = calendarPage;

    this.setState({ calendarPage });

    postToCalendar(
      { userId, year, month: month + 1, day, feeling },
      this.props.authToken
    ).then(res => {
      if (res) {
        let newCal = {};
        newCal = Object.assign({}, this.state.calendarPage, res);
        let allCalendars = {};
        if (!allCalendars[year]) {
          allCalendars[year] = {};
        }
        allCalendars[year][month] = newCal;
        this.setState({ calendarPage: newCal, allCalendars });
      }
    });
  };

  readMonthFeelings = () => {
    let { year, month } = this.state.selectedDate;
    if (this.state.allCalendars[year][month]) {
      this.setState({ calendarPage: this.state.allCalendars[year][month] });
    }

    var userId = firebase.auth().currentUser.uid;
    getFromCalendar(
      { userId, year, month: month + 1 },
      this.props.authToken
    ).then(res => {
      if (res) {
        let newCal = {};
        newCal = Object.assign({}, this.state.calendarPage, res);
        let allCalendars = {};
        if (!allCalendars[year]) {
          allCalendars[year] = {};
        }
        allCalendars[year][month] = newCal;
        this.setState({ calendarPage: newCal, allCalendars });
      }
    });
  };

  // Note: `user` comes from the URL, courtesy of our router
  render({
    user,
    today,
    selectedDate,
    selectDate,
    monthStartDay,
    monthCalendar,
    incrementMonth,
    decrementMonth,
    resetDaySelection
  }) {
    return (
      <div className={style.calendar}>
        <div className={style.cardContainer}>
          <div className={style.mainCard}>
            <Calendar
              selectedDate={selectedDate}
              userDeviceDate={today}
              monthFillers={monthStartDay}
              calendarPage={monthCalendar}
              incrementMonth={incrementMonth}
              decrementMonth={decrementMonth}
              selectDate={selectDate}
            />
          </div>
        </div>
        <Footer
          postFeeling={this.postFeeling}
          selectedDate={selectedDate}
          resetDaySelection={resetDaySelection}
        />
      </div>
    );
  }
}

export default CalendarPage;
