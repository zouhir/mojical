import { h, Component } from "preact";
import style from "./style.scss";
import { route } from "preact-router";

import Button from "../../components/button";
import PageHeader from "../../components/page-header";

import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["user"], actions)
class Premium extends Component {
  render({ user }) {
    return (
      <div class={style.payment}>
        <PageHeader />
        <div className={style.contentWrapper}>
          <div className={style.content}>
            <h2>
              Mojical Premium
            </h2>
            <p>
              The best way to enjoy Mojical is with a Premium subscription.
            </p>
            <ul>
              <li>No ad interruption.</li>
              <li>Be extra! in addition to the basic feelings you will get: Star Struck: <span dangerouslySetInnerHTML={{ __html: "&#x1F929" }} />, Pile of poo: <span dangerouslySetInnerHTML={{ __html: "&#x1F4A9" }}></span>, Sick: <span dangerouslySetInnerHTML={{ __html: "&#x1F912" }} />, In love: <span dangerouslySetInnerHTML={{ __html: "&#x1F496" }} /> and more... </li>
            </ul>
            <hr />
            <div className={style.bottom}>
              <div className={style.left}>
                <h3>Premium price: $0.99</h3>
              </div>
              <div className={style.right}>
                <Button value="Buy Now!" onClick={() => { }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Premium;
