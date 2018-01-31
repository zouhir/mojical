import { h, Component } from "preact";

import style from "./style.scss";

const _FEELINGS = ["happiness", "love", "surprise", "anger", "fear", "sadness"];

const Feelings = ({ color, postFeeling }) => {
  return (
    <div>
      <div className={style.emojiGrid} style={{ backgroundColor: color }}>
        {_FEELINGS.map(f => (
          <button
            aria-label={`feeling ${f}`}
            onClick={() => {
              postFeeling({ feeling: f.toLowerCase() });
            }}
            style={{ backgroundImage: `url(../../assets/emojis/${f}.svg)` }}
          />
        ))}

        <button className={style.lock} />
        <button className={style.lock} />
        <button className={style.lock} />
        <button className={style.lock} />
      </div>
    </div>
  );
};

export default Feelings;
