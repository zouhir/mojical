import { h, Component } from "preact";
import cx from "classnames";
import style from "./style.scss";

import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["user", "showNav"], actions)
class NavMenu extends Component {
  componentDidMount() {
    this.base
      .querySelector(".dismiss")
      .addEventListener("click", this.props.toggleNav);
  }
  componentWillUnmount() {
    this.base
      .querySelector(".dismiss")
      .removeEventListener("click", this.props.toggleNav);
  }
  render({ user, showNav }) {
    let classes1 = cx(
      "dismiss",
      style.offcanvasWrapper,
      showNav && style.showWrapper
    );
    let classes2 = cx(style.offscreenNav, showNav && style.showNav);
    return (
      <div>
        <div className={classes1} />
        <nav className={classes2}>
          <div className={style.header}>
            <div
              className={style.avatar}
              style={{ backgroundImage: `url(${user.photoURL})` }}
            />
            <h5 className={style.name}>{user.displayName}</h5>
          </div>
          <ul>
            <li>
              <a>
                <span
                  className={style.icon}
                  style={{ backgroundImage: `url(../../assets/Calendar.svg)` }}
                />
                Calendar
              </a>
            </li>
            <li>
              <a>
                <span
                  className={style.icon}
                  style={{ backgroundImage: `url(../../assets/Feed.svg)` }}
                />
                Feed
              </a>
            </li>
            <li>
              <a>
                <span
                  className={style.icon}
                  style={{ backgroundImage: `url(../../assets/Lock.svg)` }}
                />
                Premium
              </a>
            </li>
            <li>
              <a>
                <span
                  className={style.icon}
                  style={{ backgroundImage: `url(../../assets/Info.svg)` }}
                />
                About Mojical
              </a>
            </li>
            <li className={style.bottomList}>
              <a>
                <span
                  className={style.icon}
                  style={{ backgroundImage: `url(../../assets/Feed.svg)` }}
                />
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavMenu;
