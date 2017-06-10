// Reference JQuery objects

//post registration
var loginSuccessful = false;
$('.registration-btn-default').on("click", function(event){
    event.preventDefault();
    // console.log($('.firstname-input-field').val());
    // console.log($('.lastname-input-field').val());
    // console.log($('.username-input-field').val());
    // console.log($('.username-input-field').val());

    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
      method: 'POST',

      data:{
        fname: $('.firstname-input-field').val(),
        lname: $('.lastname-input-field').val(),
        email: $('.username-input-field').val(),
        password: $('.password-input-field').val()
      },
      success: function(data){
        alert("registration successful")
        $('.firstname-input-field').hide(),
        $('.lastname-input-field').hide()

      },
      error: function(err){
        console.log("err", err);
      }

  })
});


//post login
$('.login-btn-default').on("click", function(event){
    event.preventDefault();
    // console.log($('.firstname-input-field').val());
    // console.log($('.lastname-input-field').val());
    // console.log($('.username-input-field').val());
    // console.log($('.username-input-field').val());

$.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
      method: 'POST',

      data:{
        email: $('.username-input-field').val(),
        password: $('.password-input-field').val()
      },
      success: function(data){
        alert("login successful")
        loginSuccessful = true;
        localStorage.setItem('token', data.response.token)
      },
      error: function(err){
        console.log("err", err);
      }

  })
});
//get posts
$.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',
      method: 'GET',

      data:{
        token: localStorage.getItem('token')
      },
      success: function(data){
        // console.log(data.response); //array of objects
        // console.log(JSON.stringify(data.response));
        var arrContent = [];
        // var name = newData[i]['poster'];
        // console.log(name);
        var newDataLength = data.response;
        // console.log(newDataLength);
        for (var i = 0; i < newDataLength.length; i++) {
          var newData = data.response[i];

          var content = newData['content'];
          var name = newData['poster'].name;
          var postId = newData['_id'];
          var time = newData.createdAt;
          var likeCount = newData.likes.length;
          var postCount = newData.comments.length;
          var newPost =  `<div class="comment"  boardId=${postId}>
              <div class="author">${name}</div>
              <div class="message">${content}</div>
              <div class="time">${time}</div>
              <div class="controls">
                <button class="reply-btn-btn-default">Reply</button>
                <button class="like-btn-btn-dafult">
                  <span class="like-button glyphicon glyphicon-thumbs-up"></span>
                </button>
                <button class="heart-btn-btn-dafult">
                  <span class="heart-button glyphicon glyphicon-heart-empty"></span>
                </button>
              </div>
              <div class='counts'>
                <div class="replies-count">${postCount}"</div>
                <div class="likes-count">${likeCount}"</div>
              </div>
            </div>`;
            $('.comments').append(newPost);
        }


        // console.log("getting comments: successful")
      },
      error: function(err){
        console.log("err", err);
      }

  })


//post posts
$('.post-btn').on("click", function(event){
  event.preventDefault();
  // console.log($('.message-input-field').val());
  $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
        method: 'POST',

        data:{
          token: localStorage.getItem('token'),
          content: $('.message-input-field').val()
        },
        success: function(data){
          console.log("posting successful")

        },
        error: function(err){
          console.log("err", err);
        }

      })
    });
//[GET] Likes
//Liking a post always uses GET - there is no POSTing likes.
$('.like-btn-btn-dafult').on("click", function(event){
  var posdId = $(this).closest(".comments").attr('boardId');
  console.log(posdId);
  event.preventDefault();
  $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes' + posdId,
        method: 'GET',

        data:{
          token: localStorage.getItem('token'),
        },
        success: function(data){
          console.log("liking successful")
          var newPost =     `<div class="post-posts">
                <form class="form-inline message-input">
                  <label class="form-group">
                    <input class="message-input-field" type="text" placeholder="Write something..." />
                  </label>
                    <button class="btn message-input-button">Post</button>
                </form>
            </div>`;
        },
        error: function(err){
          console.log("err", err);
        }

      })
});

//[GET] logout
$('.logout-btn-default').on('click', function(){
  event.preventDefault();
  //token:
  //?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFwcGxlQGJlYW4uY29tIn0.tXXsPSSpJTNWbYbiivgF3-dJ3neckMfgc8jTQqUQhk8
  $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
        method: 'GET',

        data:{
          token: localStorage.getItem('token').toString()
        },
        success: function(data){
          alert("logout successful");
        },
        error: function(err){
          console.log("err", err);
        }

      })
});

//update page
setInterval(function(){
  if(loginSuccessful) {
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
      method: "GET",
      data: {
        token: localStorage.getItem('token')
      },

      success: function(data) {
        if(data.success) {
          $('.registratonContaineral').remove();
        }
      },
      error: function(err) {
        console.log(err);
      }

    });
  }
}, 30000)
