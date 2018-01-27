import getDaysInMonth from "date-fns/get_days_in_month";
import getDay from "date-fns/get_day";

let CACHE = {};

class dateUtils {
  static getDayIndex(year, month, day) {
    return getDay(new Date(year, month, day));
  }

  static getMonthCalendar(year, month) {
    let daysCount = getDaysInMonth(new Date(year, month));
    let daysObject = {};
    for (let i = 1; i <= daysCount; i++) {
      daysObject[i] = {
        day: this.getDayIndex(year, month, i),
        feeling: null,
        note: null,
        location: null
      };
    }
    return daysObject;
  }
  static getYearCalendar(year) {
    if (CACHE[year]) return CACHE[year];
    let yearCal = {};
    for (let i = 1; i <= 12; i++) {
      yearCal[i] = this.getMonthCalendar(year, /* use montrh's index*/ i - 1);
    }
    CACHE[year] = yearCal;
    return yearCal;
  }
}

export default dateUtils;
