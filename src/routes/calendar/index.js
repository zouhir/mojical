import { h, Component } from "preact";
import style from "./style.scss";
import cx from "classnames";
// components
import Calendar from "../../components/calender";
import Footer from "../../components/footer";
import Gallery from "../../components/gallery";
import PageHeader from "../../components/page-header";
import Carousel from "../../components/calendars-carousel";
import TopSection from "../../components/top-section";


// util
import feelingsService from "../../services/feelings";

//store
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(
  ["user", "selectedMonth", "selectedDay", "selectedYear", "calendar"],
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
    currentTransform: 0
  };
  componentDidMount() {
    this.registerCalendarEvents();
    this.goToCal(this.props.selectedMonth);
  }

  registerCalendarEvents = () => {
    let paddedCalendarEl = this.base.querySelector("#paddedCal");
    let allCal = this.base.querySelector("#carousel");
    this.animationParams.transformBasePx = paddedCalendarEl.offsetWidth;
    paddedCalendarEl.addEventListener("mousedown", e =>
      this.startDrag(e, allCal)
    );
    paddedCalendarEl.addEventListener("touchstart", e =>
      this.startDrag(e, allCal)
    );
    paddedCalendarEl.addEventListener("mousemove", e => this.drag(e, allCal));
    paddedCalendarEl.addEventListener("touchmove", e => this.drag(e, allCal));
    paddedCalendarEl.addEventListener("mouseup", e => this.stopDrag(e, allCal));
    paddedCalendarEl.addEventListener("touchend", e =>
      this.stopDrag(e, allCal)
    );
    paddedCalendarEl.addEventListener("mouseleave", e =>
      this.stopDrag(e, allCal)
    );
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
    this.animationParams.dragging = true;
    this.animationParams.startX = event.clientX || event.touches[0].clientX;
  };

  drag = (event, el) => {
    event.stopPropagation();
    if (!this.animationParams.dragging) return;
    let { startX, currentTransform } = this.animationParams;
    let endX = event.clientX || event.touches[0].clientX;
    let deltaX = endX - startX;
    this.animationParams.deltaX = deltaX;
    if (this.props.selectedMonth === 1 && deltaX > 0) {
      this.animationParams.deltaX = null;
      return;
    }
    if (this.props.selectedMonth === 12 && deltaX < 0) {
      this.animationParams.deltaX = null;
      return;
    }
    return requestAnimationFramePromise().then(_ => {
      el.style.transition = `transform 0ms ease-out`;
      el.style.transform = `translateX(${deltaX + currentTransform}px)`;
    })

  };

  stopDrag = (event, el) => {
    event.stopPropagation();
    if (!this.animationParams.dragging) return;
    let deltaX = this.animationParams.deltaX;
    let absDeltaX = Math.abs(deltaX) || 0;

    let month = this.props.selectedMonth;
    let { transformBasePx, currentTransform } = this.animationParams;

    let decrement = deltaX > 0 ? true : false;
    if (!deltaX || absDeltaX === 0) {
      this.animationParams.startX = 0;
      this.animationParams.deltaX = 0;
      this.animationParams.dragging = false;
      return;
    }
    let offset;
    if (decrement) {
      offset = absDeltaX < 100 ? currentTransform : currentTransform + transformBasePx;
    } else {
      offset = absDeltaX < 100 ? currentTransform : currentTransform - transformBasePx;
    }
    return requestAnimationFramePromise()
      .then(_ => {
        el.style.transition = `transform 0.2s ease-out`;
        el.style.transform = `translateX(${offset}px)`;
        return transitionEndPromise(el);
      })
      .then(_ => {
        el.style.transition = "";
        this.animationParams.currentTransform = offset;
        this.animationParams.startX = 0;
        this.animationParams.deltaX = 0;
        this.animationParams.dragging = false;
        return requestAnimationFramePromise();
      }).then(_ => {
        if (decrement && absDeltaX > 100) {
          return this.props.decrementMonth();
        }
        if (absDeltaX > 100) {
          this.props.incrementMonth();
        }

      });
  };

  goToCal = month => {
    let carousel = this.base.querySelector("#carousel");
    this.animationParams.animatingToStop = false;
    return requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        let offset = -(month - 1) * this.animationParams.transformBasePx;
        carousel.style.transition = `transform 0.2s ease-out`;
        carousel.style.transform = `translateX(${offset}px)`;
        this.animationParams.currentTransform = offset;
        return transitionEndPromise(carousel);
      });
  };

  postFeeling = feeling => {
    let { uid, authToken } = this.props.user;
    let feelingObject = { [day]: { feeling } };
    this.props.setFeelinginCalendar({
      year: this.props.selectedYear,
      month: this.props.selectedMonth,
      day: this.props.selectedDay,
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
        <PageHeader goToCal={this.goToCal} />
        <div className={style.top}>
          <TopSection />
        </div>

        <section className={style.bottom}>
          <div id="paddedCal" className={style.calendarWindow}>
            <Carousel />
          </div>
        </section>
      </div>
    );
  }
}

export default CalendarPage;
