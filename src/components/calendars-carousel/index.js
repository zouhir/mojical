import { h, Component } from "preact";

import style from "./style.scss";

import Calendar from "../calender";
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["calendar", "selectedMonth"], actions)
class Carousel extends Component {
  render({ selectedMonth, calendar }) {
    return (
      <div id="carousel" className={style.carousel}>
        {Object.keys(calendar).map((mc, idx) => {
          let monthToRender = +mc;
          if (
            monthToRender === selectedMonth - 1 ||
            monthToRender === selectedMonth ||
            monthToRender === selectedMonth + 1
          ) {
            return <Calendar renderDays={true} currentMonth={+mc} key={idx} />;
          }
          return <Calendar renderDays={false} currentMonth={+mc} key={idx} />;
        })}
      </div>
    );
  }
}

export default Carousel;
