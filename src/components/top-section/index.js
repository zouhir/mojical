import { h, Component } from "preact";

import style from "./style.scss";
import FeelingsPanel from "../feelings-panel";
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["gallery"], actions)
class TopSection extends Component {
  componentDidMount() {
    this.props.getGalleryPhoto();
  }
  render({ gallery, postFeeling }) {
    return (
      <div
        className={style.top}
        style={{
          backgroundImage: `url(${gallery.src})`
        }}
      >
        <div className={style.feelingsPanel}>
          <FeelingsPanel postFeeling={postFeeling} />
        </div>
      </div>
    );
  }
}

export default TopSection;
