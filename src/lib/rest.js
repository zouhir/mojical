import fetch from "unfetch";

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

export { getFromCalendar, postToCalendar };
