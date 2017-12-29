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
  startDrag = e => {
    this.setState({
      dragging: true,
      startX: event.clientX || event.touches[0].clientX
    });
  };

  drag = () => {
    if (!this.state.dragging) return;
    if (this.props.selectedDate.day) return;
    let deltaX =
      (event.clientX || event.touches[0].clientX) - this.state.startX;
    this.setState({ deltaX });
    requestAnimationFrame(() => {
      this.base.style.transform = `translateX(${Math.round(deltaX)}px)`;
    });

    event.preventDefault();
    event.stopPropagation();
  };

  stopDrag = () => {
    if (!this.state.dragging) return;
    this.setState({ dragging: false });
    let { deltaX } = this.state;
    let absDeltaX = Math.abs(deltaX);
    if (absDeltaX < 40) {
      requestAnimationFramePromise()
        .then(_ => requestAnimationFramePromise())
        .then(_ => {
          this.base.style.transition = `transform 0.1s ease-in-out`;
          this.base.style.transform = `translateX(0)`;
          return transitionEndPromise(this.base);
        })
        .then(_ => {
          console.log("stopped trranbsition");
          this.base.style.transition = "";
        });
    } else {
      let right = deltaX > 0 ? true : false;
      requestAnimationFramePromise()
        .then(_ => requestAnimationFramePromise())
        .then(_ => {
          this.base.style.transition = `transform 0.2s ease-out`;
          this.base.style.transform = `translateX(${
            right ? `+150vw` : `-150vw`
          })`;
          return transitionEndPromise(this.base);
        })
        .then(_ => {
          console.log("stopped trranbsition");
          this.base.style.transition = "";
        })
        .then(_ => {
          console.log("opacity 0");
          this.base.style.opacity = 0;
          return requestAnimationFramePromise();
        })
        .then(_ => {
          console.log();
          this.base.style.transform = `translateX(${
            right ? `-150vw` : `+150vw`
          })`;
          return requestAnimationFramePromise();
        })
        .then(_ => {
          this.base.style.opacity = 1;
          this.base.style.transition = `transform 0.2s ease-in`;
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
