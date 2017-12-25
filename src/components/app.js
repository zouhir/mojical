import { h, Component } from "preact";
import { Router, route } from "preact-router";

// routes
import Home from "async!../routes/home";
import Calendar from "async!../routes/calendar";
// util
import Auth from "../util/auth";
// store
import { connect } from "unistore/preact";
import { actions } from "../store";

import offlinedb from "../util/offline-db";

@connect([], actions)
class App extends Component {
  componentDidMount() {
    Auth.authInstance().onAuthStateChanged(user => {
      if (user) {
        let u = {};
        u.displayName = user.displayName;
        u.email = user.email;
        u.emailVerified = user.emailVerified;
        u.photoURL = user.photoURL;
        u.isAnonymous = user.isAnonymous;
        u.uid = user.uid;
        u.providerData = user.providerData;
        Auth.getToken()
          .then(token => {
            u.authToken = token;
            this.props.setUser(u);
            route("/calendar");
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.setState({ user: null });
      }
    });

    let odb = offlinedb("123", "feelings");
    odb.set("latest", { hello: "world" });
    // odb.getFeeling();
  }

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render({}, { authToken, user }) {
    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          <Home path="/" signIn={Auth.signIn} />
          <Calendar path="/calendar" signOut={Auth.signOut} />
        </Router>
      </div>
    );
  }
}

export default App;
