$(document).ready(function() {

  $('.login-container').hide();
  $('.news-feed-container').hide();


  //register
  $('#register-button').on('click', function() {
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
      method: 'POST',
      data: {
        fname: $('#fname').val(),
        lname: $('#lname').val(),
        email: $('#email').val(),
        password: $('#pass').val()
      },
      success: function(data) {
        //console.log(data);
        $('.register-container').hide();
        $('.login-container').show();
      }
    })
  })

  //shows Login container when user already has an acct
  $('#login-button').on('click', function() {
    $('.register-container').hide();
    $('.login-container').show();
  })

  //log in
  $('#login-button2').on('click', function() {
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
      method: 'POST',
      data: {
        email: $('#email2').val(),
        password: $('#pass2').val()
      },
      success: function(data) {
        //console.log(data);
        localStorage.setItem('token', data.response.token)
        //console.log(localStorage.getItem('token'));
        $('.login-container').hide();

        //ajax call to get posts currently on database
        $.ajax({
          url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',
          method: 'GET',
          data: {
            token: localStorage.getItem('token')
          },
          success: function(data) {
            var d = data.response;
            //console.log(d);
            for (var i = 0; i < d.length; i++) {
              var commentsStr = "";
              for (var j = 0; j < d[i].comments.length; j++) {
                commentsStr += `<div class="reply">
                                  <div class="user">"${d[i].comments[j].content}"</div>
                                  <h6 class="timestamp">${new Date(d[i].comments[j].createdAt)}</h6>
                              </div>`
              }

              var newPost = `<div class="post">
                <div class="user" style="font-weight:bold">${d[i].poster.name}</div>
                <h6 class="timestamp" style="font-weight:italic">${new Date(d[i].createdAt)}</h6>
                <div class="content">"${d[i].content}"</div>
                <div class="bar">_______________________________</div>
                <h5 class="replies-and-likes">${d[i].likes.length} likes, 0 dislikes, ${d[i].comments.length} comments </h5>
                <div class="replies-container">${commentsStr}</div>
                <button class="btn btn-success" id="like-button"><i class="glyphicon glyphicon-thumbs-up"></i></button>
                <button class="btn btn-danger" id="disple-button"><i class="glyphicon glyphicon-thumbs-down"></i></button>
                <button class="btn btn-default" id="reply-button">Reply</button>
                <br>
              </div>`
              $('.NF-container').append(newPost);
            }
          }
        });
        $('.news-feed-container').show();
      }
    })
  })

  //posting!
  $('#post-button').on('click', function() {
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
      method: "POST",
      data: {
        token: localStorage.getItem('token'),
        content: $('#post-form').val()
      },
      success: function(data) {
        //console.log(data);
      }
    })
  })

  //like button
  $('#like-button').on('click', function() {
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/:post_id',
      method: "POST",
      data: {
        token: localStorage.getItem('token'),
      },
      success: function(data) {
        console.log(data);
      }
    })
  })


})
