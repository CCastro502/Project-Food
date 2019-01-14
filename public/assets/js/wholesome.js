$(document).ready(function () {
    if (sessionStorage.getItem("id")) {
        $("#profile").html("<li class='create-page nav-pills'><a class='nav-link' href='/profile/" + sessionStorage.getItem + "('id')>Profile</a></li>")
    }
})