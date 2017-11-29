import getDaysInMonth from "date-fns/get_days_in_month";
import getDay from "date-fns/get_day";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

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
  let monthDays = [];
  for (let i = MONTH_START - monthStartDay; i <= daysInCurrentMonth; i++) {
    if (i < 1) {
      monthDays.push(null);
    } else {
      monthDays.push({ day: i, feeling: null });
    }
  }
  cache[year] = {};
  cache[year][month] = monthDays;
  return monthDays;
};

const monthToString = index => {
  return MONTHS[index] || null;
};

export { calendarPageDays, monthToString };
