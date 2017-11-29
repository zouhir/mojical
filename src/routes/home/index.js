import { h, Component } from "preact";
import style from "./style.scss";
import { route } from "preact-router";

import Button from "../../components/button";
import HomeLogo from "../../components/home-logo";

import firebase from "../../lib/firebase";

export default class Home extends Component {
  loginWithGoogle = () => {
    firebase
      .auth()
      .setPersistence(auth.Auth.Persistence.LOCAL)
      .then(() => {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/plus.login");
        firebase.auth().signInWithRedirect(provider);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };
  render() {
    return (
      <div class={style.home}>
        <HomeLogo />
        <div className={style.auth}>
          <Button value="Continue With Google" onClick={this.loginWithGoogle} />
        </div>
      </div>
    );
  }
}
