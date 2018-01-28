import fetch from "unfetch";
import config from "../config";

class feelingsService {
  static constructUrl(uid, token, year, month) {
    return `${
      config.databaseURL
    }/user-feelings/${uid}/${year}/${month}.json?auth=${token}`;
  }
  static post({ uid, year, month, day, feeling }, online, token) {
    let payload = JSON.stringify({
      [day]: { feeling: feeling }
    });
    return fetch(
      `${
        config.databaseURL
      }/user-feelings/${uid}/${year}/${month}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: payload
      }
    ).then(r => r.json());
  }
  static get({ uid, year, month, day = null }, token) {
    return fetch(
      `${config.databaseURL}/user-feelings/${uid}/${year}/${month}${
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
