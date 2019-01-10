$("#submit").on("click", function () {
  event.preventDefault();
  
  var obj = {
    authorName : $("#author_name").val(),
    foodName : $("#food_name").val(),
    ingredients : $("#ingredients").val(),
    directions : $("#directions").val(),
    region_name : $("#region").val(),
    video_url : $("#video").val(),
    country : $("#country").val(),
    submitBtn : $("#submit").val(),
  };
  
  if (!(obj.authorName && obj.foodName && obj.ingredients && obj.directions && obj.region)) {
    alert("You must enter all of areas except for Country and video");
    return;
  };
  
  $.post("/api/foods", obj).then(function (data) {});
});