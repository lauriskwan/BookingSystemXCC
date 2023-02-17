// Handling user action
$(".calendar__daynumber").on("click", (e) => {
  let getdate = $("#get_date").val();
  let reformattedDate = getdate.split("-").reverse().join("-");
  // console.log(reformattedDate);

  axios.get(`/calendar?date=${reformattedDate}`).then((res) => {
    $(".courseList").html("");
    if (res.data.length === 0) {
      $(".courseList").append(`<h6>No course today.</h6>`);
    }
    res.data.forEach((course) => {
      $(".courseList").append(
        `<div class="courseListItem">
      <div class="col-3">
      <h6>${course.time_slot}</h6>
      </div>
            <div class=" courseName"><h6>${course.course_name} (${course.sport_name})</h6></div>
            <div class=" courseInstructor"><p>${course.name}</p></div>
            <div class=" courseQuota"><p>${course.quota}</p></div>
      </div>`
      );
    });
  });
});
