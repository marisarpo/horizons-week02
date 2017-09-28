// periodic update
var int = setInterval(getPosts, 30000);

// switch to login screen from register screen
$('.btn-login-register').on('click', function(event) {
  $('.form-register').toggle('collapse');
  $('.form-login').toggle('collapse');
})

// switch to register screen from login screen
$('.btn-register-login').on('click', function(event) {
  $('.form-register').toggle('collapse');
  $('.form-login').toggle('collapse');
})

// registration ajax post
$('.btn-register-register').on('click', function(event) {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'POST',
    data: {
      fname: $('.fname-register').val(),
      lname: $('.lname-register').val(),
      email: $('.email-register').val(),
      password: $('.password-register').val()
    },
    success: function(event) {
      $('.form-register').toggle('collapse');
      $('.form-login').toggle('collapse');
    },
    error: function(err) {
      console.log('error', err);
    }
  })
})

// login ajax post
$('.btn-login-login').on('click', function(event) {
  var pass = $('.password-login').val()
  $('.password-login').val("")
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    data: {
      email: $('.email-login').val(),
      password: pass
    },
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      localStorage.setItem('id', data.response.id);
      $('.form-login').toggle('collapse');
      $('.home-page').toggle('collapse');
      getPosts();
    },
    error: function(err) {
      console.log('error', err);
      alert("error bitch");
    }
  })
})

// get posts
function getPosts() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/',
    method: "GET",
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      renderPosts(data.response);
    },
    error: function(err) {
      console.log("error", err);
    }
  })
}

// render posts
function renderPosts(posts) {
  $("#post-anchor").empty();
  posts.forEach(function(item, index) {
    addPost(item);
  })
}

// add post to html
function addPost(post) {
  var likeCount = 0;
  post.likes.forEach(function(item, index) {
    likeCount++;
  })
  var replyCount = 0;
  post.comments.forEach(function(item, index) {
    replyCount++;
  })
  var postHTML = `
  <div class="post" id="${post._id}">
    <div class="name">${post.poster.name}: ${post.content}</div>
    <div class="timestamp">${post.createdAt}</div>
    <div class="content"></div>
    <div class="metrics" id="likes-${post._id}">${likeCount} likes, ${replyCount} comments</div>
    <div class="comment-list comments" id="comment-${post._id}"></div>
    <div class = "buttons-list">
      <button type="button" name="button" class = "btn btn-like btn-like-${post._id}">
        <span class = "glyphicon glyphicon-thumbs-up"></span>
      </button>
      <button type="button" name="button" class = "btn btn-post btn-post-${post._id}">Add Comment</button>
    </div>
    <div class = "collapse" id="comment-box">
      <input type="text" name="create-comment-input" value="" placeholder="comment" class = "input create-comment input-create-comment">
      <button type="button" name="button" class = "btn btn-create-comment" id = "comment-${post._id}">Add Comment</button>
      <button type="button" name="button" class = "btn btn-create-comment-cancel">
        <span class = "glyphicon glyphicon-remove-sign"></span>
      </button>
    </div>
  </div>`;
  $('.post-list').append(postHTML);
  post.comments.forEach(function(item, index) {
    var id = post._id
    addComment(item, id);
  })
}

// add comments to a post
function addComment(comment, id) {
  var commentHTML = `
  <div class="comment">
    <div class = "comment content">${comment.poster.name}: ${comment.content}</div>
  </div>`;
  $(`#comment-${id}`).append(commentHTML);
  // <div class = "comment timestamp">${comment.createdAt}</div>
}

// create a post
$('.btn-create-post').on('click', function(event) {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: "POST",
    data: {
      token: localStorage.getItem('token'),
      content: $(".input-create-post").val()
    },
    success: function(event) {
      $(".input-create-post").val("")
      console.log("success");
      getPosts();
    },
    error: function(err) {
      console.log("create post error", err);
    }
  })
})

// reveal comment box
$("body").on('click', '.btn-post', function(event) {
  $(this).parent().siblings("#comment-box").toggle('collapse');
})

// cancel comment box
$("body").on('click', ".btn-create-comment-cancel", function(event) {
  $(this).siblings("input").val("");
  $(this).parent().toggle("collapse");
})

// create comment
$("body").on('click', ".btn-create-comment", function(event) {
  var commentText = $(this).siblings("input").val();
  var postId = $(this).attr("id").slice(8);
  $(this).siblings("input").val("");
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/" + postId,
    method: "POST",
    data: {
      token: localStorage.getItem('token'),
      content: commentText
    },
    success: function(event) {
      getPosts();
    },
    error: function(err) {
      console.log("create comment error", err);
      console.log(commentText);
      console.log(postId);
      console.log($(this).attr("id"));
    }
  })
})

// liking a post
$('body').on('click', '.btn-like', function(event) {
  // $(this).toggle("liked");
  var postId = $(this).parent().parent().attr("id");
  $.ajax({
    url:"https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/" + postId,
    method: "GET",
    data: {
      token: localStorage.getItem('token')
    },
    success: function(event) {
      getPosts();
    },
    error: function(err) {
      console.log("like error", err);
    }
  })
})

// logout
$(".btn-logout").on('click', function(event) {

  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/logout",
    method: "GET",
    data: {
      token: localStorage.getItem('token')
    },
    success: function(event) {
      $(".form-login").toggle("collapse");
      $(".home-page").toggle("collapse");
      return true;
    },
    error: function(err) {
      console.log("loggout error", err);
    }
  })
})
