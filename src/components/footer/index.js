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
  render({ selectedDate, resetDaySelection }) {
    return (
      <div className={cx(style.footer, selectedDate.day && style.slide)}>
        <div className={style.container}>
          {!selectedDate.day ? <FooterNav /> : <FeelingsBar {...this.props} />}
        </div>
      </div>
    );
  }
}
