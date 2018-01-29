import { h, Component } from "preact";

import style from "./style.scss";
import FeelingsPanel from "../feelings-panel";
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["gallery", "selectedDate"], actions)
class TopSection extends Component {
  componentDidMount() {
    this.props.getGalleryPhoto();
  }
  render({ gallery, selectedDate, postFeeling }) {
    return (
      <div
        className={style.top}
        style={{
          backgroundColor: gallery.color,
          backgroundImage: `url(${gallery.src})`
        }}
      >
        <div
          className={style.toggler}
          style={{ opacity: selectedDate.day ? 1 : 0 }}
        >
          <FeelingsPanel postFeeling={postFeeling} color={gallery.color} />
        </div>
      </div>
    );
  }
}

export default TopSection;
