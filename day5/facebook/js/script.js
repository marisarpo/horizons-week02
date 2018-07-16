"use strict";
// localStorage.removeItem("token")

$(document).ready(function() {
  setEventListeners();
  if (localStorage.getItem("token")) {
    $('.login').hide();
    $('.register').hide();
    $('.newsfeed').show();
    render();
    setInterval(function(){
      // refresh page every 30 seconds
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
        method: 'GET',
        data: {
          token: localStorage.getItem('token')
        },
        success: function(data) {
          $('.comments').empty();
          // data automatically parsed from JSON string to obj
          var arr = data.response;
          // iterate over the array of objects to display a post and its comments and its comments' comments etc.
          arr.forEach(function(item) {
            renderPost(item);
          })
        },
        error: function(error) {
          alert("bad request");
          console.log(error);
        }
      });
      console.log("refreshed");
    }, 30000000);
  } else {
    $('.newsfeed').hide();
    $('.login').hide();
    $('.register').show();
  }
});

function setEventListeners() {
  $('#register').on('click', function(e) {
    e.preventDefault(); // default was to refresh to page every time the submit button is clicked
    register();
  });
  $('#login').on('click', function(e) {
    e.preventDefault();
    login();
  });
  $('#logout').on('click', function(e) {
    e.preventDefault();
    logout();
  });
  $('#toLogin').on('click', function(e) {
    e.preventDefault();
    toLogin();
  });
  $('#toRegister').on('click', function(e) {
    e.preventDefault();
    toRegister();
  });
  $('#post').click(function(e) {
    e.preventDefault();
    post();
  });
}


function logout() {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/logout', {
    method: 'GET',
    data: {
      token: localStorage.getItem("token")
    },
    success: function(){
      // destroy local storage of token and userID
      localStorage.setItem("token", null);
      localStorage.setItem("userID", null);
      // back to home page
      $('.newsfeed').hide();
      $('.login').show();
      console.log("logged out");
    },
    error: function(error) {
      console.log(error);
      alert("bad ajax request");
    }
  });
}
function login() {
  var email = $('.login .email').val();
  var password = $('.login .password').val();

  // Make AJAX call only when all 2 fields are filled
  if (email && password) {
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
      method: "POST",
      data: {
        email: email,
        password: password
      },
      success: function(data) {
        console.log("logged in!");
        // obtain token and userID from data
        localStorage.setItem('token', data.response.token);
        localStorage.setItem('userID', data.response.id);
        // can be accessed at a later time using localStorage.getItem('token')
        $('.login').hide();
        $('.newsfeed').show();
        render();
      },
      error: function(error) {
        alert('error loading ajax');
        console.log(error);
      }
    });
  } else {
    alert('fill in all information!');
  }
}

// go to login page
function toLogin() {
  $('.register').hide();
  $('.login').show();
}
// go to register page
function toRegister() {
  $('.register').show();
  $('.login').hide();
}


// display posts
function renderPost(item) {
  var author = item.poster.name;
  var content = item.content;
  var postTime = item.createdAt;
  var postID = item._id;
  var commentArr = item.comments;
  var numR = commentArr.length;
  var likesArr = item.likes;
  var numL = likesArr.length;
  // display post
  var text = `<div class="comment" id="${postID}">
    <div class="author h4">${author}</div>
    <div class="time h6">${postTime}</div>
    <div class="message h5">${content}</div><br><hr>
    <div class="message h6">${numR} Replies</div>
    <div class="message h6">${numL} Likes</div>
    <div class="controls">
      <button class="Like btn btn-default">Like</button>
      <button class="Reply btn btn-default">Reply</button>
      <div class="replies"></div>
    </div>
  </div>`;
  var textObj = $(text);
  $(".comments").append(textObj);

  // check if this user liked this post
  var liked = false;
  for (var i = 0; i < likesArr.length; ++i) {
    var obj = likesArr[i];
    var objId = obj.id;
    var userID = localStorage.getItem("userID");

    if (userID === objId) {
      liked = true;
      break;
    }
  }

  // change the text of the Like button to Unlike
  if (liked) {
    $('#' + postID).find('.Like').text('Unlike');
  }

  // get comments for this post
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + postID, {
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      // data automatically parsed from JSON string to obj
      var arr1 = data.response;
      // iterate over the array of objects to display a post and its comments and its comments' comments etc.
      arr1.forEach(function(item) {
        renderComment(item, postID);
      })
    },
    error: function(error) {
      alert("bad request");
      console.log(error);
    }
  });
}

// display comments
function renderComment(comment, postID) {
    var author1 = comment.poster.name;
    var content1 = comment.content;
    var date = new Date(comment.createdAt);
    var postTime1 = date.toString();
    // display a comment
    var reply = `<div class="comment">
      <div class="author h4">${author1}</div>
      <div class="time h6">${postTime1}</div>
      <div class="message h5">${content1}</div>
      <div class="controls">
        <button class="Reply btn btn-default">Reply</button>
        <div class="replies"></div>
      </div>
    </div>`;
    var replyObj = $(reply);
    $('#' + postID).find('.replies').append(replyObj);
}

// retrieve and display posts and comments
function render() {
  // clear input fields
  $('.post textarea').val('');
  // get posts
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      $('.comments').empty();
      // data automatically parsed from JSON string to obj
      var arr = data.response;
      // iterate over the array of objects to display a post and its comments and its comments' comments etc.
      arr.forEach(function(item) {
        renderPost(item);
      })
    },
    error: function(error) {
      alert("bad request");
      console.log(error);
    }
  });
  console.log("rendered");
}

// like a post
$('.comments').on('click', '.Like', function() {
  var postID = $(this).closest('.comment').attr('id');
  console.log(postID);
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + postID, {
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function() {
      // toggle the class of the button display liked effect
      console.log("liked");
      render();
    },
    error: function(error) {
      console.log(error);
      alert('bad ajax request');
    }
  })
});

// make a comment
$('.comments').on('click', '.Reply', function() {
  var author = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  var postID = $(this).closest('.comment').attr('id');
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + postID, {
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: comment
    },
    success: function() {
      render();
    },
    error: function(error) {
      console.log(error);
      alert('bad ajax request');
    }
  })
});

// Make a Post
function post() {
  var content = $('.post textarea').val();
  if (content) {
    // Make AJAX call
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
      method: "POST",
      data: {
        token: localStorage.getItem('token'),
        content: content
      },
      success: function(data) {
        console.log("successful posting");
        render();
      },
      error: function(error) {
        alert("bad request");
        console.log(error);
      }
    });
  } else {
    alert("a post can't be empty!");
  }
}
