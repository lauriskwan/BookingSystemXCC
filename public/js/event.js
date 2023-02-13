$(".calendar__number").on("click", (e) => {
  e.preventDefault();
  //console.log("day pressed");
  console.log($("#get_date").val());
  $("#get_date_form").submit();
});
