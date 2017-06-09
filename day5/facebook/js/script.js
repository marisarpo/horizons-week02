$(document).ready(function () {
  var comments = [];
  var login = false;

  $('#registration-page').hide();

  $('#go-to-register-button').on('click', function () {
    console.log('hi');
    $('#login-page').hide();
    $('#registration-page').show();
  });

  $('#go-to-login-button').on('click', function () {
    $('#registration-page').hide();   
    $('#login-page').show();
  });

  $('#register-button').on('click', function () {
    var firstName = $('#first-name-input').val();
    var lastName = $('#last-name-input').val();
    var username = $('#usernameInput2').val();
    var password = $('#passwordInput2').val();
    if (validateString(firstName) && validateString(lastName) && validateString(username) && validateString(password)) {
      $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
        data: {
          fname: firstName,
          lname: lastName,
          email: username,
          password: password
        },
        success: function (resp) {
          if(resp.success) {
            $('#registration-page').hide();   
            $('#login-page').show();
          }
        },
        error: function (err) {
          window.alert(err.responseText);
        },
        method: 'POST'
      });
    } else {
      window.alert('One or more fields are invalid');
    }
  });

  $('#login-button').on('click', function () {
    var username = $('#usernameInput1').val();
    var password = $('#passwordInput1').val();
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
      success: function (resp) {
        if (resp.success) {
          localStorage.setItem('token', resp.response.token);
          $.ajax({
            url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
            method: 'GET',
            data: {
              token: localStorage.getItem('token')
            },
            success: function (resp) {
              if (resp.success) {
                login = true;
                comments = resp.response;
                initializeMainPage();
              }
            },
            error: function (err) {
              window.alert(err);
            }
          });
        }
      },
      error: function (err) {
        if (err.statusText === 'Unauthorized') {
          window.alert('username or password was invalid');
        }
      },
      data: {
        email: username,
        password: password
      },
      method: 'POST'
    })
  });

  setInterval(function () {
    if (login) {
       $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
        method: 'GET',
        data: {
          token: localStorage.getItem('token')
        },
        success: function (resp) {
          if (resp.success) {
            $('#main-page').remove();
            comments = resp.response;
            initializeMainPage();
          }
        },
        error: function (err) {
          window.alert(err);
        }
      });
    }
  }, 30000)

  function validateString(str) {
    if (str.trim() === '') {
      return false;
    }
    return true;
  }

  function initializeMainPage() {
    $('#login-page').hide();
    var mainPage = $(`
      <div id="main-page" class="container-fluid">
        <div class="row">
          <div class="header">
            MySpace
            <div id="logout">
              <button id="logout-btn" class="btn default-btn btn-block"><span class="button-text">Log out</span></button>
            </div>
          </div>
        </div>
        <div class="row">
          <input type="post" class="form-control" id="post-box" aria-describedby="post" placeholder="Say Something...">
          <button id="post" class="btn default-btn btn-block"><span class="button-text">Post</span></button>
        </div>
      </div>`);

    for (var i = 0; i < comments.length; i++) {
      var id = comments[i]._id;
      var card = `
      <div class="card container" id="${id}">
        <div class="post">
          <div class="name">
            ${comments[i].poster.name}
          </div>
          <div class="date">
            ${comments[i].createdAt}
          </div>
          <div class="content">
            ${comments[i].content}
          </div>
        </div>
        <div class="post-info">
          <div class="meta-info">
            <div class="col-xs-3"> ${comments[i].comments.length} Replies, ${comments[i].likes.length} Likes</div>
            <div class="post-controls col-xs-3 col-xs-offset-6">
              <button id="like-btn-${id}" class="like-btn btn default-btn"><span class="button-text glyphicon glyphicon-thumbs-up"></span></button>
              <button id="reply-btn-${id}" class="reply-btn btn default-btn"><span class="button-text">Reply</span></button>
            </div> 
          </div>
          <div class="replies">
          </div>
        </div>
      </div>`;
      $(mainPage).append(card);
    }

    $('#registration-page').after(mainPage);

    $('#logout-btn').on('click', function () {
        console.log('1');
        $.ajax({
          url: "https://horizons-facebook.herokuapp.com/api/1.0/users/logout",
          data: {
            token: localStorage.getItem('token')
          },
          method: 'GET',
          success: function(resp) {
            if (resp.success) {
              login = false;
              $('#main-page').remove();
              $('#login-page').show();
            }
          },
          error: function (err) {
            console.log(err);
            window.alert('There was an error logging out');
          }
        });
      });

    for (i = 0; i < comments.length; i++) {
      id = comments[i]._id;
      for (var j = 0; j < comments[i].comments.length; j++) {
        // TODO: FIX APPEND
      $('#' + id + ' .replies').append(`
        <div class="reply">
          <div class="replyName">
            ${comments[i].comments[j].poster.name}
          </div>
          <div class=replyDate">
            ${new Date(comments[i].comments[j].createdAt)}
          <div class="replyContent">
            ${comments[i].comments[j].content}
          </div>
        </div>`);
      }
    }
    $('#post').on('click', function () {
      var post_text = $('#post-box').val();
      if (validateString(post_text)) {
        $.ajax({
          url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            content: post_text
          },
          success: function (resp) {
            $.ajax({
            url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
            method: 'GET',
            data: {
              token: localStorage.getItem('token')
            },
            success: function (resp) {
              if (resp.success) {
                $('#main-page').remove();
                comments = resp.response;
                initializeMainPage();
              }
            },
            error: function (err) {
              window.alert(err);
            }
          });
          },
          err: function (err) {
            window.alert('error');
            console.log('error', err);
          }
        });
      } else {
        window.alert('Post was invalid');
      }
    });

  $('.like-btn').on('click', function () {
    var post_id = $(this).closest('.card').attr('id');
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/" + post_id,
      data: {
        token: localStorage.getItem('token')
      },
      success: function (resp) {
        $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
        method: 'GET',
        data: {
          token: localStorage.getItem('token')
        },
        success: function (resp) {
          if (resp.success) {
            $('#main-page').remove();
            comments = resp.response;
            initializeMainPage();
          }
        },
        error: function (err) {
          window.alert(err);
        }
      });
      },
      error: function (err) {
        console.log('err', err);
        window.alert('Oops... Something went wrong');
      }
    })
  });
  $('.reply-btn').on('click', function () {
    var id = $(this).closest('.card').attr('id');
    var input = `
    <div id="reply-input-${id}">
      <div class="replyDiv"> 
        <input type="reply" class="form-control" id="reply-input-text-${id}" aria-describedby="reply" placeholder="Your reply here...">
      </div>
      <div class="post-controls col-xs-3 col-xs-offset-9">
              <button id="cancel-btn-${id}" class="cancel-btn btn default-btn"><span class="button-text">Cancel</span></button>
              <button id="send-btn-${id}" class="send-btn btn default-btn"><span class="button-text">Send</span></button>
      </div> 
    </div>
    `
    $('#' + id).append(input);
    $('.cancel-btn').on('click', function () {
      var id = $(this).closest('.card').attr('id');
      $('#reply-input-' + id).remove();
    })
    $('.send-btn').on('click', function () {
      var id = $(this).closest('.card').attr('id');
      var value = $($($(this).parent().siblings('.replyDiv')[0]).children()[0]).val();
      $('#reply-input-' + id).remove();
      $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/" + id,
        data: {
          token: localStorage.getItem('token'),
          content: value
        },
        method: 'POST',
        success: function (resp) {
          $.ajax({
          url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
          method: 'GET',
          data: {
            token: localStorage.getItem('token')
          },
          success: function (resp) {
            if (resp.success) {
              $('#main-page').remove();
              comments = resp.response;
              initializeMainPage();
            }
          },
          error: function (err) {
            window.alert(err);
          }
         });
        }
      });
    });
    console.log(comments);
    console.log(localStorage.getItem('token'));
  });
}
})





















