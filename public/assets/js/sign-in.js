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
                $('#modal1').modal();
            }
        } else {
            $('#modal2').modal();
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
                $('#modal3').modal();
                setTimeout(myFunction, 2000)
                function myFunction() {
                    $(location).attr('href', '/');
                }
            } else {
                $('#modal4').modal();
                $("#username").val("");
                $("#password").val("");
            }
        })
    }
})