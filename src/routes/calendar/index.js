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

@connect(
  ["user", "today", "lastSync", "selectedDate", "monthStartDays", "calendar"],
  actions
)
class CalendarPage extends Component {
  state = {
    loading: true
  };
  animationParams = {
    startX: 0,
    dragging: false,
    deltaX: 0,
    transformBasePx: 0,
    currentTransform: 0,
    startTime: 0
  };
  componentDidMount() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let { setToday } = this.props;
    setToday({ year, month, day });
    this.syncMonthFeelings(year, month);
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

  syncMonthFeelings = (year, month) => {
    let { uid, authToken } = this.props.user;
    feelingsService
      .get({ uid, year, month: month }, authToken)
      .then(response => {
        this.props.setFeelinginCalendar({
          year,
          month,
          response
        });
      });
  };

  startDrag = (event, el) => {
    if (this.state.selectedDate && this.state.selectedDate.day) {
      this.animationParams.dragging = false;
      this.animationParams.startX = 0;
      return;
    }
    this.animationParams.startTime = new Date().getTime();
    this.animationParams.dragging = true;
    this.animationParams.startX = event.clientX || event.touches[0].clientX;
  };

  drag = (event, el) => {
    if (!this.animationParams.dragging) return;
    if (this.props.selectedDate.day) return;
    let deltaX =
      (event.clientX || event.touches[0].clientX) - this.animationParams.startX;
    if (Math.abs(deltaX) < 5) {
      return;
    }
    let { currentTransform } = this.animationParams;
    this.animationParams.deltaX = deltaX;
    el.style.transform = `translateX(${deltaX + currentTransform}px)`;
    event.preventDefault();
    event.stopPropagation();
  };

  stopDrag = (event, el) => {
    if (!this.animationParams.dragging) return;
    if (this.animationParams.dragging && this.props.selectedDate.day) {
      if (event.target.className.indexOf("custom-touch") > -1) {
        return;
      }
      this.props.setDate({ day: null });
    }
    let deltaX = this.animationParams.deltaX;
    let absDeltaX = Math.abs(deltaX);
    let { month } = this.props.selectedDate;
    let { transformBasePx, currentTransform } = this.animationParams;
    let decrement = deltaX > 0 ? true : false;
    if (
      !absDeltaX ||
      absDeltaX < 100 ||
      (decrement && month === 1) ||
      (!decrement && month === 12)
    ) {
      this.animationParams.deltaX = 0;
      this.animationParams.dragging = false;
      return requestAnimationFramePromise()
        .then(_ => requestAnimationFramePromise())
        .then(_ => {
          el.style.transition = `transform 0.2s ease-in`;
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
        el.style.transition = `transform 0.2s ease-out`;

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

  componentWillReceiveProps(newProps) {
    if (this.props.selectedDate.month !== newProps.selectedDate.month) {
      this.syncMonthFeelings(
        newProps.selectedDate.year,
        newProps.selectedDate.month
      );
    }
  }
  goToCal = month => {
    let allCal = this.base.querySelector(".allCal");
    return requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        let offset = -(month - 1) * this.animationParams.transformBasePx;
        allCal.style.transition = `transform 0.2s linear`;
        allCal.style.transform = `translateX(${offset}px)`;
        this.animationParams.currentTransform = offset;
        return transitionEndPromise(allCal);
      });
  };
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
    setDate,
    monthStartDays,
    calendar,
    incrementMonth,
    decrementMonth,
    resetDaySelection,
    path,
    toggleNav
  }) {
    let slidingCalClasses = cx(style.slider, selectedDate.day && style.slide);
    return (
      <div className={style.calendar}>
        <PageHeader
          toggleNav={toggleNav}
          selectedDate={selectedDate}
          path={path}
          setDate={setDate}
          goToCal={this.goToCal}
        />
        <div className={slidingCalClasses}>
          <Gallery />
          <section id="paddedCal" className={style.paddedCalendar}>
            <div className={`${style.allCalStyle} allCal`}>
              {Object.keys(calendar).map(monthKey => {
                if (
                  selectedDate.month - 1 === +monthKey ||
                  selectedDate.month + 1 === +monthKey ||
                  selectedDate.month === +monthKey
                ) {
                  return (
                    <Calendar
                      selectedDate={selectedDate}
                      monthFillers={
                        selectedDate.month ? monthStartDays[+monthKey] : null
                      }
                      calendarPage={
                        selectedDate.month ? calendar[+monthKey] : null
                      }
                      setDate={setDate}
                    />
                  );
                } else {
                  return <Calendar month="empty" empty />;
                }
              })}
            </div>
          </section>
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
