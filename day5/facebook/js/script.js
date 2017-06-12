var token = null;
$(document).ready(function() {
  setEventListeners();

});
//////////////////////////////////////////////////
function setEventListeners() {
  $('#login-button').on('click', function(event) {
    event.preventDefault();
    login();
  });
  $('#register-button').on('click', function(event) {
    event.preventDefault();
    $('.login-page').hide();
    $('.register-page').show();
  })
  $('#register-submit-button').on('click', function(event) {
    event.preventDefault();
    $('.login-page').show();
    $('.register-page').hide();
    register();
  })
  $('#post-button').on('click', function(event){
    event.preventDefault();
    // console.log($('#post-box').val());
    postPost($('#post-box').val());
  })
  $('.main-feed').on('click', '.like-button', function(event){
    event.preventDefault();

    var postId = $(this).closest('.post').attr('id');
    like(postId);
  })
  $('.main-feed').on('click', '.reply-button', function(event){
    event.preventDefault();
    $(this).siblings('.reply-form').show();
    var postId = $(this).closest('.post').attr('id');
    $('.main-feed').on('click', '.reply-post-button', function(event){
      var content=$(this).siblings('.reply-box').val();
      reply(postId, content);
    })
  })
}
//////////////////////////////////////////////////
function login() {
  setInterval(function(){
    displayPosts(token);

  },30000);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    success: function(data) {
      // console.log(data);
      $('.login-page').hide();
      $('.main-feed-page').show();
      token = data.response.token;
      // console.log(data);
      displayPosts(token);
    },
    error: function(err) {
      alert("Error: cannot reach server");
    },
    data: $('#login-form').serialize()
  });
}
function register() {
    $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'POST',
    success: function(data) {
      // console.log(data);
    },
    error: function(err) {
      alert("Error: cannot reach server");
    },
    data: $('#register-form').serialize()
  });
}
function displayPosts(token) {

  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'GET',
    data: {
      token: token
    },
    success: function(posts) {
      posts.response.forEach(function(post,index) {
        // console.log("///////////////////////////////");
        $('.main-feed').append(`<div id=${post._id} class="post">
                    <div class="post-main-info">
                      <h3 class="poster">${post.poster.name}</h3>
                      <h5 class="post-time">${post.createdAt}</h5>
                      <p class="post-text">${post.content}</p>
                    </div>
                    <div class="reaction-buttons">
                      <button type="button" class="like-button btn btn-default">Like</button>
                      <button type="button" class="reply-button btn btn-default">Reply</button>
                      <button type="button" class="toggle-comments btn btn-default">Hide</button>
                      <form class="reply-form" style='display: none'>
                        <input type="text" class="reply-box" placeholder='Reply...'></input>
                        <button type="button"  class="btn btn-primary reply-post-button">Post Reply</button>
                      </form>
                    </div>

                    <div class="nums">
                        <span class="num-likes">${post.likes.length}</span>
                        <span class="num-replies">${post.comments.length}</span>
                    </div>
                    <div class="replies${index}"></div>
                    </div>
                  </div>`)
        post.comments.forEach(function(reply) {
          // console.log(reply);
          $(`.replies${index}`).append(`<div class="reply">
                        <h3 class="replier">${reply.poster.name}</h3>
                        <p class="reply-time">${reply.createdAt}</p>
                        <p class="reply-text">${reply.content}</p>
                      </div>`)
        })
      })
    },
    error: function(err) {
      alert("Error: cannot fetch user data");
    }
  })
}
function postPost(content){
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    data:{
      token:token,
      content:content
    },
    success: function(data){
      console.log(data);

      // console.log("Posted! Data: "+content)
      //  $('.main-feed').prepend(`<div class="post">
      //               <div class="post-main-info">
      //                 <h3 class="poster">${post.poster.name}</h3>
      //                 <h5 class="post-time">${post.createdAt}</h5>
      //                 <p class="post-text">${post.content}</p>
      //               </div>
      //               // <div class="reaction-buttons">
      //                 <button type="button" class="like-button btn btn-default">Like</button>
      //                 <button type="button" class="reply-button btn btn-default">Reply</button>
      //                 <button type="button" class="toggle-comments btn btn-default">Hide</button>
      //                 <div class="nums">
      //                   <span class="num-likes">${post.likes.length}</span>
      //                   <span class="num-replies">${post.comments.length}</span>
      //                 </div>
      //                 <div class="replies${index}"></div>
      //               </div>
      //             </div>`)

    },
    error: function(err){
      // console.log("Post failed"+ err);
    }
  })
}
function like(postId){
  $.ajax({
    url:`https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${postId}`,
    method: 'GET',

    data:{
      token:token
    },
    success: function(){
      console.log("liked successfully");
    },
    error: function(){
      console.log("error in liking");
    }
  })
}
  function reply(postId, content){

    $.ajax({
      url:`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${postId}`,
      method: 'POST',
      data:{
        token:token,
        content:content
      },
      success: function(){
        console.log("commented successfully");
      },
      error: function(){
        console.log("error in commenting");
      }
    })
}
