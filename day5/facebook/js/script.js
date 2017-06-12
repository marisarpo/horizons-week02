var postHtml = (`<textarea id=postContent placeholder ="Starting writing..."></textarea>
<button id=postPost>Post</button>`)

console.log(localStorage.getItem('token'));

function render(post) {
  console.log(post);
  var postId = post._id;
  var numLikes = post.likes.length;
  var numComments = post.comments.length;
  var comments = "";

  post.comments.forEach(function(comment) {
    comments += renderComments(comment);
  })

  var content = (`<div id=${postId} class=post>
    <div class=content>
      <h3>${post.poster.name}</h3>
      <p>${post.createdAt}</p>
      <p>${post.content}</p>
    </div>

    <div class=replies>
      <h3>${numComments} Replies, ${numLikes} Likes</h3>
      ${comments}
      <button  class="like">Like</button><button class="reply">Reply</button><input></input>
    </div>`);

    return content;
  }

  function renderComments(comment) {
    return (`<p>${comment.poster.name} | ${comment.createdAt}</p>
      <p>${comment.content}</p><hr>`)
    }



    $("#sign-in").on('click', function() {
      var user = $("#user").val()
      var pass = $("#pass").val()
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
        method: 'POST',
        success: function(data) {
          $("#landing").hide();
          localStorage.setItem('token', data.response.token);
          $("body").append("<h1 class='text-center'>NEWSFEED</h1>");
          $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
            method: 'GET',
            success: function(data) {
              $("body").append(postHtml);
              data.response.forEach(function(post){
                $("body").append(render(post));
              });

            },
            data: {
              token: localStorage.getItem('token'),
            }
          });

          // data will be the response data that is
          // returned by the endpoint. use this to
          // access the token for future authorization.

          // data.response.token will give you access
          // to the AUTH_TOKEN
        },

        error: function(err) {
          console.log(err);
        },

        data: {
          email: user,
          password: pass
        }
      });
    })

    $("#registration").on('click', function() {
      var fname = $("#fname").val()
      var lname = $("#lname").val()
      var email = $("#email").val()
      var pass = $("#regpass").val()
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
        method: 'POST',
        success: function(data) {
          $("#register").hide()
          $("#login h1").html("Login now");
          $("#user").val(email)
        },

        error: function(err) {
          console.log(err);
        },

        data: {
          fname: fname,
          lname: lname,
          email: email,
          password: pass,
        }
      });
    })

    $("body").on('click', "#postPost", function() {
      var content = $("#postContent").val()
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
        method: 'POST',
        success: function(data) {
          console.log('what how you speak on my name');
          // data will be the response data that is
          // returned by the endpoint. use this to
          // access the token for future authorization.

          // data.response.token will give you access
          // to the AUTH_TOKEN
        },
        data: {
          token: localStorage.getItem('token'),
          content: content
        }
      });
    })

    $("body").on('click', '.reply', function(){
      var postID = $(this).closest('.post').attr('id');
      var content = $(this).siblings('input').val()
      console.log(`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:${postID}`);
      $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${postID}`, {
        method: 'POST',
        success: function(data) {
          console.log('yoooooooo');
          // data will be the response data that is
          // returned by the endpoint. use this to
          // access the token for future authorization.

          // data.response.token will give you access
          // to the AUTH_TOKEN
        },

        error: function(err) {
          console.log(postID);
          console.log(err);
        },

        data: {
          token: localStorage.getItem('token'),
          content: content
        }
      });
    })

    $("body").on('click', '.like', function(){
      var postID = $(this).closest('.post').attr('id');
      $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${postID}`, {
        method: 'GET',
        success: function(data) {
          console.log('yoooooooo');
          // data will be the response data that is
          // returned by the endpoint. use this to
          // access the token for future authorization.

          // data.response.token will give you access
          // to the AUTH_TOKEN
        },

        error: function(err) {
          console.log(err);
        },

        data: {
          token: localStorage.getItem('token'),
        }
      });
    })


    setInterval(function() {
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
        method: 'GET',
        success: function(data) {
          $("body").empty()
          $("body").append(postHtml);
          data.response.forEach(function(post){
            $("body").append(render(post));
          });

        },
        data: {
          token: localStorage.getItem('token'),
        }
      });

    }, 30000)
