$("#upvote").on("click", function() {
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