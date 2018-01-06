import { h } from "preact";
import style from "./style.scss";
import cx from "classnames";

const Indicator = ({ month, next, prev }) => {
  let classes = cx(
    style.indicatorWrapper,
    next && style.next,
    prev && style.prev
  );
  return (
    <div className={classes}>
      <div className={style.indicatorBtn}>
        <span>{month}</span>
      </div>
    </div>
  );
};

export default Indicator;
