import { h, Component } from "preact";
import style from "./style.scss";
import cx from "classnames";
// components
import Calendar from "../../components/calender";
import Footer from "../../components/footer";
import Gallery from "../../components/gallery";
import PageHeader from "../../components/page-header";
import Carousel from "../../components/calendars-carousel";
import Siema from "siema";

// util
import feelingsService from "../../services/feelings";

//store
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["user", "selectedDate", "calendar"], actions)
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
    canDragAgain: true
  };
  componentDidMount() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let { setToday } = this.props;
    setToday({ year, month, day });

    this.registerCalendarEvents();
  }

  registerCalendarEvents = () => {
    let paddedCalendarEl = this.base.querySelector("#paddedCal");
    let allCal = this.base.querySelector("#carousel");
    this.animationParams.transformBasePx = paddedCalendarEl.offsetWidth - 20;
    allCal.addEventListener("mousedown", e => this.startDrag(e, allCal));
    allCal.addEventListener("touchstart", e => this.startDrag(e, allCal));
    allCal.addEventListener("mousemove", e => this.drag(e, allCal));
    allCal.addEventListener("touchmove", e => this.drag(e, allCal));
    allCal.addEventListener("mouseup", e => this.stopDrag(e, allCal));
    allCal.addEventListener("touchend", e => this.stopDrag(e, allCal));
    allCal.addEventListener("mouseleave", e => this.stopDrag(e, allCal));
  };

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
    event.stopPropagation();
    if (!this.animationParams.canDragAgain) return;
    console.log("start");
    this.animationParams.dragging = true;
    this.animationParams.startX = event.clientX || event.touches[0].clientX;
  };

  drag = (event, el) => {
    event.stopPropagation();
    if (!this.animationParams.dragging) return;
    this.animationParams.canDragAgain = false;
    let { startX, currentTransform } = this.animationParams;
    let endX = event.clientX || event.touches[0].clientX;
    let deltaX = endX - startX;
    this.animationParams.deltaX = deltaX;
    if (this.props.selectedDate.month === 1 && deltaX > 0) {
      return;
    }
    if (this.props.selectedDate.month === 12 && deltaX < 0) {
      return;
    }
    el.style.transition = `transform 0ms ease-out`;
    el.style.transform = `translateX(${deltaX + currentTransform}px)`;
  };

  stopDrag = (event, el) => {
    event.stopPropagation();
    console.log(event);
    console.log("stop");
    if (!this.animationParams.dragging) return;
    let deltaX = this.animationParams.deltaX;
    let absDeltaX = Math.abs(deltaX) || 0;

    let { month } = this.props.selectedDate;
    let { transformBasePx, currentTransform } = this.animationParams;

    let decrement = deltaX > 0 ? true : false;
    console.log(absDeltaX);
    if (absDeltaX === 0) {
      this.animationParams.deltaX = 0;
      this.animationParams.dragging = false;
      this.animationParams.canDragAgain = true;
      return;
    }
    if (
      absDeltaX < 100 ||
      (decrement && month === 1) ||
      (!decrement && month === 12)
    ) {
      return requestAnimationFramePromise()
        .then(_ => requestAnimationFramePromise())
        .then(_ => {
          el.style.transition = `transform 0.2s ease-out`;
          el.style.transform = `translateX(${currentTransform}px)`;
          return transitionEndPromise(this.base);
        })
        .then(_ => {
          console.log("stopping shit");
          el.style.transition = "";
          this.animationParams.deltaX = 0;
          this.animationParams.dragging = false;
          this.animationParams.canDragAgain = true;
        });
    }
    let offset;
    if (decrement) {
      offset = currentTransform + transformBasePx;
    } else {
      offset = currentTransform - transformBasePx;
    }
    return requestAnimationFramePromise()
      .then(_ => {
        el.style.transition = `transform 0.2s ease-out`;
        el.style.transform = `translateX(${offset}px)`;
        return transitionEndPromise(this.base);
      })
      .then(_ => {
        el.style.transition = "";
        this.animationParams.currentTransform = offset;
        this.animationParams.deltaX = 0;
        this.animationParams.dragging = false;
        this.animationParams.canDragAgain = true;
        if (decrement) {
          return this.props.decrementMonth();
        } else {
          console.log("triggered increment");
          this.props.incrementMonth();
        }
      });
  };

  componentWillReceiveProps(newProps) {
    if (this.props.selectedDate.month !== newProps.selectedDate.month) {
      this.goToCal(newProps.selectedDate.month);
    }
  }

  goToCal = month => {
    let carousel = this.base.querySelector("#carousel");
    this.animationParams.animatingToStop = false;
    return requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        let offset = -(month - 1) * this.animationParams.transformBasePx;
        carousel.style.transition = `transform 0.1s ease-out`;
        carousel.style.transform = `translateX(${offset}px)`;
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
  render({ calendar }) {
    return (
      <div className={style.calendar}>
        <PageHeader />
        <div className={style.top}>ss</div>
        {/* <Gallery /> */}
        <section id="paddedCal" className={style.bottom}>
          <Carousel />
        </section>
      </div>
    );
  }
}

export default CalendarPage;
