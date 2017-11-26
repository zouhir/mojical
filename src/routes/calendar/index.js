import { h, Component } from "preact";
import style from "./style.scss";

import Calendar from "../../components/calender";

export default class CalendarPage extends Component {
  // Note: `user` comes from the URL, courtesy of our router
  render({ user }, { time, count }) {
    return (
      <div className={style.calendar}>
        <div className={style.cardContainer}>
          <div className={style.mainCard}>
            <Calendar />
          </div>
        </div>
      </div>
    );
  }
}
