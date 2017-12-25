import DateUtils from "../util/date";

describe("monthStartDay", () => {
  // data validated from Google Calendar
  test("should be Sunday index 0 given month: Januray and year:2017", () => {
    expect(DateUtils.monthStartDay(2017, 0)).toEqual(0);
  });

  test("is Saturday Index: 6 given month: July and year:2017", () => {
    expect(DateUtils.monthStartDay(2017, 6)).toEqual(6);
  });
});

describe("monthDays", () => {
  // data validated from Google Calendar
  test("should be an object with 31 keys for Januray", () => {
    let monthData = DateUtils.monthDays(2017, 0);
    expect(Object.keys(monthData).length).toEqual(31);
  });

  test("should be an object with 28 keys for February", () => {
    let monthData = DateUtils.monthDays(2017, 1);
    expect(Object.keys(monthData).length).toEqual(28);
  });
});
