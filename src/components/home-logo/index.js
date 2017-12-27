import { h, Component } from "preact";
import style from "./style.scss";

import Logo from "../Icons/Logo";

import happy from "../../assets/emojis/happiness.svg";
import sad from "../../assets/emojis/sadness.svg";
import love from "../../assets/emojis/love.svg";

class HomeLogo extends Component {
  componentDidMount() {}
  render() {
    return <div className={style.loginCard}>{this.props.children}</div>;
  }
}

export default HomeLogo;
