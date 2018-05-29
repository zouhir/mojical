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
    loading: true,
    carouselSnapPoints: [],
    threshold: 50
  };
  animationParams = {
    startX: 0,
    dragging: false,
    deltaX: 0
  };
  componentDidMount() {
    //this.registerCalendarEvents();
    this.goToCal(this.props.selectedMonth);
    let paddedCalendarEl = this.base.querySelector("#paddedCal");
    let calWidth = paddedCalendarEl.offsetWidth;
    let carouselSnapPoints = [];
    for (let i = 0; i < 12; i++) {
      carouselSnapPoints.push(i * calWidth);
    }
    console.log(carouselSnapPoints);
    this.setState({ carouselSnapPoints, calWidth });
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
    event.preventDefault();
    event.stopPropagation();
    if (this.animationParams.dragging === true) {
      console.log("YOUUUUUUUUUUUU AREEEEEEEEEEE DRAGINGGGGGGGGGGGGGGGG");
    }
    this.animationParams.dragging = true;
    this.animationParams.startX = event.clientX || event.touches[0].clientX;
    console.log("START", "drag started");
  };

  drag = (event, el) => {
    event.preventDefault();
    if (!this.animationParams.dragging) return;
    let { startX } = this.animationParams;
    let endX = event.clientX || event.touches[0].clientX;
    let deltaX = endX - startX;
    let { carouselSnapPoints } = this.state;
    let monthIdx = +this.props.selectedMonth - 1;
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
      el.style.transition = "";
      el.style.transform = `translateX(${deltaX -
        carouselSnapPoints[monthIdx]}px)`;
    });
  };

  stopDrag = (event, el) => {
    event.stopPropagation();
    if (!this.animationParams.dragging) return;
    let deltaX = this.animationParams.deltaX;
    let absDeltaX = Math.abs(deltaX) || 1;
    let { calWidth, carouselSnapPoints } = this.state;
    let threshold = calWidth / 3;
    let decrement = deltaX > 0 ? true : false;
    let monthIdx = +this.props.selectedMonth - 1;
    if (!deltaX || absDeltaX === 0 || absDeltaX < threshold) {
      console.log("STOP", "cancelled draf");
      return requestAnimationFramePromise()
        .then(_ => {
          console.log("STOP", "0");
          console.log("STOP", absDeltaX);
          return requestAnimationFramePromise();
        })
        .then(_ => {
          el.style.transition = `transform 0.2s ease-out`;
          el.style.transform = `translateX(${-carouselSnapPoints[monthIdx]}px)`;
          console.log("STOP", "1");
          return transitionEndPromise(el);
        })
        .then(_ => {
          this.animationParams.dragging = false;
          el.style.transition = ``;
          console.log("STOP", "DONT CHAAAAAAAAAAAAAANGE");
        });
    }

    return requestAnimationFramePromise()
      .then(_ => {
        if (decrement) {
          monthIdx = monthIdx - 1;
        } else {
          monthIdx = monthIdx + 1;
        }
        el.style.transition = `transform 0.2s ease-out`;
        el.style.transform = `translateX(${-carouselSnapPoints[monthIdx]}px)`;
        return transitionEndPromise(el);
      })
      .then(_ => {
        console.log("transion done");
        el.style.transition = "";
        this.animationParams.dragging = false;
        el.style.transition = ``;
        if (decrement) {
          return this.props.decrementMonth();
        }
        this.props.incrementMonth();
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
