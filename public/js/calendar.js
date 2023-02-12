const date = new Date();

// const renderCalendar = () => {
  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  date.setDate(1);
  let firstweekday = date.getDay();
  //for prev month of days
  const prevlastDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  //for next month of days
  const lastweekday = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const nextDate = 7 - lastweekday - 1;

  const months = [
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
    "December",
  ];

  let days = "";

  for (let p = firstweekday; p > 0; p--) {
    days += `<div class="calendar__number calendar__prevday" day-id="${
      prevlastDate - p + 1
    }">${prevlastDate - p + 1}</div>`;
    $(".calendar__daynumber").html(days);
  }

  for (let i = 1; i <= lastDate; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="calendar__number calendar__number--current" day-id="${i}">${i}</div>`;
      $(".calendar__daynumber").html(days);
    } else {
      days += `<div class="calendar__number" day-id="${i}">${i}</div>`;
      $(".calendar__daynumber").html(days);
    }
  }

  for (let n = 1; n <= nextDate; n++) {
    days += `<div class="calendar__number calendar__nextday" day-id="${n}">${n}</div>`;
    $(".calendar__daynumber").html(days);
  }
// };

//Click action by user
$("#cnd-month").html(months[date.getMonth()]);
//$("#cnd-today").html(date.toDateString());

$("#cnd-month-back").on("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});
$("#cnd-month-next").on("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});
//renderCalendar();

module.exports = { renderCalendar };