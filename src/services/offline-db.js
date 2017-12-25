import localforge from "localforage";

class OfflineDb {
  constructor(uid) {
    this.localforge = localforage.config({
      driver: localforage.LOCALSTORAGE,
      name: `mojicaldb-${uid}`
    });
  }
  getFeeling(date) {
    return localforage
      .getItem("feelings")
      .then(value => {
        console.log(value);
      })
      .catch(err => {
        console.log(err);
      });
  }
  setFeeling(date, feeling) {
    return "11";
  }
}
