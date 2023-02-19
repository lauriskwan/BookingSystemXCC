// Handling user action
$(".calendar__daynumber").on("click", (e) => {
  let getdate = $("#get_date").val();
  let reformattedDate = getdate.split("-").reverse().join("-");
  $("#dateTitle").html(getdate);
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
        `
        <div class="container courseListItem">
        <div class="courseButtons">
        <input type="hidden" class="courseID" value="${course.id}">
        <a href="/course/detail/${course.id}"><p class="courseDetail">View Detail</p></a>
        <input class="btn bookingBtn" type="button" value="Book" data-bs-toggle="modal" data-bs-target="#bookingConfirmation"/>
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
      </div>
      `
      );
    });
  });
});

// $(document).on("click", ".bookingBtn", function (e) {
//   // do stuff
//   console.log($(this).parents("div").find(".courseListItem"));
// });

$(document).on("click", ".bookingBtn", function (e) {
  // $(".modal-body").html(`<h1>${$(this).parent().children(".courseID").val()}</h1>`);
  $(".modal-body").html(
    `
    <input type="hidden" class="courseID" value="${$(this)
      .parent()
      .children(".courseID")
      .val()}">
    <div class="d-flex flex-column">
       <p>Course name: ${$(this)
         .parents(".courseListItem")
         .find(".courseName > h6")
         .html()}
        </p>
        <p>Date: ${$("#get_date").val()}</p>
        <p>Time: ${$(this)
          .parents(".courseListItem")
          .find(".courseTime > h6")
          .html()}
        </p>
        <p>Instructor: ${$(this)
          .parents(".courseListItem")
          .find(".courseInstructor > p")
          .html()}</p>
     </div>
     `
  );
  // $("#confirmBtn").html(`
  //   <a href="/course/book/${$(this).parent().children(".courseID").val()}">
  //     <button type="button" class="btn btn-primary">Confirm</button>
  //   </a>`);
});

// Handle modal
$(document).on("click", "#confirmBookingBtn", function (e) {
  axios.post(
    `/course/book/${$(this).parents(".modal-content").find(".courseID").val()}`
  ).then(data => {
    if (data.data === "membership expired") {
      alert("Unsuccessful. Your membership has expired.");
    } else if (data.data === "already booked") {
      alert("You have already booked the course.");
    } else {
      alert("Booked Successfully.");
    }
  }).then($("#bookingConfirmation").modal("hide"));
});

$(function () {
  $("#closeModal").click(function () {
    $("#bookingConfirmation").modal("hide");
  });
});

// get course ID
// $(".modal-body").html($(this).parent().children(".courseID").val());
