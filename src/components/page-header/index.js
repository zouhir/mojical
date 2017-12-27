import { h, Component } from "preact";

import style from "./style.scss";

const PageHeader = () => {
  return (
    <header className={style.pageHeader}>
      <button className={style.menu} />
    </header>
  );
};

export default PageHeader;
