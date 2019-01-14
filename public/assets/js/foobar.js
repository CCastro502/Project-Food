function grabFoodId() {
    var arr = window.location.href.split("/")
    for (i = 0; i < arr.length; i++) {
        if (i === (arr.length - 1)) {
            return arr[i];
        }
    }
}

var id = grabFoodId()

$.ajax("/api/foods/id/" + id, {
    type: "GET"
}).then(function (response) {
    console.log(response);
    if (response.video_url.length > 1) {
        try {
            var url = response.video_url;
            var id = url.split("?v=")[1];
            var embedlink = "http://www.youtube.com/embed/" + id;
            try {
                $("#myIFrame").html("<iframe width='560' height='315' src='" + embedlink + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>")
            } 
            catch {
                console.log("Cannot embed video");
            }
        }
        catch {
            console.log("Your youtube video link is not proper");
        }
    }
})

$("#upvote").on("click", function () {
    if (sessionStorage.length > 0) {
        $.ajax("/api/foods/id/" + sessionStorage.getItem("id") + "/upvotes", {
            type: "PUT",
        }).then(function (response) {
            console.log("Upvotes have been updated");
            location.reload();
        });
    } else {
        alert("You must be logged in to upvote a recipe");
    }
})