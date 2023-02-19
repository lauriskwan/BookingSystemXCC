// $(document).ready(() => {
//   $(".test_btn1").on("click", function msg_success() {
//     console.log("Form Submitted");
//     //$(".alert_ok span").html("Form Submitted Successfully");
//     $(".alert_ok").removeClass("hide");
//     $(".alert_ok").addClass("show");
//     setTimeout(function () {
//       $(".alert_ok").addClass("fadeout");
//     }, 2500);
//     setTimeout(function () {
//       $(".alert_ok").addClass("hide");
//       $(".alert_ok").removeClass("show");
//       $(".alert_ok").removeClass("fadeout");
//     }, 2800);
//   });
// });
$(document).ready(() => {
  $("form").submit(() => {
    //console.log("Form Submitted");
    //$(".alert_ok span").html("Form Submitted Successfully");
    $(".alert_ok").removeClass("hide");
    $(".alert_ok").addClass("show");
    setTimeout(function () {
      $(".alert_ok").addClass("fadeout");
    }, 2500);
    setTimeout(function () {
      $(".alert_ok").addClass("hide");
      $(".alert_ok").removeClass("show");
      $(".alert_ok").removeClass("fadeout");
    }, 2800);
  });
});
// function msg_fail(msg) {
//   console.log("Message : Fail");
//   $(".alert_fail span").html(msg);
//   $(".alert_fail").removeClass("hide");
//   $(".alert_fail").addClass("show");
//   setTimeout(function () {
//     $(".alert_fail").addClass("fadeout");
//   }, 2500);
//   setTimeout(function () {
//     $(".alert_fail").addClass("hide");
//     $(".alert_fail").removeClass("show");
//     $(".alert_fail").removeClass("fadeout");
//   }, 2800);
// }

// module.exports = { msg_success };
