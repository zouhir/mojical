import { h, Component } from "preact";
import style from "./style.scss";
import { route } from "preact-router";

import Button from "../../components/button";
import HomeLogo from "../../components/home-logo";
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["user", "userDate"], actions)
class Home extends Component {
  render({ signIn }) {
    return (
      <div class={style.home}>
        <HomeLogo />
        <div className={style.auth}>
          <Button value="Continue With Google" onClick={signIn} />
        </div>
      </div>
    );
  }
}

export default Home;
