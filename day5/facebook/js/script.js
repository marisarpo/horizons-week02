$('#first-name').hide();
$('#last-name').hide();
$('#register-button').hide();
$('#newsfeed').hide();
$('#logout-button').hide();
$('#the-end').hide();
var modalTarget;
var intervalId;

function login(email, pass) {
  console.log("this was called??", email, pass);
  $.ajax({
    method: "POST",
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
    data: {
      "email": email, // The email of the registering user, used for later authentication. Must not be the email of an existing user
      "password": pass // The plaintext password of the registering user, used for later authentication. Don't worry, we've enforced strict HTTPS over the API and we hash and salt your password
    },
    success: function(successResponse) {
        console.log(successResponse);
        localStorage.setItem('token', successResponse.response.token);
        $('#user-landing').hide();
        $('#logout-button').show();
        $('#newsfeed').show();
        populateNewsfeed();
        intervalId = setInterval(populateNewsfeed, 30000);
    }
  })
}

$('#login-button').click(function() {
  login($('#login-email').val(), $("#login-password").val());
});



$('#register-button').click(function() {
  $.ajax({
    method: "POST",
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
    data: {
      "fname": $('#first-name').val(), // The first name of the registering user
      "lname": $('#last-name').val(), // The last name of the registering user
      "email": $('#login-email').val(), // The email of the registering user, used for later authentication. Must not be the email of an existing user
      "password": $("#login-password").val() // The plaintext password of the registering user, used for later authentication. Don't worry, we've enforced strict HTTPS over the API and we hash and salt your password
    },
    success: function(successResponse) {
      console.log(successResponse);
      $('#first-name').hide();
      $('#last-name').hide();
      $('#register-button').hide();
      $('#login-button').show();
      $('#goto-registration').show();
    },
    error: function(errorResponse) {
      console.log("REGISTRATION ERROR");
      console.log(errorResponse);
    }
  })
})

$('#goto-registration').click(function() {
  $('#first-name').show();
  $('#last-name').show();
  $('#register-button').show();
  $('#login-button').hide();
  $(this).hide();
})

function populateNewsfeed() {
  $.ajax({
      method: "GET",
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/",
      data: {
        token: localStorage.getItem('token')
      },
      success: function(successResponse) {
        console.log("got posts");
        console.log(successResponse)
        $('#newsfeed').html("");
        $('#newsfeed').append(renderComments(successResponse.response));
        $('.reply-button[name=replyTo-undefined').hide();
        $('.like-button[name=likeTo-undefined').hide();
      }
  })
}

function renderComments(commentsArr) {
 return _.reduce(_.map(commentsArr, renderComment), function(a,b) {return a + b}) || "";
}

function renderComment(commentObj) {
  // console.log(commentObj);
  var likeNum = commentObj.likes ? "Likes: " + commentObj.likes.length : "";
  return  '<div class="commentBox">' +
            '<div class="postName">' + commentObj.poster.name + '</div>' +
            '<div class="likeNum">' + likeNum + '</div>' +
            '<div class="postTime">' + commentObj.createdAt + '</div>' +
            '<div class="postContent">' + commentObj.content + '</div>' +
            '<div class="reaction-buttons">' +
              '<button class="like-button" name="likeTo-' + commentObj._id + '">Like</button>' +
              '<button class="reply-button" name="replyTo-' + commentObj._id + '">Reply</button>' +
            '</div>' +
            '<div class="responsesBox">' + renderComments(commentObj.comments) + '</div>' +
          '</div>';
}

$('#newsfeed').on("click", '.reply-button',function() {
  modalTarget = $(this).attr("name").split("-")[1];
  $('#messageModal').show();
});

$('#newsfeed').on("click", '.like-button',function() {
  $.ajax({
    method: 'GET',
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/" + $(this).attr("name").split("-")[1],
    data: {
      token: localStorage.getItem("token")
    },
    success: function(successResponse) {
      console.log("we good", successResponse);
      populateNewsfeed();
    },
    error: function(errorResponse) {
      console.log("we bad", errorResponse);
    }
  })
});

function sendReply(rootId, message) {
  $.ajax({
    method: "POST",
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/" + rootId,
    data: {
      token: localStorage.getItem("token"),
      content: message
    },
    success: function(successResponse) {
      console.log("we good", successResponse);
      populateNewsfeed();
    },
    error: function(errorResponse) {
      console.log("we bad", errorResponse);
    }
  })
}

function sendPost(message) {
  $.ajax({
    method: "POST",
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
    data: {
      token: localStorage.getItem("token"),
      content: message
    },
    success: function(successResponse) {
      console.log("we good", successResponse);
      populateNewsfeed();
    },
    error: function(errorResponse) {
      console.log("we bad", errorResponse);
    }
  })
}


// When the user clicks on <span> (x), close the modal
$('.close').click(function() {
    $('#messageModal').hide();
    $('#modalInput').val("");
})

$("#send-text").click(function() {
  var msg = $('#modalInput').val();
  modalTarget === "post" ? sendPost(msg) : sendReply(modalTarget, msg);
  $('#messageModal').hide();
  $('#modalInput').val("");
})

$('#post-button').click(function() {
  modalTarget = "post";
  $('#messageModal').show();
})


$('#logout-button').click(function() {
  $.ajax({
    method: 'GET',
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/logout",
    data: {
      token: localStorage.getItem("token")
    },
    success: function(successResponse) {
      console.log("logout", successResponse);
      $('#newsfeed').hide();
      $('#logout-button').hide();
      $('#the-end').show();
    }
  })
})
