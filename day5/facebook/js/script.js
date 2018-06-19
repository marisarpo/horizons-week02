$(document).ready(function(){
  $('.new-user-registration').show();
  $('.login').hide();
  $('.newsfeed').hide();
});

//new user registration page
$('.new-user-registration button.register').on('click', function(event){
  var firstName= $('#new-user-first-name').val()
  var lastName= $('#new-user-last-name').val()
  var email= $('#new-user-email').val()
  var password= $('#new-user-password').val()
  console.log(firstName, lastName, email, password);

  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register',{
    data: {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
    },
    success: function(data) {
      console.log(data);
      $('.new-user-registration').hide();
      $('.login').show();
    },
    error: function(err) {
      console.log('ERROR',err);
    },
    method: 'POST',
  });
});

$('.register-button').on('click', function(event){
  $('.login').hide()
  $('.new-user-registration').show();
});

//login page
$('.login-button').on('click', function(event){
  $('.login').show()
  $('.new-user-registration').hide();
});

$('.login button.login').on('click', function(event){
  var email= $('#login-email').val()
  var password= $('#login-password').val()
  console.log(email, password);

  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login',{
    data: {
      email: email,
      password: password,
    },
    success: function(data) {
      console.log(data);
      console.log('token is ',data.response.token);
      localStorage.setItem('token', data.response.token);
      $('.login').hide();
      render();
      $('.newsfeed').show();
    },
    error: function(err) {
      console.log('ERROR',err);
    },
    method: 'POST',
  });
});

//list posts and comments
function getPost(post){
  //post is the data.response
  var postId = post._id, userId = post.poster.id;
  var postContent = post.content, username = post.poster.name;
  var postDate = post.createdAt;
  var comments = post.comments;
  var likes = post.likes;
  return `<div class="post" id="${postId}">
            <div class="post-header">
              <div class="post-user-name" id="${userId}">${username}</div>
              <div class="post-date">${postDate}</div>
            </div>
            <div class="post-body">${postContent}</div>
            <div class="post-footer">
              <span class="reply-count">${comments.length} replies</span>
              <span class="like-count">${likes.length} likes</span>
              <div class="replies-list">
              </div>
              <div class="reply-form-wrapper collapse" >
                <div class="well reply-form">
                  <input type="text" class="form-control" placeholder="Write your comment">
                  <button type="button" class="btn btn-default reply-send">Send</button>
                  <button type="button" class="btn btn-default reply-cancel"><span class="glyphicon glyphicon-remove"></span></button>
                </div>
              </div>
              <button type="button" class="btn btn-default like-button">
                <span class="glyphicon glyphicon-thumbs-up"></span>
              </button>
              <button type="button" class="btn btn-default reply-button">Reply</button>
            </div>
          </div>`;
}

//load posts on page
function render(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/',{
    data: {
      token: localStorage.getItem('token'),
    },
    success: function(data) {
      //console.log(data);
      renderPost(data.response); //data is an array of post objects
    },
    error: function(err){
      console.log('ERROR', err);
    },
  });
  console.log('rendered page');
}

function renderPost(postList){
  console.log(postList.length);

  postList.forEach(function(post){
    var newPost = getPost(post);
    $('.posts-list').append(newPost);

    //renderReplies
    console.log('post',post);
    var postId = post._id;
    var replies = post.comments;
    console.log('replies', replies);
    renderReplies(replies, postId)
  });
}

function getReply(reply) {
  var replierName = reply.poster.name, replierId = reply.poster.id;
  var replyContent = reply.content;
  var replyDate = reply.createdAt;

  console.log(replierName, replierId, replyContent, replyDate);

  return `<div class="reply">
    <div class="reply-header">
      <span class="reply-user-name" id="${replierId}">${replierName}</span>
      <span class="reply-date">${replyDate}</span>
    </div>
    <div class="reply-body">${replyContent}</div>
  </div>`;
}

function renderReplies(replies, postId){
  //replies is an array of comment objects
  console.log(replies.length);

  replies.forEach(function(reply) {
    var newReply = getReply(reply);
    console.log(newReply);
    $(`#${postId}`).find('.replies-list').append(newReply);
  });
}


//add posts

/*postContent must be a String*/
function makePost(postContent) {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts',{
    data: {
      token: localStorage.getItem('token'),
      content: postContent,
    },
    success: function(data){
      console.log(data);
      //need to render after success
    },
    error: function(err){
      console.log('ERROR',err);
    },
    method: 'POST',
  });
}

$('#post-button').on('click', function(event){
  var postContent = $('#post-box').val();
  console.log(postContent);
  makePost(postContent);
});

//likes
$('.newsfeed').on('click', '.like-button' ,function(event){
  console.log('clicked like');
  console.log($(this));
  var postId = $(this).closest('.post').attr('id');
  console.log(postId);
  toggleLikes(postId);
});

function toggleLikes(postId) {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + postId,{
    data: {
      token: localStorage.getItem('token'),
    },
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
      console.log('ERROR',err);
    }
  })
}

//post comments
$('.newsfeed').on('click', '.reply-button', function(event){
  console.log('clicked reply');
  console.log($(this));
  $(this).siblings('.reply-form-wrapper').toggleClass('collapse');
})

$('.newsfeed').on('click', '.reply-cancel', function(event){
  $(this).closest('.reply-form-wrapper').toggleClass('collapse');
});

$('.newsfeed').on('click', '.reply-send', function(event){
  var postId = $(this).closest('.post').attr('id');
  var content = $(this).siblings('input').val();
  $(this).siblings('input').val('');

  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/'+ postId, {
    data: {
      token: localStorage.getItem('token'),
      content: content,
    },
    method: 'POST',
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
      console.log('ERROR',err);
    },
  });
});

//update page
window.setInterval(function() {
  $('.posts-list').empty();
  render();
}, 30000)

//logout
$('.newsfeed').on('click', '.logout', function(event) {
  console.log('logging out');
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/logout',{
    data: {
      token: localStorage.getItem('token'),
    },
    success: function(data){
      console.log(data);
    },
    error: function(err) {
      console.log('ERROR',err);
    }
  });
})
