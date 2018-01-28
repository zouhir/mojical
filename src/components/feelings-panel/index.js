import { h, Component } from "preact";

import style from "./style.scss";

const _FEELINGS = ["happiness", "love", "surprise", "anger", "fear", "sadness"];

const Feelings = ({ postFeeling, selectedDate, resetDaySelection }) => {
  return (
    <div className={style.panel}>
      {_FEELINGS.map(f => (
        <button
          aria-label={`feeling ${f}`}
          onClick={() => {
            postFeeling(f.toLowerCase());
          }}
          style={{ backgroundImage: `url(../../assets/emojis/${f}.svg)` }}
        />
      ))}
    </div>
  );
};

export default Feelings;
