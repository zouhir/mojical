import { h, Component } from "preact";
import style from "./style.scss";
import cx from "classnames";
// components
import Calendar from "../../components/calender";
import Footer from "../../components/footer";
import Gallery from "../../components/gallery";
import PageHeader from "../../components/page-header";

// util
import feelingsService from "../../services/feelings";

//store
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(
  ["user", "today", "lastSync", "selectedDate", "monthStartDay", "calendar"],
  actions
)
class CalendarPage extends Component {
  state = {
    loading: true,
    slideUp: false
  };
  componentDidMount() {
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
        this.props.setFeelinginCalendar({
          year,
          month,
          day,
          response,
          lastSync: Date.now()
        });
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

  componentWillReceiveProps(newProps) {
    if (newProps.selectedDate.day) {
      this.setState({ slideUp: true });
    } else {
      this.setState({ slideUp: false });
    }
  }

  // Note: `user` comes from the URL, courtesy of our router
  render(
    {
      user,
      today,
      selectedDate,
      selectDate,
      monthStartDay,
      calendar,
      incrementMonth,
      decrementMonth,
      resetDaySelection,
      path,
      toggleNav
    },
    { slideUp }
  ) {
    let slidingCalClasses = cx(style.slider, slideUp && style.slide);
    return (
      <div className={style.calendar}>
        <PageHeader
          toggleNav={toggleNav}
          selectedDate={selectedDate}
          path={path}
        />
        <div className={slidingCalClasses}>
          <Gallery />
          {selectedDate.year &&
            selectedDate.month && (
              <section className={style.paddedCalendar}>
                <Calendar
                  selectedDate={selectedDate}
                  userDeviceDate={today}
                  monthFillers={monthStartDay}
                  calendarPage={calendar[selectedDate.year][selectedDate.month]}
                  incrementMonth={incrementMonth}
                  decrementMonth={decrementMonth}
                  selectDate={selectDate}
                />
              </section>
            )}
        </div>
        <Footer
          postFeeling={this.postFeeling}
          selectedDate={selectedDate}
          resetDaySelection={resetDaySelection}
          slideUp={slideUp}
        />
      </div>
    );
  }
}

export default CalendarPage;
