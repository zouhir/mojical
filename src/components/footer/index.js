import { h, Component } from "preact";
import cx from "classnames";
import style from "./style.scss";
import FeelingsBar from "../feelings-bar";

import NavCal from "../Icons/Calendar";
import Stats from "../Icons/Stats";
import Activiyt from "../Icons/Activity";
import Menu from "../Icons/Menu";

const FooterNav = () => <div className={style.footerNav} />;

export default class Footer extends Component {
  render({ selectedDate, resetDaySelection, slideUp }) {
    return (
      <div className={cx(style.footer, slideUp && style.slide)}>
        <div className={style.container}>
          {selectedDate && selectedDate.day === null && <FooterNav />}
          {selectedDate &&
            selectedDate.day !== null && <FeelingsBar {...this.props} />}
        </div>
      </div>
    );
  }
}
