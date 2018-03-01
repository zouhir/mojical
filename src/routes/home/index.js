import { h, Component } from "preact";
import style from "./style.scss";
import { route } from "preact-router";


import Button from "../../components/button";
import HomeCard from "../../components/home-logo";
import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["user", "userDate"], actions)
class Home extends Component {
  
  render({ signIn }) {
    return (
      <div class={style.home}>
        <HomeCard>
          <h2>Mojical</h2>
          <p>
            Set your feeling using emojis in a beautifully designed calendar
            that will help you track your mood and let you write notes.
          </p>
          <Button value="Connect With Google" onClick={signIn} />
        </HomeCard>
      </div>
    );
  }
}

export default Home;
