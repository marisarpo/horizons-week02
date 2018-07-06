var apiURL = 'https://horizons-facebook.herokuapp.com/api/1.0';
var currUser = null;

$(document).ready(function(){

    $('#button-form-register').on('click',function(event){
      event.preventDefault();
      $('#email-warning').empty();
      $.ajax(`${apiURL}/users/register`,{
        type: 'POST',
        // data: {
        //   fname: $(this).siblings('#register-firstname').val(),
        //   lname: $(this).siblings('#register-lastname').val(),
        //   email: $(this).siblings('#register-email').val(),
        //   password: $(this).siblings('#register-password').val()
        // },
        success: function(resp){
          $(document).find("#form-login").show();
          $(document).find("#form-register").hide();
          console.log(resp);
        },
        error: function(err){
          $('#email-warning').text('either those names and things are already taken, or you didn\'t provide them');
          console.log(err);
        }
      });
      clear('#register-password');
      return false;
    });

    $('#button-form-alternate').on('click', function(event){
      $('#email-warning').empty();
      if($(this).val()==="login"){
        $(this).val('registration');
        $(this).text('Go to registration');
        $("#form-login").show();
        $("#form-register").hide();
      }else{
        $(this).val('login');
        $(this).text('Login');
        $("#form-login").hide();
        $("#form-register").show();
      }


    });

    $('#form-login-button').on('click',function(event){
      $('#email-warning').empty();
      $.ajax(`${apiURL}/users/login`,{
        type: 'POST',
        data: {
          email: $(this).siblings('#login-email').val(),
          password: $(this).siblings('#login-password').val()
        },
        success: function(data){
          localStorage.setItem('id',data.response.id);
          localStorage.setItem('token',data.response.token);
          $(document).find("#sign-in").hide();
          $(document).find('#homepage').show();
          renderNewsFeed()
        },
        error: function(err){
          $('#email-warning').text('invalid email or password');
          console.log(err);
        }
      });
      clear('#login-email','#login-password');
    })

    $.ajaxSetup({
      type: 'GET',
      data: {
        token: localStorage.getItem('token')
      }
    })

    setInterval(renderNewsFeed,30000);

    $('#button-mypost').on('click',function(event){
      $.ajax(`${apiURL}/posts`, {
        type: 'POST',
        data: {
          // token: localStorage.getItem('token'),
          content: $(this).parent().find('#mypost').val()
        },
        success: function(data) {
          clear('#mypost');
        },
        error: function(err) {

          console.log(err);
        }
      })
    })

    $('#newsfeed').on('click', '.button-post-like', function(event){
      let postID = $(this).closest('.post').attr('id');
      let thisButton = this;
      $.ajax(`${apiURL}/posts/likes/${postID}`,{
        // type: 'GET',
        // data: {
        //   token: localStorage.getItem('token')
        // },
        success: function(data){
          $(thisButton).text(`Like (${data.response.likes.length})`);
        },
        error: function(err){
          console.log(err);
        }
      })
    })

      $('#newsfeed').on('click', '.comment-link', function(event){
         $(this).parent().siblings('.replies').toggleClass('hide');
      })

    $('#newsfeed').on('click', '.button-post-reply', function(event){
      let postID = $(this).closest('.post').attr('id');
      var replyContent = prompt('your reply');
      var start = Date.now();
      if(replyContent !== null){
        $.ajax(`${apiURL}/posts/comments/${postID}`,{
          type: 'POST',
          data: {
            content: replyContent
          },
          success: function(data){
            let reply = `<div class="post-reply">
              <div class="post-reply-body">
              ${replyContent}
              <div class="post-reply-footer">
              me at ${start.toString()}
              </div>
            </div>`;
            $(`#${postID}`).find('.replies').append(reply);
            $(`#${postID}`).find('.replies').show();
          },
          error: function(err){
            console.log(err);
          }
        })
      }
    })

    $('#logout').on('click', function(event){
      $.ajax(`${apiURL}/users/logout`,{
        data: {
          token: localStorage.getItem('token')
        },
        success: function(data){
          localStorage.clear();
          $(document).find('#homepage').toggleClass('hide');
          $(document).find('#sign-in').toggleClass('hide');
        },
        error: function(err){
          console.log(err);
        }
      })
    })

})


function clear(){
  var args = Array.apply(null, arguments);
  args.forEach(function(arg){
    $(document).find(arg).val('');
  });
}

function renderNewsFeed(){
  $(document).find('#newsfeed').empty();
  $.ajax(`${apiURL}/posts/1`, {
    success: function(data){
      for(let i =0; i<data.response.length; i++){
        renderComment(data.response[i]);
      }
    },
    error: function(err){
      console.log(err);
    }
  })
}

function renderReply(comment) {
  let time = new Date(comment.createdAt);
  return `<div class="post-reply">
    <div class="post-reply-body">
    ${comment.content}
    <div class="post-reply-footer">
    ${comment.poster.name} at ${time.toDateString()}
    </div>
  </div>`;

}

function renderComment(comment){
  let date = new Date(comment.createdAt);
  let newPost = `<div class="post" id="${comment._id}">
    <div class="post-header">
      ${comment.poster.name}
      <span style="font-size: 20px"> on
      <span class="timestamp"> ${date.toString()} </span>
      </span>
    </div>
    <div class="post-body">
      ${comment.content}
    </div>
    <div class="post-footer">
      <span class='comment-link'> ${comment.comments.length} comments </span>
      <button class="button-post-reply" type="button">
        <!--span class="glyphicon glyphicon-share-alt"></span-->
        Reply
      </button>
      <button class="button-post-like" type="button">
        <!--pan class="glyphicon glyphicon-thumbs-up"></span-->
        Like (${comment.likes.length})
      </button>
    </div>
    <div class="hide replies"></div>
  </div>`;
  $(document).find('#newsfeed').append(newPost);
  for(let i=0; i<comment.comments.length; i++){
    let reply = renderReply(comment.comments[i]);
    $(document).find(`#${comment._id}`).find('.replies').append(reply);
  }
}

// function renderReply(postID){
//   var replyContent = prompt('your reply');
//   if(replyContent !== null){
//     $.ajax(`${apiURL}/posts/comments/${postID}`,{
//       type: 'POST',
//       data: {
//         content: replyContent
//       },
//       error: function(err){
//         console.log(err);
//       }
//     })
//   }
// }
