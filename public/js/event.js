// Handling user action
$(".calendar__daynumber").on("click", (e) => {
  //e.preventDefault();
  //console.log("day pressed");
  let getdate = $("#get_date").val();
  let reformattedDate = getdate.split("-").reverse().join("-");
  console.log(reformattedDate);
  //$("#get_date_form").submit();
  //let daynumber = $(".calendar__number");
  //$(`div[value=${getdate}]`).css({ color: "red" });
  // fetch(`/calendar?date=${reformattedDate}`, {method: 'GET'}).then(response => console.log(response));
  const arr = [
    {
      course_name: "Test",

      quota: 10,
      instructor_id: 1,
      sport_id: 1,
      room_id: 1,
      date: "2023-02-28",
      time_slot_id: 1,
    },
    {
      course_name: "Test2",

      quota: 15,
      instructor_id: 2,
      sport_id: 2,
      room_id: 1,
      date: "2023-02-28",
      time_slot_id: 2,
    },
  ];

  arr.forEach((course) => {
    $(".resClass").append(
      `<h1>${course.course_name}</h1><br>
      <p>${course.instructor_id}</p><br>
      <p>${course.quota}</p><br>
      <p>${course.sport_id}</p><br>
      <p>${course.room_id}</p><br>
      <p>${course.date}</p><br>
      <p>${course.time_slot_id}</p><br>`
    );
  });
});
