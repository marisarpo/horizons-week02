"use strict";


$(document).ready(function() {

  $(".reg").hide();
  $(".log").hide();
  //$(".newsfeed").hide();
  load_posts();


  $("#r_register").on("click", function() {
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
      type: "POST",
      data: {
        fname: $("#f_first_name").val(),
        lname: $("#f_last_name").val(),
        email: $("#f_email").val(),
        password: $("#f_password").val()
      },
      success: function() {
        console.log("registration successful");
        $(".reg").hide();
        $(".log").show();
      },
      error: function(err) {
        console.log("error", err);
      }
    });
  });

  $("#l_register").on("click", function() {
    $(".log").hide();
    $(".reg").show();
  });

  $("#r_login").on("click", function() {
    $(".reg").hide();
    $(".log").show();
  });

  $("#l_login").on("click", function() {
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
      method: 'POST',
      success: function(data) {
        localStorage.setItem('token', data.response.token);
        console.log("login successful");
        $(".log").hide();
        $(".newsfeed").show();
        load_posts();
      },
      error: function(err) {
        console.log("error", err);
      },
      data: {
        email: $("#l_email").val(),
        password: $("#l_password").val(),
      }
    });
  });

  function create_post(obj) {
    return `<div class="card-body">
        <h5 class="card-title">${obj.poster.name}</h5>
        <p class="card-text">${obj.content}</p>
        <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-thumbs-up"></span> Like (${obj.likes.length})
        </button>
        <button type="button" class="btn btn-default btn-sm">
          Comment (${obj.comments.length})
        </button>
    </div>`;
  }

  function create_post_you(body) {
    return `<div class="card-body you-post">
        <h5 class="card-title">you</h5>
        <p class="card-text">${body}</p>
        <button type="button" class="btn btn-default btn-sm like-bt">
          <span class="glyphicon glyphicon-thumbs-up"></span> Like
        </button>
        <button type="button" class="btn btn-default btn-sm">
          Comment
        </button>
    </div>`;
  }

  function create_post_list(arr) {
    for (var i = 0; i < arr.length; i++) {
      $(".card-list").append(create_post(arr[i]));
    }
  }



  function load_posts() {
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
      data: {
        token: localStorage.getItem('token')
      },
      success: function(resp) {
        console.log("retrieving post data successful");
        create_post_list(resp.response);
      },
      error: function(err) {
        console.log("error", err);
      }
    });
  }

  $(".share-post").on("click", function() {
    var cont = $("#post-content").val();
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
      data: {
        token: localStorage.getItem('token'),
        content: cont
      },
      success: function() {
        console.log("post successful");
        $(".card-list").prepend(create_post_you(cont));
      },
      error: function(err) {
        console.log("error", err);
      }
    });
  });

  $("#logout").on("click", function() {
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/logout",
      data: {
        token: localStorage.getItem('token')
      },
      success: function() {
        console.log("logout successful");
        $(".newsfeed").hide();
        $(".reg").show();
      },
      error: function(err) {
        console.log("error", err);
      }
    });
  });

  setInterval(function() {
    $(".card-list").empty();
    load_posts();
  }, 30000);







});
