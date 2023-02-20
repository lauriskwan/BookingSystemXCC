// On load
$(document).ready(() => {
  // See if user has upcoming courses
  if (document.getElementById("myCourseList") === null) {
    $(".myCourse")
      .html(`<h5 class="my-5">You don't have any upcoming course.</h5><br>
    <a href="/course"><h5 style="color: rgba(241, 90, 34, 1);">Book now</h5><a>`);
  }
});

$(".btnProfile").click(() => {
  setTimeout(() => {
    document.location.reload();
  }, 500); // Pretend action after getting server response, not good practice
});

// Handling user action
$(".calendar__daynumber").on("click", (e) => {
  let getdate = $("#get_date").val();
  let reformattedDate = getdate.split("-").reverse().join("-");
  $("#dateTitle").html(getdate);
  // console.log(reformattedDate);

  // Get courses on that date
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
      var quota;
      axios
        .get(`/quota/${course.id}`)
        .then((res) => {
          quota = res.data[0]["count"];
          console.log("quota: " + quota);
        })
        .then(function appendCourseList() {
          if (quota === undefined) {
            appendCourseList();
          } else {
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
        <div class="courseQuota"><p>Quota: ${quota}/${course.quota}</p></div>
      </div>
      </div>
      `
            );
            if (quota >= course.quota) {
              $(".bookingBtn").attr("value", "Full");
              $(".bookingBtn").attr("disabled", true);
            }
          }
        });
    });
  });
});

// Open booking modal
$(document).on("click", ".bookingBtn", function (e) {
  // $(".modal-body").html(`<h1>${$(this).parent().children(".courseID").val()}</h1>`);
  $(".booking-modal-body").html(
    `
    <input type="hidden" class="courseID" value="${$(this)
      .parent()
      .children(".courseID")
      .val()}">
    <div class="px-3 d-flex flex-column">
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
});

// Open booking modal in detail page
$(document).on("click", ".detailBookingBtn", function (e) {
  // $(".modal-body").html(`<h1>${$(this).parent().children(".courseID").val()}</h1>`);
  $(".booking-modal-body").html(
    `
    <input type="hidden" class="courseID" value="${$(this)
      .parents("#displayCourse")
      .find(".courseID")
      .val()}">
    <div class="px-3 d-flex flex-column">
       <p>Course name: ${$(this)
         .parents("#displayCourse")
         .find("#course_name")
         .html()}
        </p>
        <p>Date: ${$(this).parents("#displayCourse").find("#date").html()}
        </p>
        <p>Time: ${$(this).parents("#displayCourse").find("#time_slot").html()}
        </p>
        <p>Instructor: ${$(this)
          .parents("#displayCourse")
          .find("#instructor_name")
          .html()}
          </p>
     </div>
     `
  );
});

// Open cancel modal
$(document).on("click", ".cancelBtn", function (e) {
  $(".cancel-modal-body").html(
    `
    <input type="hidden" class="courseID" value="${$(this)
      .parent()
      .children(".courseID")
      .val()}">
    <div class="px-3 my-5 d-flex flex-column">
       <p>Are you sure you want to cancel your booking for ${$(this)
         .parents(".courseListItem")
         .find("#course_name")
         .html()}?
        </p>
     </div>
     `
  );
});

// Handle booking modal
$(document).on("click", "#confirmBookingBtn", function (e) {
  axios
    .post(
      `/course/book/${$(this)
        .parents(".modal-content")
        .find(".courseID")
        .val()}`
    )
    .then((data) => {
      if (data.data === "membership expired") {
        alert("Unsuccessful. Your membership has expired.");
      } else if (data.data === "already booked") {
        alert("You have already booked the course.");
      } else {
        alert("Booked Successfully.");
        document.location.assign("/mycourse");
      }
    })
    .then($("#bookingConfirmation").modal("hide"));
});

// Handle cancel modal
$(document).on("click", "#confirmCancelBtn", function (e) {
  axios
    .delete(
      `/course/cancel/${$(this)
        .parents(".modal-content")
        .find(".courseID")
        .val()}`
    )
    .then((data) => {
      if (data.data === "cancelled successfully") {
        alert("Cancelled successfully");
      } else {
        alert("Error");
      }
      document.location.reload();
    })
    .then($("#cancelCourse").modal("hide"));
});

$(function () {
  $("#closeModal").click(function () {
    $("#bookingConfirmation").modal("hide");
    $("#cancelCourse").modal("hide");
  });
});

// get course ID
// $(".modal-body").html($(this).parent().children(".courseID").val());
