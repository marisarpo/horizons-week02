


function loadNewsFeed() {
  $('.loginPage').hide();
  $('.newsfeed').show();
  initializeChat();
  $.ajaxSetup({
    data: {
      token: localStorage.getItem('token')
    }
  });

  // Getting the posts
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
    method: 'GET',
    success: function(resp) {
      setPostListener();
      displayPosts(resp);
      setReplyListenter();
      refreshSet();
    },
    error: function(error) {
      console.log('Load NewsFeed failed due to' , error);
    }
  });
}
var initializeChat = (function loadChatOnce() {
  var hasRun = false;
  function loadChat(){
    if(!hasRun) {
      console.log("WHAT");
      var token = localStorage.getItem("token");
      var socket = io.connect('https://horizons-facebook.herokuapp.com/');
      socket.emit('authentication', {'token': token});
      $('.post-chat-btn').on('click', function(e){
        var content = $('.post-chat-content').val();
        var returnData = socket.emit('message', content);
        var content = $('.post-chat-content').val("");
        });

      socket.on('message', function(msg){
        $('.display-chat').append($('<li>').text(msg.username.split(' ')[0] + ':' + msg.message));
      })
    }
    hasRun = true;
  }
  return loadChat;
})();
var refreshSet = (function setRefreshOnce(){
  var setRefresh = false;
  return function(){
    if(!setRefresh){
      localStorage.setItem("intervalId", setInterval(loadNewsFeed, 30000));
      setRefresh = true;
    }
  }
})();
function displayPosts(data){
  var userArray = data.response;
  //Clear before updating
  $('.postingInterface').html('');
  userArray.forEach(function(userObj){
    var postTime = moment(userObj.createdAt);
    var timeString = convertTime(postTime);
    var comments = userObj.comments;
    var likes = userObj.likes;
    var likes = userObj.likes;
    var posterName = userObj.poster.name.split(' ')[0];
    var postHtml = `
      <div id =${userObj._id} class="post-card row">
        <h4> ${userObj.poster.name.split(' ')[0]}</h4>
        <p class="time-stamp"> ${timeString} </p>
        <p class="post-content">${userObj.content}</p>
        <hr>
        <h5>${comments.length} Replies, ${likes.length} Likes </h5>
        <div class="display-comments"> <div>
      </div>
    `
    $('.postingInterface').append(postHtml);
    //Clear before adding comments again
    $('#'+ userObj._id).find('.display-comments').html("");
    comments.map(function(comment){
      var name = comment.poster.name;
      var commentTime = moment(comment.createdAt);
      var timeString = convertTime(commentTime);
      var commentContent = comment.content;
      var commentHtml = `
        <p class="comment-author">${name}: ${timeString}</p>
        <p class="comment-content">${commentContent}</p>
      `;
      $('#'+ userObj._id).find('.display-comments').append(commentHtml);
    });
    var alreadyLiked = false;
    likes.forEach(function(like){
      if(like.id === localStorage.getItem('userId')){
        console.log("like", like)
        alreadyLiked = true;
      }
    })

    var thumbsAndReplyHtml = `
      <div  class="reactions">
        <a class="btn btn-default like"><span class="glyphicon glyphicon-thumbs-up"></span></a>
        <a class="btn btn-default comment">Comment </a>
      </div>
    `
    if(alreadyLiked){
      thumbsAndReplyHtml = `
        <div  class="reactions">
          <a class="btn btn-default like already-liked"><span class="glyphicon glyphicon-thumbs-up"></span></a>
          <a class="btn btn-default comment">Comment </a>
        </div>
      `
    }
    if($('#'+ userObj._id).find('.reactions').length === 0){
      $('#'+ userObj._id).append(thumbsAndReplyHtml);
    }


  });
}

function setReplyListenter(){
  $('.newsfeed').on('click', '.comment', function(e){
    var postId = $(this).closest('.post-card').attr('id');
    var textareaHtml = `
      <textarea id=${postId} class="form-control post-comment" placeholder="Write a comment..."></textarea>
    `;
    if($(this).closest('.reactions').find('textarea').length===0){
      $(this).closest('.reactions').append(textareaHtml);
    }

  });
  $('.newsfeed').on('keydown', '.post-comment', function(e){
    var postId = $(this).attr('id');
    var textContent = $(this).val();
    var self = $(this);
    if( e.which===13){
      // $(this).hide();
      $.ajax({
        url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${postId}`,
        method: "POST",
        data:{
          content: textContent
        },
        success: function(data){
          self.hide();
          console.log(data);
          var comment = data.response.comments[data.response.comments.length-1];
          var name = comment.poster.name.split(' ')[0];
          var commentTime = moment(comment.createdAt);
          var timeString = convertTime(commentTime);
          var commentContent = comment.content;
          var commentHtml = `
            <p class="comment-author">${name}: ${timeString}</p>
            <p class="comment-content">${commentContent}</p>
          `;
          $('#'+ postId).find('.display-comments').append(commentHtml);

        },
        error: function(e){
          console.log(e);
        }
      })

    }
  });

  $('.newsfeed').on('click', '.reactions .like', function(e){
    var postId = $(this).closest('.post-card').attr('id');
    var self = $(this);
    console.log("postid", postId);
    $.ajax({
      url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${postId}`,
      method: "GET",
      success: function(resp){
        console.log(resp);
        self.addClass('already-liked');
      },
      error: function(err){
        console.log(err);
      }
    })
  })
}


// Takes in time difference in ms returns formatted string "Posted ..."
function convertTime(postTime) {
  var currentTime = moment();
  var msTime = currentTime.diff(postTime);
  if(msTime >86400000 && msTime <604800000) { //more than 1 day agp
    return "Posted more than a day ago";
  } else if(msTime > 3600000) {
    var hours = currentTime.diff(postTime, 'hours');
    return "Posted " + hours + ' hours ago'
  } else if(msTime > 60000){

    var minutes = currentTime.diff(postTime, 'minutes');

    return "Posted " + minutes + ' minutes ago'
  }
  else if(msTime < 60000){
    var seconds = currentTime.diff(postTime, 'seconds');
    return 'Posted ' + seconds + ' seconds ago';
  }
  else{
    return 'Posted on ' + postTime.format('dddd, MMMM Do YYYY');
  }
}
function setPostListener(){
  $('.post-content').on('click', function(){
    var textValue = $('.postContents').val();
    console.log(textValue);
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
      data: {
        content: textValue
      },
      method: "POST",
      success: function(e) {
        console.log(e);
        loadNewsFeed();
      },
      error: function(error) {
        console.log('Failed to post due to ', error);
      }
    });
  });
}
function init() {
  // User registration implementation
  if(localStorage.getItem('token')){
    loadNewsFeed();
  } else{
    $('.container').on('click', '.userRegistration .registerButton', function(e) {
      var firstName = $(this).siblings('.firstName').val();
      var lastName = $(this).siblings('.lastName').val();
      var email = $(this).siblings('.email').val();
      var password = $(this).siblings('.password').val();
      $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
        data: {
          fname: firstName,
          lname: lastName,
          email: email,
          password: password
        },
        method: "POST",
        success: function(resp) {
          console.log(resp.success);
        },
        error: function(error) {
          console.log('User creation failed due to ', error);
        }
      })
    });

    // Login implementation
    $('.container').on('click', '.userRegistration .login', function(e) {
      var email = $('.email').val();
      var password = $('.password').val();

      $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        success: function(resp) {
          localStorage.setItem('token', resp.response.token);
          localStorage.setItem('userId', resp.response.id);
          // console.log(localStorage.getItem('token'));
          // console.log(localStorage.getItem('userId'));
          loadNewsFeed();

        },
        error: function(error) {
          console.log("Login failed due to ", error);
        }
      })
    })

    // Log out implementation
    $('.container').on('click', 'a.logout', function(e) {
      $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
        method: "GET",
        success: function(resp) {
          $('.loginPage').show();
          $('.newsfeed').hide();
          clearInterval(localStorage.getItem("intervalId"));
          localStorage.clear();
        },
        error: function(error) {
          console.log("Logout failed due to", error);
        }
      });
    })

    //Swap from register to login screen
    $('.container').on('click', '.alternateButton > .login', function(e) {
      var topButton = $('.registerButton');
      var botButton = $(this);

      //updating top button Register -> Login
      topButton.addClass('login');
      topButton.removeClass('registerButton');
      topButton.html('Login');

      //updating bottom button Login -> Go to registration
      botButton.addClass('registerButton');
      botButton.removeClass('login');
      botButton.html('Go to registration');

      //hide firstName and lastName input fields
      $('.firstName').hide();
      $('.lastName').hide();
    });

    //Swap from login to register screen
    $('.container').on('click', '.alternateButton > .registerButton', function(e) {
      var topButton = $('.login');
      var botButton = $(this);

      //updating top button Register -> Login
      topButton.addClass('registerButton');
      topButton.removeClass('login');
      topButton.html('Register');

      //updating bottom button Login -> Go to registration
      botButton.addClass('login');
      botButton.removeClass('registerButton');
      botButton.html('Login');

      //hide firstName and lastName input fields
      $('.firstName').show();
      $('.lastName').show();
    });
  }


}

$(document).ready(init);
