const date = new Date();
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
let today = date.toISOString().slice(0, 10).split("-").reverse().join("-");
$("#get_date").val(today);

const renderCalendar = () => {
  // const date = new Date();
  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevlastDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const lastweekday = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  date.setDate(1);
  date.toLocaleString(); //set back the time zone, after set day1

  let firstweekday = date.getDay();

  const nextDate = 7 - lastweekday - 1;

  // let ISOdate = date.toISOString().slice(0, 8).split("-").reverse().join("-");    // Does not work. be careful with time difference.
  let ISOdate = date.toLocaleDateString().slice(2, 10).split("/").join("-");
  const addZero = (x) => {
    if (x < 10) {
      return "0" + x + ISOdate;
    } else {
      return x + ISOdate;
    }
  };
  const prevMonth = new Date(date.getFullYear(), date.getMonth(), -1);
  const prevISOMonth = prevMonth
    .toISOString()
    .slice(0, 8)
    .split("-")
    .reverse()
    .join("-");
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);
  const nextISOMonth = nextMonth
    .toISOString()
    .slice(0, 8)
    .split("-")
    .reverse()
    .join("-");

  let days = "";
  //get prev month of days
  for (let p = firstweekday; p > 0; p--) {
    days += `<div class="calendar__number calendar__prevday" value="${
      prevlastDate - p + 1 + prevISOMonth
    }"><span class="day_circle">${prevlastDate - p + 1}</span></div>`;
    $(".calendar__daynumber").html(days);
  }
  //get current month of days
  for (let i = 1; i <= lastDate; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="calendar__number calendar__number--current current_month" value="${addZero(
        i 
      )}"><span class="day_circle">${i}</span></div>`;
      $(".calendar__daynumber").html(days);
    } else {
      days += `<div class="calendar__number current_month" value="${addZero(
        i
      )}"><span class="day_circle">${i}</span></div>`;
      $(".calendar__daynumber").html(days);
    }
  }
  //get next month of days
  for (let n = 1; n <= nextDate; n++) {
    days += `<div class="calendar__number calendar__nextday" value="${
      "0" + n + nextISOMonth
    }"><span class="day_circle">${n}</span></div>`;
    $(".calendar__daynumber").html(days);
  }
  var cnd_childs = document.querySelectorAll(".calendar__number");
  cnd_childs.forEach((el) =>
    el.addEventListener("click", (e) => {
      $("#get_date").val(el.getAttribute("value"));
    })
  );
};
renderCalendar();

//Click action by user
$("#cnd-month").html(months[date.getMonth()]);
//$("#cnd-today").html(date.toDateString());

$("#cnd-month-back").on("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
  $("#cnd-month").html(months[date.getMonth()]);
  //console.log("click back");
});
$("#cnd-month-next").on("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
  $("#cnd-month").html(months[date.getMonth()]);
  //console.log("click next");
});

// var childs = document.querySelectorAll(".calendar__number");
// for (var i = 0; i < childs.length; i++) {
//   childs[i].addEventListener("click", function () {
//     console.log(i);
//     //console.log(childs[i].getAttribute("day-id"));
//   });
// }

// cnd_number.on("click", () => {
//   console.log(cnd_number.length);
//   console.log($(".calendar__number").eq(5).attr("day-id"));
// });

//module.exports = { renderCalendar };
