$(document).ready(function () {
  if (sessionStorage.length > 0) {
    $("#submit").on("click", function () {
      event.preventDefault();

      if ($("#food-name").val().length < 1 || $("#ingredients").val().length < 1 || $("#directions").val().length < 1 || $("#region").val().length < 1) {
        
        //-------------Materialize modal
        $('#modal1').modal();
 
        //----------------Bootstrap modal
        // $('.modal').modal('show');
        //   $('.close').on('click', function(){
        //     $('.modal').modal('hide');
        //   });
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
        author_name: sessionStorage.getItem("username").split('"')[1],
        food_name: $("#food-name").val(),
        ingredients: $("#ingredients").val(),
        directions: $("#directions").val(),
        region_name: $("#region").val(),
        video_url: $("#video").val(),
        country: $("#country").val(),
        RegionId: getRegionId(),
        UserId: sessionStorage.getItem("id")
      };

      console.log(obj);
      $.ajax("/api/" + obj.region_name, {
        type: "POST",
        data: obj
      }).then(function (response) {
        console.log(response, `New Region: ${obj}`);
        // console.log(`New Region: ${obj}`);
        // if (err) throw err;
        // ---------The below modal is not working. Mike H.
        $('#modal2').modal();
        alert("You have succesfully posted your recipe");
        $(location).attr('href', '/');
      });
    });
// ---------- I cant get to this alert. Mike H.
  } else {
    alert("You must log in before you are allowed to create a post.")
    $(location).attr('href', '/');
  }

})