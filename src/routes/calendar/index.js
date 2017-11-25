import { h, Component } from "preact";
import style from "./style.scss";

import Calendar from "../../components/calender";

export default class CalendarPage extends Component {
  state = {
    time: Date.now(),
    count: 10
  };

  // gets called when this route is navigated to
  componentDidMount() {
    // start a timer for the clock:
    this.timer = setInterval(this.updateTime, 1000);
  }

  // gets called just before navigating away from the route
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // update the current time
  updateTime = () => {
    this.setState({ time: Date.now() });
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

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
