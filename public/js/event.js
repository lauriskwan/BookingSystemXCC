// Handling user action
$(".calendar__daynumber").on("click", (e) => {
  let getdate = $("#get_date").val();
  let reformattedDate = getdate.split("-").reverse().join("-");
  // console.log(reformattedDate);

  axios.get(`/calendar?date=${reformattedDate}`).then((res) => {
    $(".courseList").html("");
    if (res.data.length === 0) {
      $(".courseList").append(`<div class="container courseListItem">
      <div class="courseDataLeft">
        <h5>No course on this date.</h5>
        </div>
      </div>`);
    }
    res.data.forEach((course) => {
      $(".courseList").append(
        `<div class="container courseListItem">
        <div class="courseButtons">
        <p class="courseDetail">View Detail</p>
        <input class="btn bookingBtn" type="submit" value="Book" />
        </div>
      <div class="row">
      <div class="courseDataLeft col-lg-3 col-sm-12">
        <div class="courseTime">
          <h6>${course.time_slot}</h6>
        </div>
        <div class="courseInstructor"><p>${course.name}</p></div>
      </div>
      <div class="courseDataRight col-lg-9 col-sm-12">
        <div class="courseName">
          <h6>${course.course_name} (${course.sport_name})</h6>
        </div>
        <div class="courseQuota"><p>Quota: ${course.quota}</p></div>
      </div>
      </div>`
      );
    });
  });
});
