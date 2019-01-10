$("#submit").on("click", function () {
  event.preventDefault();
  
  if ($("#author-name").val().length < 1 || $("#food-name").val().length < 1 || $("#ingredients").val().length < 1 || $("#directions").val().length < 1 || $("#region").val().length < 1)  {
    alert("You must enter all of areas except for ountry and video");
    return;
  };

  var obj = {
    author_name : $("#author-name").val(),
    food_name : $("#food-name").val(),
    ingredients : $("#ingredients").val(),
    directions : $("#directions").val(),
    region_name : $("#region").val(),
    video_url : $("#video").val(),
    country : $("#country").val(),
    submitBtn : $("#submit").val(),
  };

  
  // $.post("/api/foods", obj).then(function (data) {});
  $.ajax({
    type: "POST",
    url: "api/foods",
    data: obj
  })

  console.log(obj);
    $.ajax("/api/" + obj.region_name, {
        type: "PUT",
        data: obj
    }).then(function() {
        console.log(`New Region: ${obj}`);
        // if (err) throw err;
        location.reload();
    });
});