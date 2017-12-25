import fetch from "unfetch";
import { databaseURL } from "../config";

class FeelingsService {
  static post({ userId, year, month, day, feeling }, online, token) {
    return fetch(
      databaseURL + userId + "/" + year + "/" + month + ".json?auth=" + token,
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
  static get() {
    return fetch(
      databaseURL + userId + "/" + year + "/" + month + ".json?auth=" + token,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(r => r.json());
  }
}
