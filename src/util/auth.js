import firebase from "../lib/firebase";

let storage = window.localStorage;

export default class Auth {
  static authInstance() {
    return firebase.auth();
  }
  static signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/plus.login");
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            var token = result.credential.accessToken;
            var user = result.user;
          })
          .catch(error => {
            console.error(error.code);
            console.error(error.message);
          });
      })
      .catch(error => {
        console.error(error.code);
        console.error(error.message);
      });
  }

  static getToken() {
    return firebase.auth().currentUser.getIdToken(false);
  }

  static signOut() {
    console.log("signout");
    return "signout";
  }
}
