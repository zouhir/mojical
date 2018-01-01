import fetch from "unfetch";

import config from "../config";

// complex POST request with JSON, headers:
const postToCalendar = ({ userId, year, month, day, feeling }, token) => {
  return fetch(
    "https://calendar-moji.firebaseio.com/calendar/" +
      userId +
      "/" +
      year +
      "/" +
      month +
      ".json?auth=" +
      token,
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
};

const getFromCalendar = ({ userId, year, month }, token) => {
  return fetch(
    "https://calendar-moji.firebaseio.com/calendar/" +
      userId +
      "/" +
      year +
      "/" +
      month +
      ".json?auth=" +
      token,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(r => r.json());
};

const getImage = () => {
  let consumerKey = config["500px"];
  return fetch(
    "https://api.500px.com/v1/photos?feature=editors&consumer_key=" +
      consumerKey,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(r => r.json());
};

export { getFromCalendar, postToCalendar, getImage };
