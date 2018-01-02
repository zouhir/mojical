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

let noSyncDelta = 0;

@connect(
  ["user", "today", "lastSync", "selectedDate", "monthStartDays", "calendar"],
  actions
)
class CalendarPage extends Component {
  state = {
    loading: true,
    slideUp: false,
    transformBasePx: 0,
    currentTransform: 0
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
    let paddedCalendarEl = this.base.querySelector("#paddedCal");
    let paddedCalendarElWidth = paddedCalendarEl.offsetWidth;
    this.setState({ transformBasePx: paddedCalendarElWidth - 10 });
    paddedCalendarElWidth -= 20;
    let allCalendarsEl = this.base.querySelector("#allCalendars");
    allCalendarsEl.style.width = paddedCalendarElWidth * 12 + "px";
    allCalendarsEl.addEventListener("mousedown", e =>
      this.startDrag(e, allCalendarsEl)
    );
    allCalendarsEl.addEventListener("touchstart", e =>
      this.startDrag(e, allCalendarsEl)
    );
    allCalendarsEl.addEventListener("mousemove", e =>
      this.drag(e, allCalendarsEl)
    );
    allCalendarsEl.addEventListener("touchmove", e =>
      this.drag(e, allCalendarsEl)
    );
    allCalendarsEl.addEventListener("mouseup", e =>
      this.stopDrag(e, allCalendarsEl)
    );
    allCalendarsEl.addEventListener("touchend", e =>
      this.stopDrag(e, allCalendarsEl)
    );
  }

  startDrag = (event, el) => {
    if (this.state.selectedDate && this.state.selectedDate.day) {
      return this.setState({
        dragging: false,
        startX: null
      });
    }
    this.setState({
      dragging: true,
      startX: event.clientX || event.touches[0].clientX
    });
  };

  drag = (event, el) => {
    if (!this.state.dragging) return;
    if (this.props.selectedDate.day) return;
    let deltaX =
      (event.clientX || event.touches[0].clientX) - this.state.startX;
    let { currentTransform } = this.state;
    noSyncDelta = deltaX;
    requestAnimationFrame(() => {
      el.style.transform = `translateX(${Math.round(
        deltaX + currentTransform
      )}px)`;
    });
    event.preventDefault();
    event.stopPropagation();
  };

  stopDrag = (event, el) => {
    if (!this.state.dragging) return;
    let deltaX = noSyncDelta;
    this.setState({ dragging: false });
    let absDeltaX = Math.abs(deltaX);
    let { month } = this.props.selectedDate;
    let { transformBasePx, currentTransform } = this.state;
    let decrement = deltaX > 0 ? true : false;
    if (
      !absDeltaX ||
      absDeltaX < transformBasePx / 4 ||
      (decrement && month === 1) ||
      (!decrement && month === 12)
    ) {
      return requestAnimationFramePromise()
        .then(_ => requestAnimationFramePromise())
        .then(_ => {
          el.style.transition = `transform 0.1s ease-in-out`;
          el.style.transform = `translateX(${currentTransform}px)`;
          return transitionEndPromise(this.base);
        })
        .then(_ => {
          el.style.transition = "";
        });
    }
    console.log(currentTransform);
    console.log(transformBasePx);
    let offset = 0;
    if (decrement) {
      offset = currentTransform + transformBasePx;
    } else {
      offset = currentTransform - transformBasePx;
    }
    requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        el.style.transition = `transform 0.2s ease-in-out`;

        el.style.transform = `translateX(${offset}px)`;
        return transitionEndPromise(this.base);
      })
      .then(_ => {
        el.style.transition = "";
        return requestAnimationFramePromise();
      })
      .then(_ => {
        this.setState({ currentTransform: offset });
        if (decrement) {
          return this.props.decrementMonth();
        }
        this.props.incrementMonth();
      });
  };

  dragToCalendar = month => {
    let el = this.base.querySelector("#allCalendars");
    let { transformBasePx } = this.state;
    let currentTransform = transformBasePx * (+month - 1) * -1;
    requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        el.style.transition = `transform 0.3s ease-out`;
        el.style.transform = `translateX(${currentTransform}px)`;
        return transitionEndPromise(this.base);
      })
      .then(_ => {
        el.style.transition = "";
        return requestAnimationFramePromise();
      })
      .then(_ => {
        console.log(currentTransform);
        this.setState({ currentTransform: currentTransform });
      });
  };

  setCalendarRootEl = (key, base) => {
    let cal = this.state.calendarsBaseEl.slice(0);
    cal[key] = base;
    this.setState({ calendarsBaseEl: cal });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.selectedDate.day) {
      this.setState({ slideUp: true });
    } else {
      this.setState({ slideUp: false });
    }
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
  render(
    {
      user,
      today,
      selectedDate,
      selectDate,
      monthStartDays,
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
          selectDate={selectDate}
          dragToCalendar={this.dragToCalendar}
        />
        <div className={slidingCalClasses}>
          <Gallery />
          <section id="paddedCal" className={style.paddedCalendar}>
            <div className={style.shadow} />
            <div className={style.singleCal}>
              <div id="allCalendars" className={style.allCalendars}>
                {Object.keys(calendar).map((k, idx) => (
                  <Calendar
                    key={idx}
                    index={idx}
                    selectedDate={selectedDate}
                    userDeviceDate={today}
                    monthFillers={monthStartDays[k]}
                    calendarPage={calendar[k]}
                    incrementMonth={incrementMonth}
                    decrementMonth={decrementMonth}
                    selectDate={selectDate}
                    setCalendarRootEl={this.setCalendarRootEl}
                  />
                ))}
              </div>
            </div>
          </section>
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
