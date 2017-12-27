import { h, Component } from "preact";
import cx from "classnames";
import style from "./style.scss";

class Gallery extends Component {
  state = {
    img: null,
    loaded: false
  };
  componentDidMount() {
    this.setState({
      img:
        "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANAA4DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUH/8QAIBAAAgEDBQEBAAAAAAAAAAAAAQIDBBEhAAUGEjEUUf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGhEAAgIDAAAAAAAAAAAAAAAAABEBEgIhYf/aAAwDAQACEQMRAD8AzXj9e+7wRPO7xAC7LEwUyG9uoYggfudQuQcgmpZRHShWHZh2fOAbDRqBpKSJY4nPQZsfDm+hbhB9UgaVzcX8wPb6qsrcEoq3s//Z"
    });
    let newSrc = "/assets/sample-bg.jpg";
    this.setState({
      img: newSrc,
      loaded: true
    });
  }
  render({}, { img, loaded }) {
    let classes = cx(style.gallery, loaded && style.loaded);
    return (
      <div className={classes} style={{ backgroundImage: `url(${img})` }} />
    );
  }
}

export default Gallery;
