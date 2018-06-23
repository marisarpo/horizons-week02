var fname = $('#fname').val();
var lname = $('#fname').val();
var username = $('#user').val();
var password = $('#password').val();
$('#login').ready(function(){
  $('#gtr').hide();
  $('.newsfeed').hide();
});
$('#register').on('click', function(){
  var fname = $('#fname').val();
  var lname = $('#lname').val();
  var username = $('#user').val();
  var password = $('#password').val();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register',{
    method:'POST',
    data:{
      fname: fname,
      lname:lname,
      email: username,
      password: password
    },
    success: true
  });
});



$('#login').on('click', function(){
  var fname = $('#fname').val();
  var lname = $('#fname').val();
  var username = $('#user').val();
  var password = $('#password').val();
  if(username === '' || password ===''){
    $('#gtr').show();
    $('.rlheader').text('Log in');
    $('#fname, #lname, #register').hide();
  }
  else{
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
      method: 'POST',
      success: function(data) {
      localStorage.setItem('token', data.response.token);
      $('.registration').hide();
      $('.newsfeed').show();
    },
    data: {
      email: username,
      password: password
    }
  });

  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',{
    method: 'GET',
    data:{
    token: localStorage.getItem('token')
    },
    success:function(data){
      console.log(data);
      data.response.forEach(function(element){
        var newPost =$(`
           <div class = 'post'>
        <p class='time'>${element.createdAt}</p>
                      <h1 class = 'post-id'>${element.poster.name}</h1>
                      <h2 class ='post-content'>${element.content}</h2>
                      <div class = 'postFooter'>
                      <div class = 'likes'></div>
                        <div class= 'replies'>

                        </div>
                        <button class = 'postbutton'id = 'like'>Like</button>
                        <button class ='postbutton'id ='reply'>Reply</button>

                        <div class="collapse reply-wrapper">
                            <div class="reply-form">
                              <input type="text" class="form-control"
                                               placeholder="What's on your mind?">
                              <button type="button" class="btn btn-default reply-save">
                              Save
                              </button>
                              <button type="button"
                                    class="btn btn-default reply-cancel"><span
                                    class="glyphicon glyphicon-remove"></span>
                              </button>
                          </div>
                      </div>
                    </div>
                  </div>`);
          $('.posts').append(newPost);
      })

    }

  })
  $('.posts').on('click','#postButton',function(){
    var postText = $(this).siblings('textarea').val();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts',{
      method: 'POST',
      data:{
        token: localStorage.getItem('token'),
        content: postText
      },
    });

  });

  $('.posts').on('click','.reply-save', function(){
    var replyText = $(this).siblings('input').val();
    var replyHtml = $(`<div class='reply'>
        <p class='replyId'>${username}</p>
        <p class='replyText'>${replyText}</p>
      </div>`);
    $(this).closest('.post').find('.replies').append(replyHtml);
    $(this).closest('.reply-wrapper').addClass('collapse');
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:post_id',{
      method: 'POST',
      data:{
      token: localStorage.getItem('token'),
      content: replyText
      },
      success: true

      });

    });

    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/:post_id',{
      method: 'GET',
      data:{
      token: localStorage.getItem('token')
      },
      success:function(data){
        console.log(data);
        data.response.forEach(function(element){
          var like = $(`<div class = 'plikes'>${element.likes.length}</div>`);
          $('.likes').append(like);
        });

      }

    });
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:post_id',{
      method: 'GET',
      data:{
      token: localStorage.getItem('token')
      },
      success:function(data){
        console.log(data);
        data.response.forEach(function(element){
          var replyHtml = $(`<div class='reply'>
              <p class='replyId'>${element.poster.name}</p>
              <p class='replyText'>${element.content}</p>
              <p class ='replyTime'>${element.createdAt}</p>
            </div>`);
          $(this).closest('.post').find('.replies').append(replyHtml);
        });

      }

    });

}
});
$('.logOut').on('click', function(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/logout',{
    method: 'GET',
    data:{
      token: localStorage.getItem('token'),
    },
    success: true
  });
})


$('#gtr').on('click', function(){
  $('#gtr').hide();
  $('.rlheader').text('New user registration');
  $('#fname, #lname, #register').show();
});

$('.posts').on('click','#reply', function(){
  console.log('gothere');
  $(this).siblings('.reply-wrapper').removeClass('collapse');
});

$('.posts').on('click','.reply-cancel', function(){
  $(this).closest('.reply-wrapper').addClass('collapse');
});

$('.posts').on('click','.reply-save', function(){
  var replyText = $(this).siblings('input').val();
  var replyHtml = $(`<div class='reply'>
      <p class='replyId'>${username}</p>
      <p class='replyText'>${replyText}</p>
    </div>`);
  $(this).closest('.post').find('.replies').append(replyHtml);
  $(this).closest('.reply-wrapper').addClass('collapse');
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:post_id',{
    method: 'POST',
    data:{
    token: localStorage.getItem('token'),
    content: replyText
    },
    success: true

    });

  });

$('.posts').on('click','#postButton', function(){
  var postText = $(this).siblings('textarea').val();
  var newPost =$(`            <div class = 'post'>
  <p class='time'></p>
                <h1 class = 'post-id'>${username}</h1>
                <h2 class ='post-content'>${postText}</h2>
                <div class = 'postFooter'>
                <div class = 'likes'></div>
                  <div class= 'replies'>

                  </div>
                  <button class = 'postbutton'id = 'like'>Like</button>
                  <button class ='postbutton'id ='reply'>Reply</button>

                  <div class="collapse reply-wrapper">
                      <div class="reply-form">
                        <input type="text" class="form-control"
                                         placeholder="What's on your mind?">
                        <button type="button" class="btn btn-default reply-save">
                        Save
                        </button>
                        <button type="button"
                              class="btn btn-default reply-cancel"><span
                              class="glyphicon glyphicon-remove"></span>
                        </button>
                    </div>
                </div>
              </div>
            </div>`);

  $(this).parents('.posts').append(newPost);
  $(this).siblings('#postText').val('');
});

var like = 0;
$('#like').on('click', function(){
  like++;
  $('.likes').text(like);
})
