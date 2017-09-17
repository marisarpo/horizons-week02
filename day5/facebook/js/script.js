"use strict";

$(document).ready(function(){
  if (localStorage.getItem('token')){ //will either be null or undefined
    console.log("Auto-login successful.");
    renderToolbar();
    renderPostBox();
    renderTimeline(0);
  }
});

// Event Handlers
$('.sign-up-btn').on('click', signup);
$('#login-button').on("click", login);

var alertMessage;

// Functions
function signup(event) {
  var firstName = $('#signup-fname').val()
  var lastName = $('#signup-lname').val()
  var eMail = $('#signup-email').val()
  var password = $('#signup-pass').val()
  event.preventDefault();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    type: 'POST',
    data: {
      "fname": firstName,
      "lname": lastName,
      "email": eMail,
      "password": password
    },
    success: function(data) {
      console.log(`FaceHorizons account created successfully.`);
      alertMessage = "FaceHorizons account created successfully. Log in above!";
      var alertGoodHTML = `<span class="glyphicon glyphicon-exclamation-sign"
                        aria-hidden="true"></span><span class="sr-only">
                        Error:</span> ${alertMessage}<button type="button"
                        class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>`;
      $('#success').removeClass('hide');
      $('#success').html(alertGoodHTML);
    },
    error: function(e) {
      //console.log(e);
      //console.log(e.responseJSON.error);
      switch(e.responseJSON.error) {
        case "Incomplete register definition.":
          alertMessage = "Please ensure that you've filled out all fields and try again."
          break;
        case "Invalid email.":
          alertMessage = "Please enter a valid email address and try again."
          break;
        case "User already registered with email.":
          alertMessage = "That email has already been registered. Sign in above!"
          break;
        default:
          alertMessage = "Something went wrong! Try again later."
          break;
      }
      var alertBadHTML =  `<span class="glyphicon glyphicon-exclamation-sign"
                          aria-hidden="true"></span><span class="sr-only">
                          Error:</span> ${alertMessage}<button type="button"
                          class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span></button>`
      $('#fail').removeClass('hide');
      $('#fail').html(alertBadHTML);
    }
  })
}

function login(event){
  /*
  Write the front-end code the login section of your Facebook site. One way to
  create the login form is to create <input> elements and a <button> element with
  a click handler. When the button is pressed you should use the values in the
  input elements to populate your AJAX request.
  */
  var EMAIL = $('#login-email').val();
  var PASS = $('#login-pass').val();

  $.ajax(
    'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
      {
        method: 'POST',
        success: function(data) {
          console.log("Login successful.");
          localStorage.setItem('token', data.response.token);
          localStorage.setItem('user_id', data.response.id);
          renderToolbar();
          renderPostBox();
          renderTimeline(0);
      },
      data: {
        email: EMAIL,
        password: PASS
      }, error: function(e){
        console.log(e.responseJSON.error);
        switch(e.responseJSON.error) {
          case "Login failed.":
            alertMessage = "Login failed! Check your login details and try again.";
            break;
          default:
            alertMessage = "Login failed! Try again later.";
            break;
        }
        var alertBadHTML =  `<span class="glyphicon glyphicon-exclamation-sign"
                            aria-hidden="true"></span><span class="sr-only">
                            Error:</span> ${alertMessage}<button type="button"
                            class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>`
        $('#fail').removeClass('hide');
        $('#fail').html(alertBadHTML);
      }
    });
    event.preventDefault();
  }

var posts;

function renderToolbar(){
  // renders the toolbar on top of the screen
  var toolbarHTML = `<div class="btn-group btn-group-sm" role="group" aria-label="..." id="toolbar">
    <p id="welcomeText">Welcome to Face Horizons!</p>
    <button type="button" class="btn btn-default" id="chat-button">Chat</button>
    <button type="button" class="btn btn-default" id="log-out-button">Log Out</button>
  </div>`
  $("header .col-md-9").html(toolbarHTML);
  $("#log-out-button").on("click", logout);
}

function renderPostBox(){
  //renders the post-maker
  var makePostHTML = `<div class="row" id="writePost">
                        <div class="col-lg-6 offset-lg-3 col-md-8 .offset-md-2">
                          <h4>Write a Post:</h4>
                          <div class="input-group">
                            <span class="input-group-addon" id="sizing-addon1">
                              <span class="glyphicon glyphicon-edit"></span>
                            </span>
                            <input type="text" class="form-control" placeholder="Share something with the world..." id="newPostInput">
                            <span class="input-group-btn">
                              <button class="btn btn-default" type="button" id="newPostButton">Post</button>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="row" id="postRow">
                        <div class="col-lg-6 offset-lg-7 col-md-8 .offset-md-2" id="postContainer">
                        </div>
                      </div>
                      `
  $("section").html(makePostHTML);
  $("section>row").attr("id", "writePost");
  $('#newPostButton').on("click", makeNewPost); //adds click handler to post button
}

function renderTimeline(pageNum){
  //Renders the posts
  var postListURL = "https://horizons-facebook.herokuapp.com/api/1.0/posts/:" + pageNum;
  $.ajax(
      postListURL,
      {
        method: 'GET',
        success: function(response){
          console.log("Posts retrieved successfully.");
          posts = response;
          $('#postContainer').html("");
          //iterate through each post in the array
          posts.response.forEach(function(post){
              //render each post
              var numComments = post.comments.length;
              var numLikes = post.likes.length;
              var postAuthor = post.poster.name;
              var postAuthorId = post.poster.id;
              var postId = post._id;
              var postContent = post.content;

              var postTopHTML = `
              <div class="panel-group" role="tablist" id="post${postId}">
                <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="collapseHeading${postId}">
                    <p class="panel-title">
                      <span class="label label-primary">${postAuthor}</span>
                      ${postContent}
                    </p>
                  </div>
                  <div class="panel-collapse collapse" role="tabpanel" id="collapse${postId}" aria-labelledby="collapseHeading${postId}" aria-expanded="false">
                    <ul class="list-group" id="ul${postId}">
                    `;
              var postBottomHTML = `<li class="list-group-item">
                            <div class="input-group input-group-sm">
                              <span class="input-group-addon" ><span class="glyphicon glyphicon-pencil"></span></span>
                              <input type="text" class="form-control" placeholder="Share your thoughts..." id="replyInput${postId}">
                              <span class="input-group-btn">
                                <button class="btn btn-default" type="button" id="replyButton${postId}">Reply</button>
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="panel-footer panel-default">
                        <div class="btn-toolbar" role="toolbar">
                          <div class="btn-group" role="group">
                            <button type="button" class="btn btn-default" id="like${postId}"><span>${numLikes} </span><span class="glyphicon glyphicon-thumbs-up"></span></button>
                            <button type="button" class="btn btn-default"><span>${numComments} </span><span class="glyphicon glyphicon-comment"></span></button>
                          </div>
                          <div class="btn-group" role="group">
                            <button type="button" data-toggle="collapse" data-target="#collapse${postId}" aria-expanded="false" aria-controls="collapse${postId}" class="btn btn-default">Show/Hide Comments</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  `
                var totalPostHTML = "";
                totalPostHTML += postTopHTML;
                if (numComments > 0) {
                  post.comments.forEach(function(comment){
                    var commentContent = comment.content;
                    var commentAuthor = comment.poster.name;
                    var commentHTML = `<li class="list-group-item"><span class="label label-default">${commentAuthor}</span> ${commentContent}</li>`
                    totalPostHTML += commentHTML;
                  });
                }
                totalPostHTML += postBottomHTML
                var replyButtonSelector = '#replyButton' + postId;
                var likeButtonSelector = "#like" + postId;
                $('#postContainer').append(totalPostHTML);
                $(replyButtonSelector).on("click", reply);
                $(likeButtonSelector).on("click", like);
          });
        },
        data: {
          "token": localStorage.getItem("token")
        }, error: function(error){
          console.log(error.responseText);
        }
    });
}

function getPosts(pageNum){
  // use currentPageNum to determine which set of 10 posts to retrieve
  // incremented each time a new set of posts is successfully retrieved and displayed
  // not actually used
  var postListURL = "https://horizons-facebook.herokuapp.com/api/1.0/posts/:" + pageNum;
  $.ajax(
      postListURL,
      {
        method: 'GET',
        success: function(response){
          console.log("Posts retrieved successfully.");
          posts = response;
        },
        data: {
          "token": localStorage.getItem("token")
        }, error: function(error){
          console.log(error.responseText);
        }
    });
  }

function makeNewPost(event){
  console.log("getting here");
  var makePostURL = "https://horizons-facebook.herokuapp.com/api/1.0/posts";
  $.ajax(
    makePostURL,
    {
      method: 'POST',
      success: function(response){
        console.log("New post made successfully.")
        $('#newPostInput').val(""); //clears the input box
        renderTimeline(0);
        },
      data: {
        "token": localStorage.getItem("token"),
        "content": $('#newPostInput').val()
        },
      error: function(error){
        console.log(error.responseText);
      }
    });
    event.preventDefault();
}

function reply(event){
  var button = $(event.target);
  var buttonId = button.attr("id");
  var postId = buttonId.substring(11,buttonId.length); //
  var inputId = "#replyInput" + postId
  var comment = $(inputId).val();
  var postCommentURL = "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/" + postId;
  $.ajax(
    postCommentURL,
    {
    method: 'POST',
    success: function(response){
      renderTimeline(0);
    },
    data: {
      "token": localStorage.getItem("token"),
      "content": comment
    }, error(e){
      console.log(e.responseJSON.error);
      console.log("comment not submitted...")
    }
  });
  event.preventDefault();
}

function like(event){
  var button = $(event.target);
  var buttonId = button.attr("id");
  console.log(buttonId);
  var postId = buttonId.substring(4,buttonId.length);
  console.log(postId);
  var postCommentURL = "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/" + postId;
  $.ajax(
    postCommentURL,
    {
    method: 'GET',
    success: function(response){
      renderTimeline(0);
    },
    data: {
      "token": localStorage.getItem("token")
    }, error(e){
      console.log(e.responseJSON.error);
      console.log("like not submitted...")
    }
  });
  event.preventDefault();
}

function logout(event){
  console.log("Attempting logout...")
  var logoutURL = "https://horizons-facebook.herokuapp.com/api/1.0/users/logout?token=" + localStorage.getItem("token");
  $.ajax(
    logoutURL,
    {
      method: 'GET',
      success: function(response){
        console.log("Successfully logged out from server... Attempting local logout.")
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        console.log("User has been successfully logged out! Refreshing page.");
        location.reload();
      },
      data: {
        "token": localStorage.getItem("token")
      }, error: function(error){
        console.log(error.responseText);
        location.reload();
      }
  });
  event.preventDefault();
}
