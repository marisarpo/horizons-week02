$(document).ready(function(event) {
  $('#login-body').hide();
  $('#mainpage').hide();

  if (localStorage.getItem('token')) {
    $('#registration-body').hide();
    $('#mainpage').show();
    loadPosts();
  }
})

setInterval(loadPosts, 30000);

$('#login-container button').click(function(event) {
  $('#registration-body').hide();
  $('#login-body').show();
})

$('#register-container button').click(function(event) {
  $('#login-body').hide();
  $('#registration-body').show();
})

$('#register-submit').click(function(event) {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'POST',
    data: {
      fname: $('#firstname').val(),
      lname: $('#lastname').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val()
    },
    success: function(data) {
      $('#registration-body').hide();
      $('#login-body').show();
      return true;
    }
  })
})

$('#login-submit').click(function(event) {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    },
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      $('#login-body').hide();
      $('#mainpage').show();
      loadPosts();
    },
    error: function(data) {
      console.log(data);
    }
  })
})

function loadPosts() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      $('#newsfeed').empty();
      data.response.forEach(function(post) {
        loadPost(post);
      });
    },
    error: function(data) {
      console.log(data);
    }
  })
}

function loadPost(post) {
  $('#newsfeed').append(
    `<div class="post" id="${post._id}">
      <div class="content">
        <h4 class="author">${post.poster.name}</h4>
        <p class="postDateTime">${(new Date(post.createdAt)).toDateString()}</p>
        <p class="message">${post.content}</p>
      </div>
      <div class="actions">
        <input type="text" class="remessage" placeholder="Say something back!">
        <button class="reply">Reply</button>
        <button class="like">Like</button>
        <h5 class="info">${post.comments.length} Replies, ${post.likes.length} Likes</h5>
      </div>
      <div class="replies"></div>
    </div>`
  );
  post.comments.forEach(function(reply) {
    $(`#${post._id} .replies`).append(
      `<div class="reply">
        <h5 class="author">${reply.poster.name}</h5>
        <p class="postDateTime">${(new Date(reply.createdAt)).toDateString()}</p>
        <p class="message">${reply.content}</p>
      </div>`
    );
  })
}

$('.userpost').click(function() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $('.usermessage').val()
    },
    success: function(data) {
      loadPosts()
      $('.usermessage').val('')
    }
  })
})

$('#newsfeed').on('click', '.like', function() {
  var postID = $(this).closest('.post').attr('id');
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${postID}`,
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      loadPosts();
    }
  })
})

$('#newsfeed').on('click', '.reply', function() {
  var postID = $(this).closest('.post').attr('id');
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${postID}`,
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $(this).siblings('.remessage').val()
    },
    success: function(data) {
      loadPosts()
      $(this).siblings('.remessage').val('')
    }
  })
})

$('.logout').click(function() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    data: {
      token: localStorage.getItem('token')
    },
    success: function() {
      localStorage.removeItem('token');
      $('#login-body').hide();
      $('#mainpage').hide();
      $('#registration-body').show();
    }
  })
})
