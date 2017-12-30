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

@connect(["user", "selectedDate"], actions)
class App extends Component {
  state = {
    validAuth: false,
    showNav: false
  };
  toggleNav = () => {
    this.setState({ showNav: !this.state.showNav });
  };
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
            this.setState({ validAuth: true });
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.setState({ validAuth: false });
      }
    });
  }

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render({ selectedDate, user }, { validAuth, showNav }) {
    return (
      <div id="app">
        {user && (
          <NavMenu user={user} toggleNav={this.toggleNav} showNav={showNav} />
        )}
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
