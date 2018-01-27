import createStore from "unistore";
import DateUtils from "../util/date";

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
  setToday(state, { year, month, day }) {
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
    return {
      selectedDate: { year, month, day: null }
    };
  },
  incrementMonth(state) {
    let { year, month } = state.selectedDate;
    month = month + 1;
    if (month <= 12)
      return {
        selectedDate: { year, month, day: null }
      };
  },
  setFeelinginCalendar(state, { month, response }) {
    // if (!response) return;
    // // TODO: make it pure
    // let newCal = Object.assign({}, state.calendar);
    // Object.keys(response).forEach(k => {
    //   if (response[k]) {
    //     newCal[month][k].feeling = response[k].feeling;
    //   }
    // });
    // return {
    //   calendar: newCal
    // };
    return state;
  }
});

export { store, actions };
