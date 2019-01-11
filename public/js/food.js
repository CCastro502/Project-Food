$("#submit").on("click", function () {
  event.preventDefault();

  if ($("#author-name").val().length < 1 || $("#food-name").val().length < 1 || $("#ingredients").val().length < 1 || $("#directions").val().length < 1 || $("#region").val().length < 1) {
    alert("You must enter all of areas except for ountry and video");
    return;
  };

  function getRegionId() {
    var region_name = $("#region").val()
    if (region_name === "northamerica") {
      return 1
    } else if (region_name === "southamerica") {
      return 2
    } else if (region_name === "europe") {
      return 3
    } else if (region_name === "asia") {
      return 4
    } else if (region_name === "africa") {
      return 5
    } else if (region_name === "australia") {
      return 6
    }
  }

  var obj = {
    author_name: $("#author-name").val(),
    food_name: $("#food-name").val(),
    ingredients: $("#ingredients").val(),
    directions: $("#directions").val(),
    region_name: $("#region").val(),
    video_url: $("#video").val(),
    country: $("#country").val(),
    RegionId: getRegionId(),
  };


  // $.post("/api/foods", obj).then(function (data) {});
  // $.ajax({
  //   type: "POST",
  //   url: "api/foods",
  //   data: obj
  // // })

  console.log(obj);
  $.ajax("/api/" + obj.region_name, {
    type: "POST",
    data: obj
  }).then(function (response) {
    console.log(response, `New Region: ${obj}`);
    // console.log(`New Region: ${obj}`);
    // if (err) throw err;
    location.reload();
  });
});

$("#login").on("click", function (event) {
  console.log("#login: I've been hit");
  $("#email").html("");
})

$("#registration").on("click", function (event) {
  console.log("#registration: I've been hit");
  $("#email").html("<div class='form-group'><label for='email-address'>Email address: </label><input type='email' class='form-control' name='email' id='email-address' placeholder='abc@123.com' required>");
})

$("#signin").on("click", function (event) {
  if ($("#email-address").val()) {
    console.log($("#email-address").val(), $("#username").val(), $("#password").val());
  }
  

  // var obj = {
  //   email: $("#email-address").val(),
  //   username: $("#username").val(),
  //   password: $("#password").val(),
  // }

  // $.ajax("/api/users", {
  //   type: "POST",
  //   data: obj
  // }).then(function (response) {
  //   console.log(`New user created`);
  //   location.reload();
  // });
})

{/* <div class="form-group">
            <label for="email">Email address: </label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="abc@123.com">
        </div> */}