import { h, Component } from "preact";
import style from "./style";

import Button from "../../components/button";
import CalIcon from "../../components/Icons/Cal";

import { firebaseAuth as auth } from "../../lib/firebase";

export default class Home extends Component {
  loginWithGoogle = () => {
    let provider = new auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/plus.login");
    auth().signInWithRedirect(provider);
  };
  render() {
    return (
      <div class={style.home}>
        <div className={style.auth}>
          <div className="logo">
            <CalIcon />
          </div>
          <Button value="Continue With Google" onClick={this.loginWithGoogle} />
        </div>
      </div>
    );
  }
}
