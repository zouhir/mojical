import { h, Component } from "preact";
import { Router } from "preact-router";

import Home from "../routes/home";
import Calendar from "async!../routes/calendar";

import { firebaseAuth as auth } from "../lib/firebase";

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    console.log(auth().currentUser);
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Calendar path="/my-calendar" />
        </Router>
      </div>
    );
  }
}
