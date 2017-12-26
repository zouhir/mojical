import createStore from "unistore";
import DateUtils from "../util/date";

let store = createStore({
  user: null,
  today: null,
  selectedDate: null,
  monthStartDay: null,
  monthCalendar: {}
});

let actions = store => ({
  setUser(state, user) {
    return { user: user };
  },
  setToday(state, { year, month, day }) {
    return {
      today: { year, month, day },
      monthStartDay: DateUtils.monthStartDay(year, month),
      monthCalendar: DateUtils.monthDays(year, month),
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
    let year = state.selectedDate.year;
    let month = state.selectedDate.month - 1;
    if (month >= 0)
      return {
        monthStartDay: DateUtils.monthStartDay(year, month),
        monthCalendar: DateUtils.monthDays(year, month),
        selectedDate: { year, month, day: null }
      };
  },
  incrementMonth(state) {
    let year = state.selectedDate.year;
    let month = state.selectedDate.month + 1;
    if (month < 12)
      return {
        monthStartDay: DateUtils.monthStartDay(year, month),
        monthCalendar: DateUtils.monthDays(year, month),
        selectedDate: { year, month, day: null }
      };
  },
  assignFeeling(state, feeling) {
    let { monthCalendar } = state;
    console.log(monthCalendar);
    let { day } = state.selectedDate;
    return {
      monthCalendar: Object.assign({}, monthCalendar, { [day]: { feeling } })
    };
  }
});

export { store, actions };
