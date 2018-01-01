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
  monthStartDays: null,
  calendar: {},
  lastSync: {}
});

let actions = store => ({
  setUser(state, user) {
    return { user: user };
  },
  setToday(state, { year, month, day }) {
    let calendar = {};
    return {
      today: { year, month, day },
      monthStartDays: DateUtils.populateMonthStartDays(year),
      calendar: DateUtils.populateCalendar(year),
      selectedDate: { year, month, day: null }
    };
  },
  selectDate(state, { year, month, day }) {
    return { selectedDate: { year, month, day } };
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
  setFeelinginCalendar(state, { month, day, response, lastSync }) {
    if (!response) return;
    // TODO: make it pure
    let newCal = Object.assign({}, state.calendar);

    Object.keys(response).forEach(k => {
      if (response[k]) {
        newCal[month][k].feeling = response[k].feeling;
      }
    });
    return {
      calendar: newCal,
      lastSync
    };
  }
});

export { store, actions };
