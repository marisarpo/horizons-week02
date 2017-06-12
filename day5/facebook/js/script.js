$(document).ready(function(){
  $('#reg-form').hide();
  $('#newsfeed-container').hide();
  $('.comment-replies').hide();

  $("#login").on('click', function(event){
    // console.log("hi");
    var username = $("#username").val();
    var password = $("#pword").val();
    // console.log(username,password);

    $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/login", {
      method: 'POST',
      data: {
        email:username,
        password:  password
      },
      success: function(data) {
        // console.log("Success");
        localStorage.setItem('token', data.response.token);
        $('#form-container').hide();
        $('#newsfeed-container').show();
        loadComments();
      },

    });
    event.preventDefault();
    // $('#login-form').hide();
    // loadComments();

    // $('#reg-form').show();
  })

  $("#reg-form-button").on('click', function(event){
    event.preventDefault();
    $('#login-form').hide();
    $('#reg-form').show();
  })

  $("#login-form-button").on('click', function(event){
    event.preventDefault();
    $('#reg-form').hide();
    $('#login-form').show();
  })

  $("#register").on('click', function(event){
    // console.log("hi");
    var username = $("#username").val();
    var password = $("#pword").val();
    // console.log(username,password);

    $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/register", {
      method: 'POST',
      data: {
        email:username,
        password:  password
      },
      success: function(data) {
        localStorage.setItem('token', data.response.token);

      },

    });
    event.preventDefault();

  })

  $("#replyid").on('click', function(event){
    console.log("clicked");
    console.log(this);
    var postId = $(this).parent().parent().attr('id');
    // var comment = this.
    console.log(postId);

    event.preventDefault();
    // console.log("replying");
    // $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/"
    // +postId, {
    //   method: 'POST',
    //   data: {
    //     token:localStorage.getItem('token'),
    //     content:  password
    //   },
    //   success: function(data) {
    //     ${}
    //     console.log("Success");
    //     localStorage.setItem('token', data.response.token);
    //     $('#form-container').hide();
    //     $('#newsfeed-container').show();
    //     loadComments();
    //   },
    //
    // });
  })
  // $("#comments").on('click', function(event){
  //   // $('#reg-form').hide();
  //   console.log("hey i clicked a comment");
  //   console.log($(this).parent().parent());
  //   event.preventDefault();
  //   // $('#login-form').show();
  // })
  $(".comment").on('click', '#comments-btn', function(event){
    // $('#reg-form').hide();
    console.log("hey i clicked a comment");
    console.log(this);
    event.preventDefault();
    // $('#login-form').show();
  })

  function loadComments(){
    event.preventDefault();
    $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/posts/1", {
      method: 'GET',
      data: {
        token:localStorage.getItem('token')

      },
      success: function(data) {
        console.log(data);
        for(var i = 0; i<data.response.length; i++){
          var currentcomment = data.response[i];
          var auth = currentcomment.poster.name;
          var authId = currentcomment.poster.id;
          var commentId = currentcomment._id;
          var numLikes = currentcomment.likes.length;
          var commentreplies = currentcomment.comments;
          var content = currentcomment.content;
          // console.log(commentreplies);

          // console.log(commentId);
          $('#newsfeed').append(`<div class="comment" id=${commentId}>
            <div class="author">
              <span class="glyphicon glyphicon glyphicon glyphicon-user" style:"padding: 5px" aria-hidden="true"></span>
              ${auth}
            </div>
            <div class="message">${content}</div>
            <div class="controls btn-group btn-group-xs" role="group" aria-label="...">
              <button class="like control-btn btn btn-default">
              <span class="glyphicon glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
              </button>
              <button class="show-comments btn btn-default" id="comments-btn">Comments (${commentreplies.length})</button>
              <button class="reply control-btn btn btn-default" id="replyid">Reply</button>
            </div>


          </div>`);

          var commentreplies = $(`<div class = "commentreplies"> </div>`);

          for(var j=0; j<commentreplies.length; i++){
            var reply = commentreplies[j].content;
            console.log(commentreplies[j].content);
            $(commentreplies).append(`<div class="comment-reply">
              <span class="comment-icon glyphicon glyphicon glyphicon glyphicon-user" aria-hidden="true"></span>
              <div class="comment-info">
                <div class="comment-author">person</div>
                <div class="comment-message">${reply}</div>
              </div>
            </div>`)
          }
        }
      }

    });

  }


})
