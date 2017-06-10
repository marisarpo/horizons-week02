$(document).ready(function(){
  var interval = null;
  //on click for register button
  $('#registrationR').on('click', function(){

    var firstname = $(this).siblings("#firstnameR").val();
    var lastname = $(this).siblings("#lastnameR").val();
    var username = $(this).siblings("#usernameR").val();
    var password = $(this).siblings("#passwordR").val();

    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
      method: "POST",
      data:{
        fname: firstname,
        lname: lastname,
        email: username,
        password: password
      },
      success: true,
      error: function(err){console.log("err", err);}
    })
  })

  $('#loginL').on('click', function(){
    var username = $("#usernameL").val();
    var password = $("#passwordL").val();

    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
      method: "POST",
      data: {
        email: username,
        password: password
      },
      success: function(data){
        console.log("Success!", data);
        localStorage.setItem('token', data.response.token);
        // hide
        $(".login-column").hide();
        $(".register-column").hide();
        // setup interval to refresh newsfeed
        interval = setInterval(setUpNewsFeed, 30000);
        setUpNewsFeed();

      },
      error: function(err){
        console.log("error in login", err);
      }
    })
  })

// set up the newsfeed
function setUpNewsFeed(){

  // clear the anchor
  $('#pageAnchor').empty();
  var newsfeed = $(`<div id="newsfeed"></div>`);
  $("#pageAnchor").append(newsfeed);

  var makepost = $(`<div class="make-post">
    <input type="text" name="" id = "postText" value="" placeholder="What's on your mind?">
    <button type="button" name="button">Post</button>
    <div class = 'spacetaker'></div>
    <button type="button" name="button" id = 'logout'>Logout</button>
  </div>`);
  $('#newsfeed').append(makepost);

  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
    data: {
      token: localStorage.getItem('token')
    },
    error: function(err){
      console.log("err in posts", err);
    },

    success: function(data){
      console.log("success data is ", data);
      var html =
        `<div class="post-container">
          <div class="post-header">
            <h3></h3>
            <h5></h5>
          </div>
          <div class="post-header-body">
            <p></p>
          </div>
          <div class="post-footer">
            <div class="post-footer-header">
              <p></p>
            </div>
            <div class="post-footer-body">
            </div>
            <div class="post-footer-footer">
              <input type="text" class="post-footer-text" name="" value="" placeholder="Comment">
              <div class="post-footer-buttons">
                <button type="button" class='like' name="like"><span class="glyphicon glyphicon-thumbs-up"></span></button>
                <button type="button" class='reply' name="reply">Reply</button>
              </div>
            </div>
          </div>
        </div>`;

        data.response.forEach(function(postobj){
          console.log(postobj);
          var curr = $(html);
          curr.find("h3").text(postobj.poster.name);
          curr.find('h5').text(postobj.createdAt);
          curr.find('.post-header-body p').text(postobj.content);
          curr.find('.post-footer-body').text(`${postobj.comments.length} replies, ${postobj.likes.length} likes`);
          console.log("postID id actually", postobj['_id'])
          curr.attr('postID', postobj['_id']);
          postobj.comments.forEach(function(comObj){
            var currCom = $(`<div class="comment">
                <p class="comment-header"></p>
                <p class="comment-body"></p>
              </div>`);
            currCom.find('.comment-header').text(`${comObj.poster.name}: ${Date(comObj.createdAt)}`);
            currCom.find('.comment-body').text(comObj.content);
            curr.find('.post-footer-body').append(currCom);
          })
          $("#newsfeed").append(curr);
        })

    }
  })
}

$('body').on('click', '.make-post button', function(){
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $('#postText').val(),
    },
    success: function(data) {
      $('#postText').val('');
      console.log('success is posted!');
      setUpNewsFeed();
    },
    error: function(err) {
      console.log('error is', err);
    }
  })
})

$('body').on('click', '.reply', function() {
  var commentBox = $(this).parent().siblings('.post-footer-text');
  var comment = $(this).parent().siblings('.post-footer-text').val();
  var postID = $(this).closest('.post-container').attr('postID');
  console.log('postID is', postID);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + postID,
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: comment
    },
    error: function(err) {console.log('error is', err);},
    success: function() {
      console.log('successful comment');
      commentBox.val('');
      setUpNewsFeed();
  }
  })
})

$('body').on('click', '.like', function() {
  var postID = $(this).closest('.post-container').attr('postID');
  var likeButton = $(this);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + postID,
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    error: function(err) {console.log('error is', err);},
    success: function(data) {
      console.log('successful like');
      console.log('this is', this);
      //likeButton.addClass('like-status');
      setUpNewsFeed();
  }
  })
})

$('body').on('click', '#logout', function(){
  clearInterval(interval);
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/logout",
    method: "GET",
    data: {
      token:localStorage.getItem('token')
    },
    success: function(){
      $("#newsfeed").empty();
      // var loginCol = $(`<div class="login-column">
      //       <h1>Login</h1>
      //       <input type="text" id="usernameL" name="" value="" placeholder="Username">
      //       <input type="text" id="passwordL" name="" value="" placeholder="Password">
      //       <button type="button" name="login" id="loginL">Login</button>
      //       <button type="button" name="login" id="registrationL">Go to Registration</button>
      // </div>`);
      //
      // var regCol = $(`<div class="register-column">
      //       <h1>New user registration</h1>
      //       <input type="text" id="firstnameR" name="" value="" placeholder="First name">
      //       <input type="text" id="lastnameR" name="" value="" placeholder="Last name">
      //       <input type="text" id="usernameR" name="" value="" placeholder="Username">
      //       <input type="text" id="passwordR" name="" value="" placeholder="Password">
      //       <button type="button" name="login" id="registrationR">Registration</button>
      //       <button type="button" name="login" id="loginR">Login</button>
      // </div>`);
      // $("#newsfeed").append(loginCol);
      // $("#newsfeed").append(regCol);
      $(".login-column").show();
      $(".register-column").show();
    }
  })
})



});
