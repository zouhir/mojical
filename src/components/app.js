import { h, Component } from "preact";
import { Router } from "preact-router";

import Home from "../routes/home";
import Calendar from "async!../routes/calendar";

import firebase from "../lib/firebase";

export default class App extends Component {
  state = {
    authToken: null
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(idToken => {
            console.log(idToken);
            this.setState({ authToken: idToken });
          })
          .catch(function(error) {
            console.log(error);
            this.setState({ authToken: null });
          });
      } else {
        this.setState({ authToken: null });
      }
    });
  }

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render({}, { authToken }) {
    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          {authToken !== null ? (
            <Calendar path="/" authToken={authToken} />
          ) : (
            <Home path="/" authToken={authToken} />
          )}
        </Router>
      </div>
    );
  }
}
