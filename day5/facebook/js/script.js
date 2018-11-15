// function FacebookApp () {
//   this.fname = $('#first-name-input').val();
//   this.lname = $('#last-name-input').val();
//   this.email = $('#email-input').val();
//   this.password = $('#password-input').val();
// }
//
// FacebookApp.prototype = {
// }
//
// var firstName = $('#first-name-input').val();
// var lastName = $('#last-name-input').val();
// var inputEmail = $('#email-input').val();
// var inputPassword = $('#password-input').val();
//

//                  THE LIKING FUNCTION KEEPS RUNNING TWICE BECAUSE OF THE EVENT HANDLER I THINK; IS IT AN ASYNC PROBLEM???
//                  MAYBE TRY THE UNBIND SOLN FROM ONLINE 

var likeAjaxCounter = 0;
var displayNewsfeedAjaxCounter = 0;
//--------------- register page --------------------

$('.register-btn').on('click', function(event) {
  event.preventDefault();
  var firstName = $('#first-name-input').val();
  var lastName = $('#last-name-input').val();
  var inputEmail = $('#email-input').val();
  var inputPassword = $('#password-input').val();

  console.log(firstName, lastName, inputEmail, inputPassword);
  $.ajax({
    url:"https://horizons-facebook.herokuapp.com/api/1.0/users/register",
    success: function(data) {
      console.log(data);
      $('#register-box').css('display','none');
      $('#login-box').css('display','block');

    },
    method: 'POST',
    data: {
      fname: firstName,
      lname: lastName,
      email: inputEmail,
      password: inputPassword
    },
    error: function(err) {
      console.log(err);
    }
  })
})

//------------------- login page ----------------------------

$('.secondary.login-btn').on('click', function() {
  event.preventDefault();
  $('#register-box').css('display','none');
  $('#login-box').css('display','block');
});

$('.primary.login-btn').on('click', function() {
  // console.log('clicked');
  event.preventDefault();
  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/login", {
    method: 'POST',
    success: function(data) {
      // data will be the response data that is
      // returned by the endpoint. use this to
      // access the token for future authorization.

      // data.response.token will give you access
      // to the AUTH_TOKEN
      console.log(data);
      localStorage.setItem('token', data.response.token);
      $('#login-box').css('display','none');
      $('.comments').empty();
      displayNewsfeed();
      $('#newsfeed').css('display','block');
    },
    data: {
      email: $("#login-email").val(),
      password: $("#login-password").val()
    },
    error: function(err) {
      console.log(err);
    }
  });
})

//-------------------- for timestamps --------------------
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function getAmPm(dateStr) {
  var dateObj = new Date(dateStr);
  if (dateObj.getHours() < 12) {
    if (dateObj.getHours() === 0) {
      return `12:${dateObj.getMinutes()} AM`
    }
    return (`${dateObj.getHours()}:${dateObj.getMinutes()} AM`)
  }
  if (dateObj.getHours() === 12) {
    return `12:${dateObj.getMinutes()} PM`
  }
  return `${dateObj.getHours() - 12}:${dateObj.getMinutes()} PM`

}


// ------------------displaying the newsfeed ----------
// STILL NEED TO GET COMMENTS WORKING; NEED SECOND AJAX STATEMENT TO RETRIEVE THEM?
function displayNewsfeed() {
  var postCounter = 0;
  var commentCounter = 0;
  debugger;
  $('div#whole-canvas').css('height','100%');
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',
    method: 'GET',
    success: function(newsfeedObject){
      console.log(newsfeedObject);
      displayNewsfeedAjaxCounter++;
      debugger;
      newsfeedObject['response'].forEach(function(post) {
        var postId = post._id;
        var timeObj = new Date(post.createdAt);
        var newElement = $(`<div class="comment ">
        <div class="hidden-id">${post._id}</div>
        <div class="author">${post.poster.name}</div>
        <div class="timestamp">posted at ${getAmPm(timeObj)}, ${months[timeObj.getMonth()]} ${timeObj.getDate()}, ${timeObj.getFullYear()}</div>
        <div class="message">${post.content}</div>
        <div class="controls">
        <span class="comment-info">${post.comments.length} Comments, ${post.likes.length} Likes</span>
        <button class="like btn btn-default"><span class="glyphicon glyphicon-thumbs-up"></span></button><button name="replybtn" class="reply reply-btn btn btn-default">Reply</button>
        </div>
        <div class="replies">
        </div>
        </div>`);
        // if $()
        $('.comments').append(newElement);
        console.log(newElement);
        console.log(post.comments); //depending on this format, append the comments
        postCounter++;
        debugger;
        post.comments.forEach(function(individualComment){
          console.log(individualComment);
          console.log("before comment appending");
          debugger;
          var timeObjInner = new Date(individualComment.createdAt);
          $(`.hidden-id:contains("${postId}")`).closest('.comment').children('.replies').append(`<div class="reply">
          <div class="author">"${individualComment.poster.name}"</div>
          <div class="timestamp">posted at ${getAmPm(timeObjInner)}, ${months[timeObjInner.getMonth()]} ${timeObjInner.getDate()}, ${timeObjInner.getFullYear()}</div>
          <div class="message">${individualComment.content}</div>
          </div>`);
          commentCounter++;
          console.log("after comment appending, end of displayNewsfeed()");
          debugger;
        });
      })
    },
    data: {
      token: localStorage.getItem('token')
    },
    error: function(err) {
      console.log(err);
    }
  })
};


//------------------- making new posts ----------------
$('button.comment-btn').on('click', function (event) {
  console.log("clicked post btn");
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $('#new-post-textarea').val()
    },
    success: function(response) {
      console.log('nice posting there');
      $('.comments').empty()
      debugger;
      return displayNewsfeed();
    },
    error: function(err) {
      console.log(err);
    }
  })
});

//------------------post replies--------------
//  STEP ONE
var currentButtonId;
$('.container').on('click','.reply-btn',function(event){
  event.preventDefault();

  // console.log("clicked reply btn");
  $('#reply-modal').css('display','flex');
  $('#whole-canvas').css('opacity','0.5');
  //console.log($(this).parent().parent().children('.hidden-id').text());
  currentButtonId = $(this).parent().parent().children('.hidden-id').text();
  console.log(currentButtonId);
})

//  STEP TWO --  actually post the reply
$('.post-reply-btn').on('click', function(event) {
  console.log('clicked post reply');
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${currentButtonId}`,
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $('.reply-text-box').val()
    },
    success: function(response) {
      console.log('comment posted!');
      $('#reply-modal').css('display','none');
      $('#whole-canvas').css('opacity','100');
      displayNewsfeed();
    },
    error: function(err) {
      console.log(err);
    }
  });
});

$('.exit-out-btn').on('click', function(event) {
  event.preventDefault();
  $('#reply-modal').css('display','none');
  $('#whole-canvas').css('opacity','100');
});


//-------------------------liking posts-----------------------

$('.container').on('click','.like', function(event){
// $('.like').click(function(event) {
  debugger;
// $('.like').on('click', function(event)
  console.log("clicked like"); debugger;
  debugger;
  // event.preventDefault();
  debugger;
  currentButtonId = $(this).parent().parent().children('.hidden-id').text();
  debugger;
  $.ajax({
    url:`https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${currentButtonId}`,
    method:'GET',
    data: {
      token: localStorage.getItem('token'),
    },
    success: function(response) {
      likeAjaxCounter++;
      console.log('liked');
      $('.comments').empty()
      debugger;
      return displayNewsfeed();
    },
    error: function(err) {
      console.log(err);
    }
  })
})
