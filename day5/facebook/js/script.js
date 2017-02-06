$('button[name=login]').click(function() {
  var dataObj = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  }
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    success: function(data) {
      $('.loginForm').hide();
      localStorage.setItem('token', data.response.token);
      // localStorage.getItem('token')
      console.log(data);
    },
    data: dataObj
  });
})

$('button[name=logout]').click(function() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    method: 'GET',
    success: function() {
      console.log('Logout Successful!')
      $('.loginForm').show();
    },
    data: {
      token: localStorage.getItem('token')
    }
  });
})

$('button[name=toRegistrationPage]').click(function() {
  $('.loginForm').hide();
  $('.registrationForm').show();
})

$('button[name=toLogin]').click(function() {
  $('.registrationForm').hide();
  $('.loginForm').show();
});

$('button[name=register]').click(function() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'POST',
    success: function() {
      console.log('Register successful!');
      $('.registrationForm').hide();
      $('.loginForm').show();
    },
    data: {
      fname: $('input[name=firstname]').val(),
      lname: $('input[name=lastname]').val(),
      email: $('input[name=emailRegister]').val(),
      password: $('input[name=passwordRegister]').val()
    }
  })
});

function postUpdater() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'GET',
    success: function(data) {
      console.log('Posts Updated!');

      var commentCall = function(comment){
        return `<div class="postComment">
          <h4 class="commentName">${comment.poster.name}</h4>
          <h5 class="commentTime">${comment.createdAt}</h5>
          <p class="commentContent">${comment.content}</p>
        </div>`
      };

      var postCall = function(post) {
        return`
        <div class="postHolder" id="${post._id}">
            <div class="post">
              <h2 class="postName">${post.poster.name}</h2>
              <h5 class="postTime">${post.createdAt}</h5>
              <p class="postContent">${post.content}</p>
            </div>
            <div class="breakLine"></div>
            <div class="postReplyCountContainer">
              <h2 class="postReplyCount">${post.comments.length} Replies</h2>
              <h2 class="postLikeCount">${post.likes.length} Likes</h2>
            </div>
            ${post.comments.map(commentCall)}
            <button name="likeButton" class="glyphicon glyphicon-thumbs-up"></button>
            <button name="replyButton" class="replyButton">Reply</button>
            <div style="display:none" class="replyContentContainer">
              <input type="text" name="replyInput" placeholder="Type your comment here..."></input>
              <button type="button" name="replyButtonConfirm">Confirm</button>
            </div>
          </div>`
      };

      $('.postContainer').empty();
      $('.postContainer').append(data.response.map(postCall));
    },
    data: {
      token: localStorage.getItem('token')
    }
  })
}

$('button[name=getPosts]').click(function() {
  postUpdater()
});

$('button[name=postButton]').click(function() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    success: function() {
      console.log('Posted post!');
      $('input[name=postInput]').val('');
    },
    data: {
      token: localStorage.getItem('token'),
      content: $('input[name=postInput]').val()
    }
  })
});

$('.board').on('click', 'button[name=likeButton]', function() {
  console.log($(this).closest('.postHolder').attr("id"))
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + $(this).closest('.postHolder').attr("id"),
    method: 'GET',
    success: function() {
      console.log('Liked!');
      postUpdater();
    },
    data: {
      token: localStorage.getItem('token')
    }
  })
});

$('.board').on('click', 'button[name=replyButton]', function() {
  $('.replyContentContainer').show();
});

$('.board').on('click', 'button[name=replyButtonConfirm]', function() {
  console.log($(this).closest('.postHolder').attr("id"))
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + $(this).closest('.postHolder').attr("id"),
    method: 'POST',
    success: function() {
      console.log('Replied!');
      $('.replyContentContainer').hide()
      postUpdater();
    },
    data: {
      token: localStorage.getItem('token'),
      content: $('input[name=replyInput]').val()
    }
  })
});

$(document).ready(function(){
  setInterval(function(){
    console.log('called')
    postUpdater();
  }, 30000);
})

// $('button[name=register]').click(function() {
//   $.ajax({
//     url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
//     method: 'POST',
//     success: function() {
//       console.log('called');
//     },
//     data: {
//       fname: $('input[name=firstname]').val()
//     }
//   })
// });
