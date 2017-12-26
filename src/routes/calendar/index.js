import { h, Component } from "preact";
import style from "./style.scss";

// components
import Calendar from "../../components/calender";
import Footer from "../../components/footer";

// util
import feelingsService from "../../services/feelings";

//store
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(
  ["user", "today", "selectedDate", "monthStartDay", "monthCalendar"],
  actions
)
class CalendarPage extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    console.log("mounted");
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let { setToday } = this.props;
    setToday({ year, month, day });
  }

  postFeeling = feeling => {
    let { uid, authToken } = this.props.user;
    let { year, month, day } = this.props.selectedDate;
    this.props.assignFeeling(feeling);
    feelingsService
      .post({ uid, year, month: month + 1, day, feeling }, true, authToken)
      .then(r => console.log(r));
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
