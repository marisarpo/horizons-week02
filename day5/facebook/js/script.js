$(document).ready(function(){

$('#login-save').on('click', function(){
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method:'POST',
    data:{
      email:$('.login-form-input #email').val(),
      password:$('.login-form-input #password').val()
    },
    success:function(data){
      localStorage.setItem('token', data.response.token);
      refresh();
      var stopID = setInterval(function(){refresh();
        console.log("running")}, 20000);
    },
    error:function(err){
      console.log(err);
    }
  })
})


$('#register-save').on('click', function(){
  if($('#firstname').val().length === 0 ||
    $('#firstname').val().length === 0 ||
    $('#firstname').val().length === 0 ||
    $('#firstname').val().length === 0){
      alert("All fields must be filled!");
      return;
    }

  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method:'POST',
    data:{
      fname:$('.register-form-input #firstname').val(),
      lname:$('.register-form-input #lastname').val(),
      email:$('.register-form-input #email').val(),
      password:$('.register-form-input #password').val()
    },
    success:true,
    error:function(err){
      console.log(err);
    }

  })
})

$('.post-box').on('click', '.Like', function() {
  var thisButton = $(this);
  console.log(thisButton.parent().attr('id'));
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/` + thisButton.parent().attr('id'),
    method:'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success:function(){
      console.log("liked!");
    },
    error: function(err) {
      console.log(err);
      console.log($(this));
      console.log(this);
      console.log($(this).attr('id'));
    }
  })
})

$('#submit-post').on('click', function(){

  if($('.post-content').val().length === 0){
    alert("You cannot submit an empty post!");
    return;
  }

  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    data:{
      token:localStorage.getItem('token'),
      content:$('.post-content').val()
    },
    method:'POST',
    success:true,
    error:function(err){
      console.log(err);
    }
  })
})

$('#reply-save').on('click', function(){
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' +tempPostID,
    method:'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $('.reply-content').val()
    },
    error: function(err) {
      console.log(err);
    }
  })
})

$('.post-box').on('click', '.Reply', function(){
  console.log($(this));
  tempPostID = $(this).parent().attr('id')
})
var tempPostID = null;

var refresh = function(){
  $('.post-box').empty();
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
    method:'GET',
    data:{
      token:localStorage.getItem('token')
    },
    success:function(data2){
      data2.response.forEach(function(item){
        $('.post-box').append(`<div class='post' id='${item._id}'>
          <div class='name'>${item.poster.name}</div>
          <div class='content'>${item.content}</div>
          <button type='button' class='Like'>Like</button>
          <a id='number-likes'>0</a>
          <button type='button' class='Reply' data-toggle='modal' data-target='#reply-form'>Reply</button>
          <div class='replies'></div>
        </div>`);
        $('#' + item._id + ' ' + '#number-likes').text(`${item.likes.length}`);
        item.comments.forEach(function(item2){
          $('#' + item._id + ' ' + '.replies').append(
            `<div class='post' id='${item._id}'>
              <div class='name'>${item2.poster.name}</div>
              <div class='content'>${item2.content}</div>
              <button type='button' class='Like'>Like</button>
              <a id='number-likes'>0</a>
              <button type='button' class='Reply'>Reply</button>
            </div>`
          );
        })
      })

    },
    error:function(err){
      console.log(err);
    }
  })
}

})
