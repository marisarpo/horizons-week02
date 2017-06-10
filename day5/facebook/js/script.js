//main script
var token;
var userID;

$("document").ready(function() {

  $(".card").on("click", function() {
    $("#myModal").modal("show")
  })

  $("#login-button").on("click", function() {
    var usrCapture = $("#login-usr").val()
    var passCapture = $("#login-pwd").val()
    userLogin(usrCapture, passCapture)
  });

  $("#reg-button").on("click", function() {
    var first = $("#reg-firstname").val();
    var last = $("#reg-lastname").val();
    var usr = $("#reg-usr").val();
    var pwd = $("#reg-pwd").val();
    userRegister(first, last, usr, pwd)
  })

  $("#goto-reg-btn").on("click", function() {
    $("#login-screen").addClass("hidden")
    $("#register-screen").removeClass("hidden")
  })

  $("#goto-login-btn").on("click", function() {
    $("#register-screen").addClass("hidden")
    $("#login-screen").removeClass("hidden")
  })




})

function userLogin(email, password) {
  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/login", {
    method: 'POST',
    success: function(data) {
      localStorage.setItem('token', data.response.token)
      console.log("It worked!");
      renderHomeScreen()
    },
    error: function(err) {
      console.log("login failed, error:", err);
    },
    data: {
      email: email,
      password: password
    }
  })
}

function userRegister(first, last, username, password) {
  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/register", {
    method: 'POST',
    success: function() {
      console.log("Registration Success!");
      $("#register-screen").addClass("hidden")
      $("#login-screen").removeClass("hidden")
    },
    error: function(err) {
      console.log("register request failed, error:", err);
    },
    data: {
      fname: first,
      lname: last,
      email: username,
      password: password
    }
  })
}

function renderHomeScreen() {
  $("#auth-div").addClass("hidden");
  $("body").prepend('<center id="login-loader"><img src="images/fluid-loader.gif"></center>');
  setTimeout(function(){$("#login-loader").remove();$("#main-div").removeClass("hidden")}, 1000);
  loadTenPosts()




}


var loadTenPosts = function() {

  var posts = []
  var depth = 1

  function pushPosts() {
    console.log(posts);

    for (var post of posts) {
      console.log(post);

      var name = post.poster.name;
      var postID = post._id;
      var nameID = post.poster.id;
      var body = post.content;
      var time = new Date(post.createdAt).toLocaleString()

      var newPost = $(`
      <div class="card post" id="${postID}">
        <img src="images/logo.png" alt="Avatar">
        <div class="post-container">
          <h4><b>${name}</b></h4><p>${time}</p>
        </div>
        <div class="post-body">
          <p>${body}</p>
        </div>
      </div>
      `)

      $(".posts-list").prepend(newPost)


    }
    posts = []

  }

  (function() {
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/" + parseInt(depth),
      method: "GET",
      success: function(data){
        console.log(data);
        depth++;
        posts = data.response
        pushPosts()
      },
      data: {
        token: localStorage.getItem('token')
      }
    })
  }())
}
