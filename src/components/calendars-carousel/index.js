import { h, Component } from "preact";

import style from "./style.scss";

const Carousel = ({ children }) => {
  return (
    <div id="carousel" className={style.carousel}>
      {children}
    </div>
  );
};

export default Carousel;
