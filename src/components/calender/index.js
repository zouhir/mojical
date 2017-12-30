import { h, Component } from "preact";

import style from "./style.scss";
import Header from "../calender-header";
import Day from "../calendar-day";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class Calendar extends Component {
  state = {
    dragging: false,
    startX: 0
  };
  componentDidMount() {
    let draggableCalendar = this.base;

    draggableCalendar.addEventListener("mousedown", this.startDrag);
    draggableCalendar.addEventListener("touchstart", this.startDrag);
    draggableCalendar.addEventListener("mousemove", this.drag);
    draggableCalendar.addEventListener("touchmove", this.drag);
    draggableCalendar.addEventListener("mouseup", this.stopDrag);
    draggableCalendar.addEventListener("touchend", this.stopDrag);
  }

  componentWillUnmount() {
    // draggableCalendar.addEventListener("mousedown", this.startDrag);
    draggableCalendar.addEventListener("touchstart", this.startDrag);
    draggableCalendar.addEventListener("mousemove", this.drag);
    draggableCalendar.addEventListener("touchmove", this.drag);
    draggableCalendar.addEventListener("mouseup", this.stopDrag);
    draggableCalendar.addEventListener("touchend", this.stopDrag);
  }

  startDrag = event => {
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

  drag = event => {
    if (!this.state.dragging) return;
    if (this.props.selectedDate.day) return;
    let deltaX =
      (event.clientX || event.touches[0].clientX) - this.state.startX;
    if (Math.abs(deltaX) < 5) {
      console.log("start calcennled ");
      return;
    }
    this.setState({ deltaX });
    requestAnimationFrame(() => {
      this.base.style.transform = `translateX(${Math.round(deltaX)}px)`;
    });
    event.preventDefault();
    event.stopPropagation();
  };

  stopDrag = event => {
    if (!this.state.dragging) return;
    let { deltaX } = this.state;
    this.setState({ dragging: false, deltaX: null });
    let absDeltaX = Math.abs(deltaX);
    if (this.props.selectedDate.day || !absDeltaX || absDeltaX < 40) {
      requestAnimationFramePromise()
        .then(_ => requestAnimationFramePromise())
        .then(_ => {
          this.base.style.transition = `transform 0.1s ease-in-out`;
          this.base.style.transform = `translateX(0)`;
          return transitionEndPromise(this.base);
        })
        .then(_ => {
          this.base.style.transition = "";
        });
    } else {
      console.log(deltaX);
      let right = deltaX > 0 ? true : false;
      requestAnimationFramePromise()
        .then(_ => requestAnimationFramePromise())
        .then(_ => {
          this.base.style.transition = `transform 0.3s ease-out`;
          this.base.style.transform = `translateX(${
            right ? `+120vw` : `-120vw`
          })`;
          return transitionEndPromise(this.base);
        })
        .then(_ => {
          this.base.style.transition = "";
        })
        .then(_ => {
          this.base.style.opacity = 0;
          return requestAnimationFramePromise();
        })
        .then(_ => {
          /**
           * change month
           */
        })
        .then(_ => {
          this.base.style.transform = `translateX(${
            right ? `-120vw` : `+120vw`
          })`;
          return requestAnimationFramePromise();
        })
        .then(_ => {
          this.base.style.opacity = 1;
          this.base.style.transition = `transform 0.3s ease-in`;
          this.base.style.transform = `translateX(${0})`;
          return transitionEndPromise(this.base);
        })
        .then(_ => {
          this.base.style.transition = "";
        });
    }
  };

  emptyDaysList = ln => {
    let nullDays = [];
    for (let i = 0; i < ln; i++) {
      nullDays.push(null);
    }
    return nullDays;
  };
  render({
    selectedDate,
    userDeviceDate,
    calendarPage,
    monthFillers,
    incrementMonth,
    decrementMonth,
    selectDate
  }) {
    return (
      <div className={style.cal}>
        <section>
          <ul className={style.headers}>{DAYS.map(d => <li>{d}</li>)}</ul>
          <ul className={style.body}>
            {!calendarPage && <h1>loading</h1>}
            {monthFillers && this.emptyDaysList(monthFillers).map(d => <li />)}
            {calendarPage &&
              Object.keys(calendarPage).map((d, idx) => {
                let disabled = false;
                let today = false;
                if (selectedDate.month > userDeviceDate.month) {
                  disabled = true;
                }
                if (
                  selectedDate.month === userDeviceDate.month &&
                  d &&
                  +d > userDeviceDate.day
                ) {
                  disabled = true;
                }
                if (
                  selectedDate.month === userDeviceDate.month &&
                  d &&
                  +d === userDeviceDate.day
                ) {
                  today = true;
                }
                return (
                  <li>
                    <Day
                      day={+d}
                      feeling={calendarPage[d].feeling || null}
                      userDeviceDate={userDeviceDate}
                      selectedDate={selectedDate}
                      disabled={disabled}
                      today={today}
                      selectDate={selectDate}
                    />
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
    );
  }
}

export default Calendar;
