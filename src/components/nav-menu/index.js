import { h, Component } from "preact";
import cx from "classnames";
import style from "./style.scss";

class NavMenu extends Component {
  componentDidMount() {
    this.base.addEventListener("click", this.toggleNav);
  }
  componentWillUnmount() {
    this.base.removeEventListener("click", this.toggleNav);
  }
  toggleNav = e => {
    let nav = this.base.getElementsByClassName(style.offscreenNav)[0];
    console.log(e.target.className);
    if (e.target.className.indexOf(style.offscreenCanvas) > -1) {
      this.props.toggleNav();
    }
  };
  render({ user, path, validAuth, selectedDate, showNav }) {
    let classes = cx(style.offscreenCanvas, showNav && style.showNav);
    return (
      <div className={classes}>
        <nav className={style.offscreenNav}>
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
