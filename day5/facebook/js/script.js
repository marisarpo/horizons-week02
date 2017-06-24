$(document).ready(function() {


  $('.register .register').on('click', function() {
    var firstName = $(this).parent().children('#inputFirstName').val().trim();
    var lastName = $(this).parent().children('#inputLastName').val().trim();
    var email = $(this).parent().children('#inputEmail').val().trim();
    var password = $(this).parent().children('#inputPassword').val().trim();

    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
      method: "POST",
      data: {
        fname: firstName,
        lname: lastName,
        email: email,
        password: password
      },
      success: function() {
        // they are registered, log in page!
        $(".register").addClass('hidden')
        $(".login").removeClass('hidden')

      },
      error: function(reason) {
        var message = JSON.parse(reason.responseText).error
        var messageHtml = `<p class="login-message red">${message}</p>`
        $('.register .register').after(messageHtml);
      }
    })
  })

  $('.login .login').on('click', function() {
    var email = $(this).parent().children('#loginEmail').val();
    var password = $(this).parent().children('#loginPassword').val();

    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
      method: 'POST',
      success: function(data) {

        localStorage.setItem("token", data.response.token)
        $('#first-page').addClass('hidden');
        $('#home-page').removeClass('hidden');
      },
      error: function(reason) {
        var message = JSON.parse(reason.responseText).error
        var messageHtml = `<p class="login-message red">${message}</p>`
        $('.login .login').after(messageHtml);
      },
      data: {
        email: email,
        password: password
      }
    });
  })

  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/posts/:page", {
    method: "GET",
    success: function(resp) {
      var author;
      var content;
      var replyAuthor;
      var replyContent;
      resp.response.forEach(function(post) {
        debugger
        if (post.poster.name.slice(0, 9) === "undefined") {
          author = "";
        } else {
          author = post.poster.name.split(' ')[0];
        }
        content = post.content;

        var newPostHtml = `<div class="post-container">
        <div class = "post col-xs-2">
        <h5 class = "author-name"> <strong>${author}</strong> </h5>
        <p class = "post-content">${content}</p>
        <div class = "stats" id="outer">
        <strong class="stats">
        <div><p> 0 Replies </p></div>
        <div><p> 0 Likes </p></div>
        </strong>
        </div>
        </div>
        <div class="actions col-xs-2">
        <span class="glyphicon glyphicon-heart-empty"></span>
        <button class="reply-button btn btn-primary btn-md">Reply</button>
        </div>
        </div>`

        $('#post-home').append(newPostHtml);
        // post.comments.forEach(function(comment) {
        //   debugger
        //   if (comment.poster.name.slice(0, 9) === "undefined") {
        //     replyAuthor = "";
        //   } else {
        //     replyAuthor = comment.poster.name.split(' ')[0];
        //   }
        //   replyContent = comment.content;
        //
        //   var newReplyHtml = `<div class = "reply col-xs-2">
        //   <h5 class = "replier-name"> <strong>${replyAuthor}</strong> </h5>
        //   <p class = "reply-content">${replyContent}</p>
        //   </div>`
        //   debugger
        //   $(newPostHtml).children('.actions').before(newReplyHtml);
        //
        // })
      })
    },
    error: function(reason) {
      var message = JSON.parse(reason.responseText).error
      var messageHtml = `<p class="login-message red">${message}</p>`
      $('.login .login').after(messageHtml);
    },
    data: {
      token: localStorage.getItem('token')
    }
  })



  $('.change-view').on('click', function() {
    $('.login-register').toggleClass('hidden');
  })

  $('#post-home').on("mouseenter mouseleave", '.glyphicon-heart-empty, .glyphicon-heart', function() {
    $(this).toggleClass('glyphicon-heart-empty');
    $(this).toggleClass('glyphicon-heart');
  })


})
