$(document).ready(function() {
  $(".log-button").on("click", function(event) {
    event.preventDefault();
    var username = $("#log-username").val();
    var password = $("#log-password").val();
    $("#log-username").val("");
    $("#log-password").val("");
    console.log(username);
    console.log(password);
    $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/login", {
      method: 'POST',
      success: function(data) {
        console.log(data);
      },
      data: {
        email: username,
        password: password
      },
      error: function (err) {
        console.log("error");
      }
    });
  })

  $("#register").on("click", function(event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var first = $("#first").val();
    var last = $("#last").val();
    $("#username").val("");
    $("#password").val("");
    $("#first").val("");
    $("#last").val("");
    console.log(username);
    console.log(password);
    console.log(first);
    console.log(last);
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
      method: 'POST',
      success: function(data) {
        console.log(data);
      },
      data: {
        email: username,
        password: password,
        fname: first,
        lname: last
      },
      error: function (err) {
        console.log("error", err);
      }
    });
  })
})
