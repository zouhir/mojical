import { h, Component } from "preact";

import style from "./style.scss";
import Feelings from "../feelings";

export default class Footer extends Component {
  render({ isSelected }) {
    return (
      <div className={style.footer}>
        <Feelings {...this.props} />
      </div>
    );
  }
}
