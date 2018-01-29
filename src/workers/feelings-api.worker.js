onmessage = function(e) {
  const URL = e.data[0];
  const DATA = e.data[1];
  const TYPE = e.data[2];
  console.log("Message received from dispatch feelings");
  if (TYPE === "POST") {
    let payload = JSON.stringify(DATA.data);
    return fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: payload
    })
      .then(r => r.json())
      .then(res => {
        let currentMonth = DATA.calendar;
        if (!res || Object.keys(res).length < 1) {
          postMessage({ [DATA["month"]]: currentMonth });
          return;
        }
        Object.keys(res).forEach(day => {
          let dayData = res[day];
          currentMonth[day].feeling =
            dayData.feeling || currentMonth[day].feeling;
          currentMonth[day].note = dayData.note || currentMonth[day].note;
          currentMonth[day].location =
            dayData.location || currentMonth[day].location;
        });
        postMessage({
          [DATA["month"]]: currentMonth
        });
      });
  } else {
    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(res => {
        let currentMonth = DATA["calendar"];
        if (!res || Object.keys(res).length < 1) {
          postMessage({ [DATA["month"]]: currentMonth });
          return;
        }

        Object.keys(res).forEach(day => {
          let dayData = res[day];
          if (currentMonth[day]) {
            currentMonth[day].feeling =
              dayData.feeling || currentMonth[day].feeling || null;
            currentMonth[day].note =
              dayData.note || currentMonth[day].note || null;
            currentMonth[day].location =
              dayData.location || currentMonth[day].location || null;
          }
        });
        postMessage({
          [DATA["month"]]: currentMonth
        });
      });
  }
};
