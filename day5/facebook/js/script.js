$(document).ready(function() {
  $(".logout").css("display","none");
  $(".login").css("display","none");
  // $(".register").css("display","none");
  if (localStorage.getItem("token") + "" !== "null") {
    //$(".reg-log-button").trigger("click");
  }

  $(".reg-log-button").on("click", function(event) {
    event.preventDefault();
    $(".login").css("display","");
    $(".register").css("display","none");
  })
  $(".go-to-reg").on("click", function(event) {
    event.preventDefault();
    $(".register").css("display","");
    $(".login").css("display","none");
  })
  var loginstuff = $(".login").html();
  $(".log-button").on("click", function(event) {
    $(".login").css("display","none");
    $(".register").css("display","none");
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
        localStorage.setItem('token', data.response.token);
        // hide the login screen
        // var socket = io.connect('https://horizons-facebook.herokuapp.com/socket.io');
        // socket.emit('authentication', {token: localStorage.getItem("token")});
        // socket.on('authenticated', function() {
        //   console.log("here");
        // });
        $.ajax({
          url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
          data: {
            token : localStorage.getItem("token")
          },
          method: 'GET',
          success : function(data) {
            $(".message-col").append(
              `<div class="new-com">
                <input type="text" placeholder="Content..." class="new-post-input"> </input>
                <button class="new-post-button"> Post </button>
              </div>`
            );
            console.log(data);
            for (var i = 0; i < data["response"].length; i++) {
              var name = data["response"][i]["poster"]["name"];
              var id = data["response"][i]["_id"];
              var time = new Date(data["response"][i]["createdAt"]);
              var content = data["response"][i]["content"];
              var likes = data["response"][i]["likes"].length;
              var numReplies = data["response"][i]["comments"].length;
              $(".message-col").append(
                `<div class="row post-text" id = "${id}">
                  <h3 class="poster-name"> ${name} </h3>
                  <h6> ${time} </h6>
                  <p> ${content} </p>
                  <button type="button" class="rep-button" data-toggle="modal" data-target="#myModal"> Reply </button>
                  <button> <span class="glyphicon glyphicon-thumbs-up like-it"></span> </button>
                  <h5 class= "some-counts"> <span class="num-replies">${numReplies}</span> Replies, <span class="num-likes">${likes}</span> Likes </h5>
                </div>`
              );
              for (var j = 0; j< data["response"][i]["comments"].length; j++) {
                var commentContent = data["response"][i]["comments"][j]["content"];
                var commentTime = new Date(data["response"][i]["comments"][j]["createdAt"]);
                var commentSender = data["response"][i]["comments"][j]["poster"]["name"];
                $(".message-col").append(
                  `<div class="row reply-text">
                    <div class="reply">
                      <h5> ${commentSender}: ${commentTime} </h5>
                      <p> ${commentContent} </p>
                    </div>
                  </div>`
                );
              }
            }
            $(".message-col").empty();
            $(".message-col").append(
              `<input type="text" placeholder="Content..." class="new-post-input"> </input>
              <button class="new-post-button"> Post </button>`
            );
            console.log(data);
            for (var i = 0; i < data["response"].length; i++) {
              var name = data["response"][i]["poster"]["name"];
              var id = data["response"][i]["_id"];
              var time = new Date(data["response"][i]["createdAt"]);
              var content = data["response"][i]["content"];
              var likes = data["response"][i]["likes"].length;
              var numReplies = data["response"][i]["comments"].length;
              $(".message-col").append(
                `<div class="row post-text" id = "${id}">
                  <h3 class="poster-name"> ${name} </h3>
                  <h6> ${time} </h6>
                  <p> ${content} </p>
                  <button type="button" class="rep-button" data-toggle="modal" data-target="#myModal"> Reply </button>
                  <button> <span class="glyphicon glyphicon-thumbs-up like-it"></span> </button>
                  <h5 class= "some-counts"> <span class="num-replies">${numReplies}</span> Replies, <span class="num-likes">${likes}</span> Likes </h5>
                </div>`
              );
              for (var j = 0; j< data["response"][i]["comments"].length; j++) {
                var commentContent = data["response"][i]["comments"][j]["content"];
                var commentTime = new Date(data["response"][i]["comments"][j]["createdAt"]);
                var commentSender = data["response"][i]["comments"][j]["poster"]["name"];
                $(".message-col").append(
                  `<div class="row reply-text">
                    <div class="reply">
                      <h5> ${commentSender}: ${commentTime} </h5>
                      <p> ${commentContent} </p>
                    </div>
                  </div>`
                );
              }
            }

            console.log(data);
            $(".new-post-button").on("click", function() {
              var newComment = $(".new-post-input").val();
              console.log("yay");
              $.ajax({
                url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
                method: 'POST',
                data: {
                  token: localStorage.getItem("token"),
                  content: newComment
                },
                success: function(data) {
                  console.log(data);
                  var name = data["response"]["poster"]["name"];
                  var time = new Date(data["response"]["createdAt"]);
                  var content = data["response"]["content"];
                  var likes = data["response"]["likes"].length;
                  var numReplies = data["response"]["comments"].length;
                  $(".new-post-button").after(
                    `<div class="row post-text">
                      <h3 class="poster-name"> ${name} </h3>
                      <h6> ${time} </h6>
                      <p> ${content} </p>
                      <button class="rep-button"> Reply </button>
                      <button> <span class="glyphicon glyphicon-thumbs-up like-it"></span> </button>
                      <h5 class= "some-counts"> <span class="num-replies">${numReplies}</span> Replies, <span class="num-likes">${likes}</span> Likes </h5>
                    </div>`
                  );
                }
              })
            })
            $(".message-col").on("click", ".like-it", function() {
              var postID = $(this).parent().parent().attr("id");
              console.log(postID);
              var toref = $($(this).parent().siblings()[4]);
              console.log(toref);
              var likesnum = toref.find(".num-likes");
              console.log(likesnum);
              var value = Number(likesnum.text());
              console.log(value);
              toref.find(".num-likes").text(value + 1);
              $.ajax({
                url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/" + postID,
                method: "GET",
                data: {
                  token: localStorage.getItem("token")
                },
                success: function(data) {
                  console.log("has succeeded");
                },
                error: function(err) {
                  console.log(err);
                }
              })
            })
            $(".message-col").on("click", ".rep-button", function() {
              var postID = $(this).parent().attr("id");
              var parent = $(this).parent();
              var date = new Date();
              var comment;
              $(".click-reply").on("click", function() {
                comment = $(".willReply").val();
                parent.after(
                  `<div class="row reply-text">
                    <div class="reply">
                      <h5> Caroline Okun: ${date} </h5>
                      <p> ${comment} </p>
                    </div>
                  </div>`
                );
                $.ajax({
                  url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/" + postID,
                  method: "POST",
                  data: {
                    token: localStorage.getItem("token"),
                    content: comment
                  },
                  success: function(data) {
                    console.log("has succeeded");
                  },
                  error: function(err) {
                    console.log(err);
                  }
                })
              })
              console.log(postID);
            })
            $(".logout").css("display","");
          },
          error : function(err) {
            console.log("error", err);
          }
        })
      },
      data: {
        email: username,
        password: password
      },
      error: function (err) {
        console.log("error");
      }
    });
    var startcycle = function() {setInterval(function() {
    $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/login", {
      method: 'POST',
      success: function(data) {
        localStorage.setItem('token', data.response.token);
        // hide the login screen

        $.ajax({
          url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
          data: {
            token : localStorage.getItem("token")
          },
          method: 'GET',
          success : function(data) {
            $(".message-col").append(
              `<input type="text" placeholder="Content..." class="new-post-input"> </input>
              <button class="new-post-button"> Post </button>`
            );
            console.log(data);
            for (var i = 0; i < data["response"].length; i++) {
              var name = data["response"][i]["poster"]["name"];
              var id = data["response"][i]["_id"];
              var time = new Date(data["response"][i]["createdAt"]);
              var content = data["response"][i]["content"];
              var likes = data["response"][i]["likes"].length;
              var numReplies = data["response"][i]["comments"].length;
              $(".message-col").append(
                `<div class="row post-text" id = "${id}">
                  <h3 class="poster-name"> ${name} </h3>
                  <h6> ${time} </h6>
                  <p> ${content} </p>
                  <button type="button" class="rep-button" data-toggle="modal" data-target="#myModal"> Reply </button>
                  <button> <span class="glyphicon glyphicon-thumbs-up like-it"></span> </button>
                  <h5 class= "some-counts"> <span class="num-replies">${numReplies}</span> Replies, <span class="num-likes">${likes}</span> Likes </h5>
                </div>`
              );
              for (var j = 0; j< data["response"][i]["comments"].length; j++) {
                var commentContent = data["response"][i]["comments"][j]["content"];
                var commentTime = new Date(data["response"][i]["comments"][j]["createdAt"]);
                var commentSender = data["response"][i]["comments"][j]["poster"]["name"];
                $(".message-col").append(
                  `<div class="row reply-text">
                    <div class="reply">
                      <h5> ${commentSender}: ${commentTime} </h5>
                      <p> ${commentContent} </p>
                    </div>
                  </div>`
                );
              }
            }
            $(".message-col").empty();
            $(".message-col").append(
              `<input type="text" placeholder="Content..." class="new-post-input"> </input>
              <button class="new-post-button"> Post </button>`
            );
            console.log(data);
            for (var i = 0; i < data["response"].length; i++) {
              var name = data["response"][i]["poster"]["name"];
              var id = data["response"][i]["_id"];
              var time = new Date(data["response"][i]["createdAt"]);
              var content = data["response"][i]["content"];
              var likes = data["response"][i]["likes"].length;
              var numReplies = data["response"][i]["comments"].length;
              $(".message-col").append(
                `<div class="row post-text" id = "${id}">
                  <h3 class="poster-name"> ${name} </h3>
                  <h6> ${time} </h6>
                  <p> ${content} </p>
                  <button type="button" class="rep-button" data-toggle="modal" data-target="#myModal"> Reply </button>
                  <button> <span class="glyphicon glyphicon-thumbs-up like-it"></span> </button>
                  <h5 class= "some-counts"> <span class="num-replies">${numReplies}</span> Replies, <span class="num-likes">${likes}</span> Likes </h5>
                </div>`
              );
              for (var j = 0; j< data["response"][i]["comments"].length; j++) {
                var commentContent = data["response"][i]["comments"][j]["content"];
                var commentTime = new Date(data["response"][i]["comments"][j]["createdAt"]);
                var commentSender = data["response"][i]["comments"][j]["poster"]["name"];
                $(".message-col").append(
                  `<div class="row reply-text">
                    <div class="reply">
                      <h5> ${commentSender}: ${commentTime} </h5>
                      <p> ${commentContent} </p>
                    </div>
                  </div>`
                );
              }
            }

            console.log(data);
            $(".new-post-button").on("click", function() {
              var newComment = $(".new-post-input").val();
              console.log("yay");
              $.ajax({
                url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
                method: 'POST',
                data: {
                  token: localStorage.getItem("token"),
                  content: newComment
                },
                success: function(data) {
                  console.log(data);
                  var name = data["response"]["poster"]["name"];
                  var time = new Date(data["response"]["createdAt"]);
                  var content = data["response"]["content"];
                  var likes = data["response"]["likes"].length;
                  var numReplies = data["response"]["comments"].length;
                  $(".new-post-button").after(
                    `<div class="row post-text">
                      <h3 class="poster-name"> ${name} </h3>
                      <h6> ${time} </h6>
                      <p> ${content} </p>
                      <button class="rep-button"> Reply </button>
                      <button> <span class="glyphicon glyphicon-thumbs-up like-it"></span> </button>
                      <h5 class= "some-counts"> <span class="num-replies">${numReplies}</span> Replies, <span class="num-likes">${likes}</span> Likes </h5>
                    </div>`
                  );
                }
              })
            })
            $(".message-col").on("click", ".like-it", function() {
              var postID = $(this).parent().parent().attr("id");
              console.log(postID);
              var toref = $($(this).parent().siblings()[4]);
              console.log(toref);
              var likesnum = toref.find(".num-likes");
              console.log(likesnum);
              var value = Number(likesnum.text());
              console.log(value);
              toref.find(".num-likes").text(value + 1);
              $.ajax({
                url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/" + postID,
                method: "GET",
                data: {
                  token: localStorage.getItem("token")
                },
                success: function(data) {
                  console.log("has succeeded");
                },
                error: function(err) {
                  console.log(err);
                }
              })
            })
            $(".message-col").on("click", ".rep-button", function() {
              var postID = $(this).parent().attr("id");
              var parent = $(this).parent();
              var date = new Date();
              var comment;
              $(".click-reply").on("click", function() {
                comment = $(".willReply").val();
                parent.after(
                  `<div class="row reply-text">
                    <div class="reply">
                      <h5> Caroline Okun: ${date} </h5>
                      <p> ${comment} </p>
                    </div>
                  </div>`
                );
                $.ajax({
                  url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/" + postID,
                  method: "POST",
                  data: {
                    token: localStorage.getItem("token"),
                    content: comment
                  },
                  success: function(data) {
                    console.log("has succeeded");
                  },
                  error: function(err) {
                    console.log(err);
                  }
                })
              })
              console.log(postID);
            })
          },
          error : function(err) {
            console.log("error", err);
          }
        })
      },
      data: {
        email: username,
        password: password
      },
      error: function (err) {
        console.log("error");
      }
    });
  }, 30000);};
  startcycle();
  $(".log-out-button").on("click", function() {
    clearInterval(startcycle);
    $(".message-col").empty();
  })
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
