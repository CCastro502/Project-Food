$("#login").on("click", function (event) {
    console.log("#login: I've been hit");
    $("#email").html("");
})

$("#registration").on("click", function (event) {
    console.log("#registration: I've been hit");
    $("#email").html("<div class='form-group'><label for='email-address'>Email address: </label><input type='email' class='form-control' name='email' id='email-address' placeholder='abc@123.com' required>");
})

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$("#signin").on("click", function (event) {
    event.preventDefault();
    var obj = {
        username: $("#username").val().trim(),
        password: $("#password").val().trim(),
        email: null
    }

    try {
        console.log($("#email-address").val().length);
        obj.email = $("#email-address").val()
    } catch (error) {
        for (var keys in obj) {
            if (obj[keys] === null || obj[keys] === "") {
                delete obj[keys]
            }
        }
    }

    if (obj.email) {
        if (validateEmail(obj.email)) {
            if (obj.username.length > 4 && obj.password.length > 7) {
                $.ajax("/api/users", {
                    type: "POST",
                    data: obj
                }).then(function (response) {
                    console.log("New user created");
                    location.reload();
                })
            } else {
                alert("Invalid username and/or password.")
            }
        } else {
            alert("Invalid email");
        }
    } else {
        console.log(obj);
        $.ajax("/api/users/" + obj.username, {
            type: "GET"
        }).then(function (response) {
            console.log(response[0].password);
            if (response[0].password == obj.password) {
                sessionStorage.setItem('id', JSON.stringify(response[0].id));
                sessionStorage.setItem('username', JSON.stringify(response[0].username));
                alert("You've logged in");
                $(location).attr('href', '/');
            } else {
                alert("You did not enter the right credentials");
                $("#username").val("");
                $("#password").val("");
            }
        })
    }
})