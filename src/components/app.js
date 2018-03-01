import { h, Component } from "preact";
import { Router, route } from "preact-router";

// routes
import Home from "async!../routes/home";
import Calendar from "async!../routes/calendar";
import Premium from "async!../routes/premium";

import NavMenu from "../components/nav-menu";
import Notifications from "../components/notifications";

// util
import Auth from "../util/auth";
// store
import { connect } from "unistore/preact";
import { actions } from "../store";
let reg;

if ("serviceWorker" in navigator) {
  reg = navigator.serviceWorker.register('/sw.js');
}

@connect(["user", "today"], actions)
class App extends Component {
  componentDidMount() {
    if (this.props.user && this.props.today) {
      this.dispatchFeelingApi(this.props.today);
    }
    if (reg) {
      reg.then(reg => {
        reg.addEventListener('updatefound', () => {
          // A wild service worker has appeared in reg.installing!
          const newWorker = reg.installing;

          newWorker.addEventListener('statechange', () => {
            switch (newWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  this.props.notify({ type: 'SW_UPDATE', message: 'New version of mojical is available.' })
                } else {
                  this.props.notify({ type: 'NOTIFY', message: 'Content is now available offline.' })
                }
                break;
            }
          });
        });
      });
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

  render({ today, user, notification }) {
    return (
      <div id="app">
        {user && <NavMenu />}
        <Notifications />
        <Router onChange={this.handleRoute}>
          {!user ? (
            <Home path="/" signIn={Auth.signIn} />
          ) : (
              [<Calendar
                toggleNav={this.toggleNav}
                path="/"
                signOut={Auth.signOut}
              />,
              <Premium path="/premium" />]
            )}
        </Router>
      </div>
    );
  }
}

export default App;
