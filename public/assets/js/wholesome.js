$(document).ready(function () {
    if (sessionStorage.length > 0) {
        $("#profile").html("<li class='create-page nav-pills'><a class='nav-link' href='/profile/" + sessionStorage.getItem("id") + "'>Profile</a></li>")
    } else {
        $("#profile").html("<li class='create-page nav-pills'><a class='nav-link' href='/signin'>Log In</a></li>")
    }
})