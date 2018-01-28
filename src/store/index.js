import createStore from "unistore";
import DateUtils from "../util/date";
import fs from "../services/feelings";

import FeelingsWorker from "worker-loader!../workers/feelings-api.worker.js";

const feelingsAPIWorker = new FeelingsWorker();

let store = createStore({
  user: null,
  today: null,
  selectedDate: {
    year: null,
    month: null,
    day: null
  },
  calendar: {},
  lastSync: {},
  showNav: false
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
      selectedDate: { year, month, day: null }
    };
  },
  selectDate(state, obj) {
    let toSet = Object.assign({}, state.selectedDate, obj);
    return { selectedDate: toSet };
  },

  resetDaySelection(state) {
    let { year, month } = state.selectedDate;
    return {
      selectedDate: { year, month, day: null }
    };
  },
  decrementMonth(state) {
    let { year, month } = state.selectedDate;
    month = month - 1;
    this.dispatchFeelingsWorker({ year, month });
    return {
      selectedDate: { year, month, day: null }
    };
  },
  incrementMonth(state) {
    let { year, month } = state.selectedDate;
    month = month + 1;
    this.dispatchFeelingsWorker({ year, month });
    if (month <= 12)
      return {
        selectedDate: { year, month, day: null }
      };
  },
  dispatchFeelingsWorker(state, { year, month }) {
    let { uid, authToken } = state.user;
    let url = fs.constructUrl(uid, authToken, year, month);
    feelingsAPIWorker.postMessage([url, month, state["calendar"][month]]);
    feelingsAPIWorker.onmessage = e => {
      let calendar = Object.assign({}, state.calendar);
      let key = Object.keys(e.data)[0];
      calendar[key] = e.data[key];
      return store.setState({ calendar: calendar });
    };
  }
});

export { store, actions };
