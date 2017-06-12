$('#registration').hide()
//$('#newsfeed').hide()

$('#go-to-reg').on('click', function() {
  $('#login').hide()
  $('#registration').show()
})

$('#go-to-login').on('click', function() {
  $('#login').show()
  $('#registration').hide()
})

$('#register-btn').on('click', function() {
  var firstName = $('#firstname').val()
  var lastName = $('#lastname').val()
  var userName = $('#registration #username').val()
  var passWord = $('#registration #password').val()
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    method: 'POST',
    success: function(data) {
      $('#login').show()
      $('#registration').hide()
      return true
    },
    data: {
      fname: firstName,
      lname: lastName,
      email: userName,
      password: passWord
    }
  })

})

$('#login-btn').on('click', function() {
  var userName = $('#login #username').val()
  var passWord = $('#login #password').val()
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login',{
    method: 'POST',
    success: function(data) {
      localStorage.setItem('token', data.response.token)
      $('#login').hide()
      $('#newsfeed').show()

      $('#reply-btn').on('click', function(event) {
        var postId = $(this).parent().parent().attr("id");
        console.log(postId)
        var replyContent = $('#post-comment').val()
        console.log(replyContent)
        $.ajax({
          url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + postId,
          method: 'POST',
          success: function(data) {
            console.log(data)
          },
          data: {
            token: localStorage.getItem('token'),
            content: replyContent
          }
        })
      })

      $('#like-btn').on('click', function(event) {
        console.log('hi')
        var postId = $(this).parent().parent().parent().attr("id");
        console.log(postId)
        $.ajax({
          url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + postId,
          method: 'GET',
          success: function(data) {
            console.log(data)
          },
          data: {
            token: localStorage.getItem('token')
          }
        })
      })
    },
    data: {
      email: userName,
      password: passWord
    }
  })

  $('#registration').hide()
})


$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/1',{
    method: 'GET',
    success: function(data) {
      console.log(data)
      data.response.forEach(function(post){
        var postID = post._id
        var name = post.poster.name
        var timestamp = post.createdAt
        var content = post.content
        var replies = post.comments.length
        var likes = post.likes.length
        var postHtml = `<div id="${postID}" class = "post container col-sm-8 col-sm-offset-2">
          <h4 id="title">${name}</h4>
          <h6 id="timestamp" class="italic">${timestamp}</h6>
          <p id="post-content">${content}</p>
          <hr>
          <div class="row">
            <div class="col-sm-6">
              <h4>${replies} Replies, ${likes} Likes</h4>
            </div>
            <div class="col-sm-6">
              <button id="like-btn" class="btn btn-primary">Like</button>
              <button id="reply-btn" class="btn btn-primary">Reply</button>
            </div>
          </div>
          <input id="post-comment" type="text" class="form-control" placeholder="Comment here">
          </div>`
        $('#posts').append(postHtml)
      })

    },
    data: {
      token: localStorage.getItem('token')
    }
  })

  $('#post-content-btn').on('click', function(event) {
    event.preventDefault();
    var postContent = $('#post-content').val();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts',{
      method: 'POST',
      success: function(data) {
      },
      data: {
        content: postContent,
        token: localStorage.getItem('token')
      }
    })
  })
