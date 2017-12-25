import getDaysInMonth from "date-fns/get_days_in_month";
import getDay from "date-fns/get_day";

const MONTH_START = 1;

class DateUtils {
  static monthStartDay(year, month) {
    return getDay(new Date(year, month, MONTH_START));
  }

  static monthDays(year, month) {
    let daysCount = getDaysInMonth(new Date(year, month));
    let daysObject = {};
    for (let i = 1; i <= daysCount; i++) {
      daysObject[i] = { feeling: null };
    }
    return daysObject;
  }
}

export default DateUtils;
