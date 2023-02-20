// On load
$(document).ready(() => {
  // See if user has upcoming courses
  if (document.getElementById("myCourseList") === null) {
    $(".myCourse")
      .html(`<h5 class="my-5">You don't have any upcoming course.</h5><br>
    <a href="/instructor/add_course"><h5 style="color: rgba(241, 90, 34, 1);">Create course</h5><a>`);
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
        <a href="/instructor/course/detail/${course.id}"><p class="courseDetail">View Detail</p></a>
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
          }
        });
    });
  });
});

// Open cancel modal
$(document).on("click", ".cancelBtn", function (e) {
  $("#confirmCancelBtn").removeClass("confirmedCancel");
  $("#confirmCancelBtn").addClass("btn-primary");
  $("#confirmCancelBtn").removeClass("btn-danger");
  $(".cancel-modal-body").html(
    `
    <input type="hidden" class="courseID" value="${$(this)
      .parent()
      .children(".courseID")
      .val()}">
    <div class="px-3 my-5 d-flex flex-column">
       <p id="cancelMsg">Are you sure you want to cancel course ${$(this)
         .parents(".courseListItem")
         .find("#course_name")
         .html()}?
        </p>
     </div>
     `
  );
});

// Handle cancel modal
$(document).on("click", "#confirmCancelBtn", function (e) {
  axios
    .delete(
      `/course/remove/${$(this)
        .parents(".modal-content")
        .find(".courseID")
        .val()}`
    )
    .then((data) => {
      if (data.data === "cancelled successfully") {
        alert("Cancelled successfully");
        document.location.reload();
      } else if (data.data === "users exist") {
        $("#cancelMsg").html(
          "Number of booking of this course > 0. Still cancel?"
        );
        $("#confirmCancelBtn").addClass("confirmedCancel");
        $("#confirmCancelBtn").removeClass("btn-primary");
        $("#confirmCancelBtn").addClass("btn-danger");
      }
    });
});

$(document).on("click", ".confirmedCancel", function (e) {
  axios
    .delete(
      `/course/remove/confirmed/${$(this)
        .parents(".modal-content")
        .find(".courseID")
        .val()}`
    )
    .then((data) => {
      if (data.data === "cancelled successfully") {
        alert("Cancelled successfully");
        document.location.reload();
      } else {
        alert(data.data);
      }
    });
});

$(function () {
  $("#closeModal").click(function () {
    $("#cancelCourse").modal("hide");
  });
});

// get course ID
// $(".modal-body").html($(this).parent().children(".courseID").val());
