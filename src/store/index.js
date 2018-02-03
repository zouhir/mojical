import createStore from "unistore";
import DateUtils from "../util/date";
import fs from "../services/feelings";
import ps from "../services/photos";

import FeelingsWorker from "worker-loader!../workers/feelings-api.worker.js";
import PhotoGallery from "worker-loader!../workers/photo-gallery.worker.js";

const feelingsAPIWorker = new FeelingsWorker();
const photoGalleryWorker = new PhotoGallery();

let store = createStore({
  user: null,
  today: null,
  selectedYear: null,
  selectedMonth: null,
  selectedDay: null,
  calendar: {},
  lastSync: {},
  showNav: false,
  gallery: {
    src: null,
    artist: null,
    url: null,
    color: null
  },
  loading: false
});

let actions = store => ({
  setUser(state, user) {
    return { user: user };
  },
  toggleNav(state) {
    return { showNav: !state.showNav };
  },
  setToday(state) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let calendar = {};
    return {
      today: { year, month, day },
      calendar: DateUtils.getYearCalendar(year),
      selectedYear: year,
      selectedMonth: month,
      selectedDay: null
    };
  },
  setDate(state, { day, month, year }) {
    return { selectedDay: day, selectedMonth: month, selectedYear: year };
  },
  selectDay(state, day) {
    return { selectedDay: day };
  },
  selectMonth(state, day) {
    return { selectedMonth: month };
  },
  decrementMonth(state) {
    let year = state.selectedYear;
    let month = state.selectedMonth;
    month--;
    this.dispatchFeelingsWorker({ year, month });
    return {
      selectedMonth: month,
      selectedDay: null
    };
  },
  incrementMonth(state) {
    let year = state.selectedYear;
    let month = state.selectedMonth;
    month = month + 1;
    this.dispatchFeelingsWorker({ year, month });
    if (month <= 12)
      return {
        selectedMonth: month,
        selectedDay: null
      };
  },
  postFeeling(state, { feeling }) {
    let { uid, authToken } = state.user;
    let year = state.selectedYear;
    let month = state.selectedMonth;
    let day = state.selectedDay;

    let url = fs.constructUrl(uid, authToken, year, month);
    let data = {
      [day]: { feeling: feeling }
    };
    feelingsAPIWorker.postMessage([
      url,
      {
        month: month,
        data: data,
        calendar: state["calendar"][month]
      },
      "POST"
    ]);
    feelingsAPIWorker.onmessage = e => {
      let calendar = Object.assign({}, state.calendar);
      let key = Object.keys(e.data)[0];
      calendar[key] = e.data[key];
      return store.setState({ calendar: calendar });
    };
  },

  dispatchFeelingsWorker(state, { year, month }) {
    store.setState({ loading: true });
    let { uid, authToken } = state.user;
    let url = fs.constructUrl(uid, authToken, year, month);
    let calendar = Object.assign({}, state.calendar);
    if ("caches" in window) {
      caches.match(url).then(response => {
        if (response) {
          console.log("got from cache");
          response.json().then(json => {
            if (json) {
              Object.keys(json).forEach(day => {
                let dayData = json[day];
                if (calendar[month][day]) {
                  calendar[month][day].feeling =
                    dayData.feeling || calendar[month][day].feeling;
                  calendar[month][day].location =
                    dayData.location || calendar.location;
                }
              });
              store.setState({ calendar: calendar });
            }
          });
        }
      });
    }

    feelingsAPIWorker.postMessage([
      url,
      {
        month: month,
        calendar: state["calendar"][month]
      },
      "GET"
    ]);
    feelingsAPIWorker.onmessage = e => {
      let calendar = Object.assign({}, state.calendar);
      let key = Object.keys(e.data)[0];
      calendar[key] = e.data[key];
      return store.setState({ calendar: calendar, loading: false });
    };
  },
  getGalleryPhoto(state) {
    let url = ps.constructUrl();
    photoGalleryWorker.postMessage([url]);
    photoGalleryWorker.onmessage = e => {
      return store.setState({ gallery: e.data });
    };
  }
});

export { store, actions };
