import { h, Component } from "preact";

import style from "./style.scss";

const _FEELINGS = ["happiness", "love", "surprise", "anger", "fear", "sadness"];

const Feelings = ({ postFeeling, selectedDate, resetDaySelection }) => {
  return (
    <div className={style.feeling}>
      <ul className={style.moji}>
        {_FEELINGS.map(f => (
          <li>
            <button
              aria-label={`feeling ${f}`}
              onClick={() => {
                postFeeling(f.toLowerCase());
              }}
              style={{ backgroundImage: `url(../../assets/emojis/${f}.svg)` }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feelings;
