import { h, Component } from "preact";
import style from "./style.scss";
import cx from "classnames";
// components
import Calendar from "../../components/calender";
import Footer from "../../components/footer";
import Gallery from "../../components/gallery";
import PageHeader from "../../components/page-header";
import IndicatorButton from "../../components/indicator-button";

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
    slideUp: false
  };
  animationParams = {
    startX: 0,
    dragging: false,
    deltaX: 0,
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
    let allCal = this.base.querySelector(".allCal");
    this.animationParams.transformBasePx = paddedCalendarEl.offsetWidth - 10;
    allCal.addEventListener("mousedown", e => this.startDrag(e, allCal));
    allCal.addEventListener("touchstart", e => this.startDrag(e, allCal));
    allCal.addEventListener("mousemove", e => this.drag(e, allCal));
    allCal.addEventListener("touchmove", e => this.drag(e, allCal));
    allCal.addEventListener("mouseup", e => this.stopDrag(e, allCal));
    allCal.addEventListener("touchend", e => this.stopDrag(e, allCal));
  }

  startDrag = (event, el) => {
    if (this.state.selectedDate && this.state.selectedDate.day) {
      this.animationParams.dragging = false;
      this.animationParams.startX = 0;
      return;
    }
    this.animationParams.dragging = true;
    this.animationParams.startX = event.clientX || event.touches[0].clientX;
    event.preventDefault();
    event.stopPropagation();
  };

  drag = (event, el) => {
    if (!this.animationParams.dragging) return;
    if (this.props.selectedDate.day) return;
    let deltaX =
      (event.clientX || event.touches[0].clientX) - this.animationParams.startX;
    let { currentTransform } = this.animationParams;
    this.animationParams.deltaX = deltaX;
    el.style.transform = `translateX(${deltaX + currentTransform}px)`;
    event.preventDefault();
    event.stopPropagation();
  };

  stopDrag = (event, el) => {
    if (!this.animationParams.dragging) return;
    let deltaX = this.animationParams.deltaX;
    let absDeltaX = Math.abs(deltaX);
    let { month } = this.props.selectedDate;
    let { transformBasePx, currentTransform } = this.animationParams;
    let decrement = deltaX > 0 ? true : false;
    if (
      !absDeltaX ||
      absDeltaX < 50 ||
      (decrement && month === 1) ||
      (!decrement && month === 12)
    ) {
      return requestAnimationFramePromise()
        .then(_ => requestAnimationFramePromise())
        .then(_ => {
          el.style.transition = `transform 0.2s linear`;
          el.style.transform = `translateX(${currentTransform}px)`;
          return transitionEndPromise(this.base);
        })
        .then(_ => {
          el.style.transition = "";
        });
    }
    let offset = 0;
    if (decrement) {
      offset = currentTransform + transformBasePx;
    } else {
      offset = currentTransform - transformBasePx;
    }
    requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        el.style.transition = `transform 0.2s linear`;

        el.style.transform = `translateX(${offset}px)`;
        return transitionEndPromise(this.base);
      })
      .then(_ => {
        el.style.transition = "";
        return requestAnimationFramePromise();
      })
      .then(_ => {
        this.animationParams.currentTransform = offset;
        if (decrement) {
          return this.props.decrementMonth();
        }
        this.props.incrementMonth();
        this.animationParams.deltaX = 0;
        this.animationParams.dragging = false;
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
        this.animationParams.currentTransform = currentTransform;
      });
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
    console.log(Object.keys(calendar));
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
            <div className={`${style.allCalStyle} allCal`}>
              {Object.keys(calendar).map(monthKey => {
                if (selectedDate.month - 1 === +monthKey) {
                  return <Calendar month="prev" prev />;
                }
                if (selectedDate.month + 1 === +monthKey) {
                  return <Calendar month="next" next />;
                }
                if (selectedDate.month === +monthKey) {
                  return (
                    <Calendar
                      selectedDate={selectedDate}
                      userDeviceDate={today}
                      monthFillers={
                        selectedDate.month
                          ? monthStartDays[selectedDate.month]
                          : null
                      }
                      calendarPage={
                        selectedDate.month ? calendar[selectedDate.month] : null
                      }
                      selectDate={selectDate}
                    />
                  );
                } else {
                  return <Calendar month="prev" prev />;
                }
              })}
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
