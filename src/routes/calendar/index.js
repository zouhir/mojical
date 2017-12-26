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
  ["user", "today", "selectedDate", "monthStartDay", "calendar"],
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
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let { setToday } = this.props;
    setToday({ year, month, day });

    let { uid, authToken } = this.props.user;
    feelingsService
      .get({ uid, year, month: month }, authToken)
      .then(response => {
        this.props.setFeelinginCalendar({ year, month, day, response });
      });
  }

  postFeeling = feeling => {
    let { uid, authToken } = this.props.user;
    let { year, month, day } = this.props.selectedDate;
    let feelingObject = { [day]: { feeling } };
    this.props.setFeelinginCalendar({
      year,
      month,
      day,
      response: feelingObject
    });
    feelingsService
      .post({ uid, year, month: month, day, feeling }, true, authToken)
      .then(r => console.log(r));
  };

  // Note: `user` comes from the URL, courtesy of our router
  render({
    user,
    today,
    selectedDate,
    selectDate,
    monthStartDay,
    calendar,
    incrementMonth,
    decrementMonth,
    resetDaySelection
  }) {
    return (
      <div className={style.calendar}>
        <div className={style.cardContainer}>
          <div className={style.mainCard}>
            {selectedDate && (
              <Calendar
                selectedDate={selectedDate}
                userDeviceDate={today}
                monthFillers={monthStartDay}
                calendarPage={calendar[selectedDate.year][selectedDate.month]}
                incrementMonth={incrementMonth}
                decrementMonth={decrementMonth}
                selectDate={selectDate}
              />
            )}
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
