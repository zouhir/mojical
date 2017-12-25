import { h, Component } from "preact";
import style from "./style.scss";

import Logo from "../Icons/Logo";

import happy from "../../assets/emojis/happiness.svg";
import sad from "../../assets/emojis/sadness.svg";
import love from "../../assets/emojis/love.svg";

let SVG_ARR = [happy, sad, love];

class HomeLogo extends Component {
  state = {
    current: 0
  };
  componentDidMount() {
    this.timer = setInterval(this.updateEmoji, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  updateEmoji = () => {
    let current = this.state.current;
    current < SVG_ARR.length - 1 ? (current += 1) : (current = 0);
    this.setState({ current });
  };
  render({}, { current }) {
    return (
      <div className={style.logo}>
        <Logo />
        <div
          className={style.moji}
          style={{ backgroundImage: `url(${SVG_ARR[current]})` }}
        />
      </div>
    );
  }
}

export default HomeLogo;
