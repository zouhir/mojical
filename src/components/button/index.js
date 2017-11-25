import { h } from "preact";
import style from "./style";

const Button = ({ href, label, value, onClick }) => {
  if (href)
    return (
      <a className={style.button} href={href} onClick={onClick}>
        {value}{" "}
      </a>
    );
  return (
    <button className={style.button} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
