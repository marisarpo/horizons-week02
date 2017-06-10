$('.register-page').hide();
$('.newsfeed').hide();
$('.logout').hide();

$('body').on('click','.likeButton',function() {
  var post = $(this).parent('.buttonGroup').siblings('.origin-post');
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/'+ post['0'].id, {
    method:"GET",
    success: function(data) {
      refreshPage();
    },
    data: {
      token: localStorage.getItem('token')
    }
  });
});

var replyPost;

$('body').on('click','.replyButton',function() {
  replyPost = $(this).parent('.buttonGroup').siblings('.origin-post');
  $('#replyModal').modal();
});

$('#modalSave').on('click',function() {
  var content = $('#replyInput').val();
  $('#replyModal').modal('toggle');
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/'+ replyPost['0'].id, {
    method:"POST",
    success: function(data) {
      refreshPage();
    },
    data: {
      token: localStorage.getItem('token'),
      content: content
    }
  });
});

function refreshPage() {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
    method: "GET",
    success: function(posts) {
      var responseArr = posts.response;
      $('.newsfeed').find($('.comment-container')).remove();
      responseArr.forEach(function(res) {
        var commentCon = $(`<div class="comment-container">
                              <div class="origin-post" id="${res._id}">
                                <p id="${res.poster.id}" class="name">${res.poster.name}</p>
                                <ul class="date">${res.createdAt}</ul>
                                <ul class="comment">${res.content}</ul>
                              </div>
                              <div class="pull-right buttonGroup">
                                <button class="likeButton">like ${res.likes.length}</button>
                                <button class="replyButton">reply</button>
                              </div>
                            </div>`)
        var replyCon = $(`<div class="reply-post"></div>`);
        var replyArr = res.comments;
        replyArr.forEach(function(reply) {
          var currentRep = $(`<li>
                                <p class="name">${reply.poster.name}</p>
                                <ul class="date">${reply.createdAt}</ul>
                                <ul class="comment">${reply.content}</ul>
                              </li>`)
          replyCon.append(currentRep);
        })
        commentCon.append(replyCon);
        $('.newsfeed').find($('.post-comment')).before(commentCon);
      })
    },
    data: {
      token: localStorage.getItem('token')
    }
  });
}

setInterval(refreshPage,30000);

$("#loginButton").on('click',function() {
  $.ajax('http://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: "POST",
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      $('.login-page').hide();
      refreshPage();
      $('.newsfeed').show();
      $('.logout').show();
    },
    data: {
      email: $('#userName').val(),
      password: $('#password').val()
    },
    error: function(data) {
      alert("Wrong username or password");
    }
  });
});

$("#registrateButton").on('click',function() {
  $.ajax('http://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    method: "POST",
    success: function(data) {
      $('.register-page').hide();
      $('.login-page').show();
    },
    data: {
      fname: $('#firstName').val(),
      lname: $('#lastName').val(),
      email: $('#userName2').val(),
      password: $('#password2').val()
    }
  });
});

$('#goRegisterButton').on('click',function() {
  $('.register-page').show();
  $('.login-page').hide();
});

$('#post-button').on('click',function() {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
    method:"POST",
    data:{
      content:$('#post-input').val(),
      token: localStorage.getItem('token')
    }
  });
});

$('#logout-button').on('click',function() {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/logout', {
    method:"GET",
    success: function(data) {
      $('.login-page').show();
      $('.newsfeed').hide();
      $('.logout').hide();
      localStorage.clear();
    },
    data:{
      token: localStorage.getItem('token')
    }
  });
});

$('#goLoginButton').on('click',function() {
  $('.register-page').hide();
  $('.login-page').show();
});
