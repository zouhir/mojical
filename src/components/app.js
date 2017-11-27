import { h, Component } from "preact";
import { Router } from "preact-router";

import Home from "../routes/home";
import Calendar from "async!../routes/calendar";

import firebase from "../lib/firebase";

export default class App extends Component {
  state = {
    auth: null
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ auth: true });
      } else {
        this.setState({ auth: false });
      }
    });
  }
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render({}, { auth }) {
    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          {auth === true ? (
            <Calendar path="/" />
          ) : (
            <Home path="/" auth={auth} />
          )}
        </Router>
      </div>
    );
  }
}
