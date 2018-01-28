onmessage = function(e) {
  console.log("Message received from dispatch feelings");
  fetch(e.data[0], {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(r => r.json())
    .then(res => {
      let currentMonth = e.data[2];
      if (!res || Object.keys(res).length < 1) {
        postMessage({ [e.data[1]]: currentMonth });
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
        [e.data[1]]: currentMonth
      });
    });
};
