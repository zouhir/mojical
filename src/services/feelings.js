import fetch from "unfetch";
import config from "../config";

class feelingsService {
  static post({ uid, year, month, day, feeling }, online, token) {
    return fetch(
      `${
        config.databaseURL
      }/user-feelings/${uid}/${year}/${month}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          [day]: { feeling: feeling }
        })
      }
    ).then(r => r.json());
  }
  static get({ uid, year, month, day = null }, token) {
    return fetch(
      `${config.databaseURL}/userfeelings/${uid}/${year}/${month}${
        day ? `/${day}` : ""
      }.json?auth=${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(r => r.json());
  }
}

export default feelingsService;
