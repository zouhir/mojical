import { h, Component } from "preact";

import style from "./style.scss";
import FeelingsBar from "../feelings-bar";

import NavCal from "../Icons/Calendar";
import Stats from "../Icons/Stats";
import Activiyt from "../Icons/Activity";
import Menu from "../Icons/Menu";

const FooterNav = () => (
  <div className={style.footerNav}>
    <button>
      <NavCal />
    </button>
    <button>
      <Activiyt />
    </button>
    <button>
      <Stats />
    </button>
    <button>
      <Menu />
    </button>
  </div>
);

export default class Footer extends Component {
  render({ selectedDate, resetDaySelection }) {
    return (
      <div className={style.footer}>
        <div className={style.container}>
          {selectedDate && selectedDate.day === null && <FooterNav />}
          {selectedDate &&
            selectedDate.day !== null && <FeelingsBar {...this.props} />}
        </div>
      </div>
    );
  }
}
