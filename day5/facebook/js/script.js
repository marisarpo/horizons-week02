
$(function() {
  var pageNum = 1;
  render();

  $("#login-button").on("click", function() {
    var user = $("#username-field").val();
    var pass = $("#password-field").val();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
      method: 'POST',
      data: {
        email: user,
        password: pass
      },
      success: function(data) {
        var id = data.response.id;
        var token = data.response.token;
        //console.log(data);
        localStorage.setItem('token', token);
        document.location.href = "newsfeed.html";
      }
    });
  });

  $("#register-button").on("click", function() {
    console.log("clicked")
    var fname = $("#reg-fname-field").val();
    var lname = $("#reg-lname-field").val();
    var user = $("#reg-user-field").val();
    var pass = $("#reg-pass-field").val();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
      method: 'POST',
      data: {
        fname: fname,
        lname: lname,
        email: user,
        password: pass
      },
      success: function(data) {
        //console.log("successful")
        document.location.href = "index.html";
      }
    });
  });

  $("#post-status-button").on("click", function() {
    var status = $("#post-status-field").val();

    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
      data: {
        token: localStorage.token,
        content: status
      },
      method: 'POST',
      success: render
    });
  });

  $(".list-posts").on("click", ".like-btn", function() {
    var postId = $(this).closest(".post").attr("id");
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + postId, {
      data: {
        token: localStorage.token
      },
      success: render
    });
  });

  $(".list-posts").on("click", ".reply-btn", function() {
    var postId = $(this).closest(".post").attr("id");
    var content = $(this).prev().val();
    //console.log(postId, content);
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + postId, {
      data: {
        token: localStorage.token,
        content: content
      },
      method: 'POST',
      success: render
    });
  });


  $("#next-page-button").on("click", function() {
    pageNum++;
    render();
  });
  $("#prev-page-button").on("click", function() {
    if (pageNum !== 1) {
      pageNum--;
    }
    render();

  });

  $("#logo-image").on("click", function() {
    render();
  });

  $("#banner-name").on("click", function() {
    render();
  });


// RENDER CANVAS
  function render() {
    $(".list-posts").empty();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/' + pageNum, {
      data: {
        token: localStorage.token
      },
      method: 'GET',
      success: function(resp) {
        _.each(resp.response, renderPost);
      }
    });
  }

  function renderPost(post) {
    //console.log(post);
    $(".list-posts").append(
      `
      <div class="post" id="${post._id}">
        <div class="main-post">
          <div class="post-header">
            <div class="post-name">${post.poster.name}</div>
            <div class="post-date">${post.createdAt}</div>
          </div>
          <div class="post-content">${post.content}</div>
          <div class="post-footer">
            <div class="post-info">${post.likes.length} likes, ${post.comments.length} replies</div>
            <div class="post-controls">
              <button type="button" name="like" class="btn btn-primary like-btn">Like</button>
              <input type="text" name="reply" class="comment-box" placeholder="Write a comment...">
              <button type="button" name="reply" class="btn btn-default reply-btn">Reply</button>
            </div>
          </div>
        </div>
        <div class="comments">
        </div>
      </div>
      `
    );

    _.each(post.comments, function(comment) {
      renderComment(comment, post._id);
    });
  }

  function renderComment(comment, postId) {
    $(".post#" + postId).children(".comments").append(`
      <div class="reply">
        <div class="reply-header">
          <div class="reply-name">${comment.poster.name}</div>
          <div class="reply-date">${new Date(comment.createdAt).toString()}</div>
          <div class="reply-content">${comment.content}</div>
        </div>
      </div>
      `
    );
  }

})



