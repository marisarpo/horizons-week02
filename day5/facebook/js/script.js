$('#register-button').on('click', function (event) {
  event.preventDefault();
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/users/register`,
    method: 'POST',
    data: {
      fname: $('#register-fname').val(),
      lname: $('#register-lname').val(),
      email: $('#register-email').val(),
      password: $("#register-password").val()
    },

    success: function (event) {
      $('#register-fname').val('');
      $('#register-lname').val('');
      $('#register-email').val('');
      $("#register-password").val('');
      window.location = './login.html';


    }


  })

})

$('#login-button').on('click', function (event) {
      event.preventDefault();
      $.ajax({
        url: `https://horizons-facebook.herokuapp.com/api/1.0/users/login`,
        method: 'POST',
        data: {
          email: $('#login-email').val(),
          password: $("#login-password").val()
        },

        success: function (data) {
          $('#register-email').val('');
          $("#register-password").val('');
          localStorage.setItem('token', data.response.token);
          localStorage.setItem('userID', data.response.id);
          window.location = './newsfeed.html'


        }, 
    })
})

if(window.location.href=== 'file:///Users/haithamelmengad/horizons/week02/day5/facebook/newsfeed.html' || window.location.href=== 'file:///Users/haithamelmengad/horizons/week02/day5/facebook/newsfeed.html#'){
$.ajax({
      url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/1`,
      method: 'GET',
      data: {
        token: localStorage.getItem('token'),
      },

      success: function (response) {
        
        response.response.forEach(function(post){
        localStorage.setItem('postID', post.poster.id);
        $('#zenewsfeed').append($(`<div class="panel panel-white post panel-shadow">
        <div class="post-heading">
            <div class="pull-left image">
                <img src="./images/joebloggs.jpg" class="img-circle avatar" alt="user profile image">
            </div>
            <div class="pull-left meta">
                <div class="title h5">
                    <a href="#"><b>` + post.poster.name + `</b></a>
                    made a post.
                </div>
                <h6 class="text-muted time">` + new Date(post.createdAt) + `</h6>
            </div>
        </div> 
        <div class="post-description"> 
            <p>` + post.content + `</p>
            <div class="stats">
                <a href="#" class="btn btn-default stat-item" id="the-like-button">
                <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> `+ post.comments.length +`
                </a>
                <a href="#" class="btn btn-default stat-item" id="get-comments">
                <span class="glyphicon glyphicon-comment"aria-hidden="true"></span> `+ post.likes.length +`
                </a>
            </div>
        </div>
        <div class="post-footer">
                <div class="input-group"> 
                    <textarea id="comment-area" placeholder="Add a comment" type="text"></textarea>
                    <a class="input-group-addon">
                        <button type="button" class="btn btn-secondary" id="post-button"> Post </button>
                    </a>
                    </div>
                </div>
            </div>
        </div>
        <ul class="comments-list">`));
        
        

      
      })

      

    }
})
}

$('#the-post-button').on('click', function (event) {
    alert('lol');
    event.preventDefault();
    $.ajax({
        url: `https://horizons-facebook.herokuapp.com/api/1.0/posts`,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          content: $('#post-area').val()
        },

      success: function (data) {
        window.location = './newsfeed.html';
        return true;
      }, 
  })
})

$('#zenewsfeed').on('click', '#post-button',function (event) {
    alert('lol');
    event.preventDefault();
    $.ajax({
        url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/+` + localStorage.getItem('postID') +``,
        method: 'GET',
        data: {
          token: localStorage.getItem('token'),
          content: $('#comment-area').val()
        },

      success: function (data) {
        data.forEach()
        return true;
      }, 
  })
})

$('#zenewsfeed').on('click', '#get-comments', function (event) {
    debugger
    event.preventDefault();
    $.ajax({
        url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/`+ localStorage.getItem('postID') +``,
        method: 'GET',
        data: {
          token: localStorage.getItem('token'),
        },

      success: function (response) {
          response.forEach(function(comment){
        $(this).$(`.comments-list`).append($(`<li class="comment">
            <div class="comment-body">
                <div class="comment-heading">
                    <h4 class="user">`+ comment.poster.name +`</h4>
                    <h5 class="time">`+ new Date(comment.createdAt)+`</h5>
                </div>
                <p>`+ comment.content +`</p>
            </div>`))
        })
      }, 
  })
})

