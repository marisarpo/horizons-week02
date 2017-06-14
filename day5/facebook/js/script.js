var apiKey = "";
var apiToken = "";

$("document").ready(function() {
  $("#login-lpage").on('click', function() {
    var email = $('#username-login').val();
    var password = $('#password-login').val();
    userLogin(email, password);
    })
  })

function userLogin(email, password) {
$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
  method: 'POST',
  success: function(data) {
    localStorage.setItem('token', data.response.token);
    getPosts();
    renderHomeScreen();
    refresh();
  },
  error: function(err) {
    console.log(err);
    console.log("login failed");
  },
  data: {
      email: email,
      password: password,
    }
  });
}

function userRegistration(firstName, lastName, username, passcode) {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    method: 'POST',
    success: function(data){
      console.log("registration successful!");
      userLogin(username, passcode);
    },
    error: function(err) {
      console.log(err);
      console.log("registration error. appropriate info?");
    },
    data: {
      fname: firstName,
      lname: lastName,
      email: username,
      password: passcode,
    }
  })
}

function renderHomeScreen() {
  $('#login-screen').addClass("hidden");
  $('#registration-screen').addClass("hidden");
  $('#home-screen').removeClass("hidden");

}

function getPosts(i) {
  if (i === undefined) {
    var i = 1;
  }
  if (i !== 0){
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/${i}`, {
      method: 'GET',
      success: function(data) {
        if (data.response.length !== 0){
          ++i;
          renderPost(data);
      }
      else {
        i = 0;
      }
      getPosts(i);
    },
      data: {
      token: localStorage.getItem('token'),
    }
    })
  }
  else {
    return undefined;
  }
}

function renderPost(object){
  var postArr = object.response;

  postArr.forEach(function(postInfo) {
      $('.board').append(`<div class="post">
        <div class="post-writing">
        <h5>${postInfo.poster.name}</h5>
        <p>${postInfo.content}</p>
        </div>
        <div class="post-btn" postId="${postInfo._id}">
          <p>${postInfo.likes.length} <span class="glyphicon glyphicon-thumbs-up"></p>
          <div class="like-btn">
            <button class="btn btn-default" type="button" id="like-btn">Like</button>
          </div>
          <p>${postInfo.comments.length} <span class="glyphicon glyphicon-list-alt"></p>
          <div class="reply-btn">
            <button class="btn btn-default" type="button" id="reply-btn">Reply</button>
          </div>
        </div>
      </div>
      <div class="replies"></div>`)
  })
}


function postPost(postInfo) {
      $('.board').prepend(`<div class="post">
        <div class="post-writing">
        <h5>${postInfo.response.poster.name}</h5>
        <p>${postInfo.response.content}</p>
        </div>
        <div class="post-btn" postId="${postInfo.response._id}">
          <p>${postInfo.response.likes.length} <span class="glyphicon glyphicon-thumbs-up"></p>
          <div class="like-btn">
            <button class="btn btn-default like-btn" type="button" id="like-btn">Like</button>
          </div>
          <p>${postInfo.response.comments.length} <span class="glyphicon glyphicon-list-alt"></p>
          <div class="reply-btn">
            <button class="btn btn-default reply-btn" type="button" id="reply-btn">Reply</button>
          </div>
        </div>
      </div>
      <div class="replies"></div>`)
}

//event-listeners
$('#login-rpage').on('click', function(){
  $('#registration-screen').addClass("hidden");
  $('#login-screen').removeClass("hidden");
})

$('#register-lpage').on('click', function(){
  $('#login-screen').addClass("hidden");
  $('#registration-screen').removeClass("hidden");
})

$('#register-rpage').on('click', function(){
  userRegistration($("#first-name-registration").val(), $("#last-name-registration").val(), $("#username-registration").val(), $("#password-registration").val())
})

//post-Post
$('#post-btn').on('click', function(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
    method: 'POST',
    success: function(postInfo) {
      if($('#post-content').val() === undefined) {
        return undefined;
      }
      postPost(postInfo);
    },
    data: {
      token: localStorage.getItem('token'),
      content: $('#post-content').val(),
    },
    error: function(err) {
    }
  })
})


$('.board').on('click','#like-btn', function() {
  $(this).closest($('.post-btn')).find($('.glyphicon-thumbs-up')).addClass('red');
  var postId = $(this).closest('.post-btn').attr('postId');
  $.ajax( `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${postId}`, {
    method: 'Get',
    success: function (post) {
      console.log(post);
    },
    data: {
      token: localStorage.getItem('token'),


    }
  })
})




function refresh() {
  setInterval(function(){
  $('.board').empty();
  getPosts();
}, 30000)
}

$('#logout').on('click', function() {
  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/logout",{
    method: 'GET',
    success: function() {
      $('#registration-screen').removeClass("hidden");
      $('#home-screen').addClass("hidden");
    }
  })
})
