import { h, Component } from "preact";
import style from "./style.scss";

import CalIcon from "../Icons/Cal";

import happy from "../../assets/emojis/happy.svg";
import sad from "../../assets/emojis/sad.svg";
import love from "../../assets/emojis/love.svg";

let svgArr = [happy, sad, love];

class HomeLogo extends Component {
  state = {
    current: 0
  };
  componentDidMount() {
    // start a timer for the clock:
    this.timer = setInterval(this.updateEmoji, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  updateEmoji = () => {
    let current = this.state.current;
    current++;
    current = current < 3 ? current : 0;
    this.setState({ current });
  };

  render({}, { current }) {
    return (
      <div className={style.logo}>
        <CalIcon />
        <div
          className={style.moji}
          style={{ backgroundImage: `url(${svgArr[current]})` }}
        />
      </div>
    );
  }
}

export default HomeLogo;
