import createStore from "unistore";
import DateUtils from "../util/date";

let store = createStore({
  user: null,
  today: null,
  selectedDate: null,
  monthStartDay: null,
  calendar: {},
  lastSync: null
});

let actions = store => ({
  setUser(state, user) {
    return { user: user };
  },
  setToday(state, { year, month, day }) {
    let calendar = {};
    calendar[year] = state.calendar[year] || {};
    calendar[year][month] = DateUtils.monthDays(year, month);
    return {
      today: { year, month, day },
      monthStartDay: DateUtils.monthStartDay(year, month),
      calendar: calendar,
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
    let calendar = {};
    calendar[year] = state.calendar[year] || {};
    calendar[year][month] = DateUtils.monthDays(year, month);
    if (month > 0)
      return {
        monthStartDay: DateUtils.monthStartDay(year, month),
        calendar: calendar,
        selectedDate: { year, month, day: null }
      };
  },
  incrementMonth(state) {
    let { year, month } = state.selectedDate;
    month = month + 1;
    let calendar = {};
    calendar[year] = state.calendar[year] || {};
    calendar[year][month] = DateUtils.monthDays(year, month);
    if (month <= 12)
      return {
        monthStartDay: DateUtils.monthStartDay(year, month),
        calendar: calendar,
        selectedDate: { year, month, day: null }
      };
  },
  setFeelinginCalendar(state, { year, month, day, response, lastSync }) {
    // TODO: make it pure
    let newCal = Object.assign({}, state.calendar);
    Object.keys(response).forEach(k => {
      if (response[k]) {
        newCal[year][month][k].feeling = response[k].feeling;
      }
    });
    return {
      calendar: newCal,
      lastSync
    };
  }
});

export { store, actions };
