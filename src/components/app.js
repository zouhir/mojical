import { h, Component } from "preact";
import { Router, route } from "preact-router";

// routes
import Home from "async!../routes/home";
import Calendar from "async!../routes/calendar";

import NavMenu from "../components/nav-menu";

// util
import Auth from "../util/auth";
// store
import { connect } from "unistore/preact";
import { actions } from "../store";

@connect(["user", "today"], actions)
class App extends Component {
  componentDidMount() {
    if (this.props.user && this.props.today) {
      this.dispatchFeelingApi(this.props.today);
    }
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
            this.props.setToday();
            this.props.setUser(u);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
      }
    });
  }

  dispatchFeelingApi = today => {
    let { year, month } = today;
    this.props.dispatchFeelingsWorker({ year, month });
  };

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  componentWillReceiveProps(newProps) {
    if (newProps.user && newProps.today) {
      this.dispatchFeelingApi(newProps.today);
    }
  }

  render({ today, user }) {
    return (
      <div id="app">
        {user && <NavMenu />}
        <Router onChange={this.handleRoute}>
          {!user ? (
            <Home path="/" signIn={Auth.signIn} />
          ) : (
            <Calendar
              toggleNav={this.toggleNav}
              path="/"
              signOut={Auth.signOut}
            />
          )}
        </Router>
      </div>
    );
  }
}

export default App;
