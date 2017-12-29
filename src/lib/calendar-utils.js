import getDaysInMonth from "date-fns/get_days_in_month";
import getDay from "date-fns/get_day";

const calendarPageDays = (month, year) => {
  let cache = {};

  if (cache[year] && cache[year][month]) {
    return cache[year][month];
  }
  const MONTH_START = 1;
  // get days in this month
  let daysInCurrentMonth = getDaysInMonth(new Date(year, month));

  // get firs day of this month
  let monthStartDay = getDay(new Date(year, month, MONTH_START));

  console.log(monthStartDay);

  let monthDays = {
    monthFillers: 0
  };
  for (let i = MONTH_START - monthStartDay; i <= daysInCurrentMonth; i++) {
    if (i < 1) {
      monthDays.monthFillers += 1;
    } else {
      monthDays[i] = { feeling: null };
    }
  }
  cache[year] = {};
  cache[year][month] = monthDays;
  return monthDays;
};

const monthToString = index => {
  return MONTHS[index - 1] || null;
};

export { calendarPageDays, monthToString };
