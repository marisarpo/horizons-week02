
var newPost = null;
var replyId = null;

$(document).ready(function(){
  //getting around login
  //regisration button
  $('.main').hide()



  $('.btn-primary').on('click', function(){
    $('.loginPage').addClass('remove');
    $('.registrationPage').show()
  });



  //registration
  $('.btn-info').on('click', function(){
    if($('#firstname').val() != '' && $('#lastname').val() != '' && $('#regusername').val() != '' && $('#regpassword').val() != ''){
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
      method: 'POST',
      data: {
        fname: $('#firstname').val(),
        lname: $('#lastname').val(),
        email: $('#regusername').val(),
        password: $('#regpassword').val()
      },
      success: function(data) {
        alert('Login success');
        $('.registrationPage').addClass('remove');
        $('.main').show();
      },
      error: function(data){
        alert("Registration failed. Please try again");
      }
      })
    }
  });



  //loging ajax
  $('#loginFirst').on('click', function(){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    data: {
      email: $('#username').val(),
      password: $('#password').val(),
    },
    success: function(data) {
      $('.loginPage').addClass('remove');
      $('.main').show()
      localStorage.setItem('token', data.response.token);
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/1',{
      method: 'GET',
      data:{
        token: localStorage.getItem('token'),
      },
      success: function(data){
        renderFeed(data);
      },
      error: function(err){
        console.log(localStorage.getItem('token'))
        alert('Post API error')

      }
    })
    },
    error: function(data){
      alert("Login failed. Please try again");
    }
    })
  });
  // post button
  $('#postButton').on('click', function(){
    $.ajax({
      url:'https://horizons-facebook.herokuapp.com/api/1.0/posts',
      method: 'POST',
      data:{
        token: localStorage.getItem('token'),
        content: $('#postComment').val(),
      },
      error: function(err) {console.log(err)},
      success: function(r){
        console.log(r);
      }
    })
  })

  //post update to API
  setInterval(function(){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/1',{
    method: 'GET',
    data:{
      token: localStorage.getItem('token'),
    },
    success: function(data){
      renderFeed(data);
    },
    error: function(err){
      console.log(localStorage.getItem('token'))
      alert('Post API error')

    }
  })
}, 30000);
})


function renderFeed(post) {
  $('.feed').empty();
  post.response.forEach(function(i){
    newPost = i._id;
    $('.feed').append($(`<div class="row" id="${newPost}" ></div>`));
    renderPost(i);
    i.comments.forEach(function(i){
      renderComments(i);
    })
  })
  $('.row #reply').click(function() {
    $('#cardEdit').modal('toggle', $('#reply'));
    replyId = this.closest('.row').id;
  });

  $('#modalSave').click(function(){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/'+ replyId,{
      method: 'POST',
      data: {
        token: localStorage.getItem('token'),
        content: $('#modalBody').val(),
      }
    })
    $('#cardEdit').modal('toggle', $('#modalSave'));
  })

  $('.row #like').click(function() {
    replyId = this.closest('.row').id;
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/'+ replyId,{
      method: 'GET',
      data: {
        token: localStorage.getItem('token'),
      }
    })
  });

  $('#logout').click(function(){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/logout', {
      method: 'GET',
      data: {
        token: localStorage.getItem('token'),
      },
      success: function(){
        $('.main').hide();
        $('.loginPage').removeClass('remove');
      }
    })
  })
}

function renderPost(post) {
  var name = post.poster.name;
  var comment = post.content;
  var timeStamp = post.createdAt;
  var likes = post.likes.length;
  var contentNum = post.comments.length;

  var newCard = `<div class="newsFeedPost col-xs-12">
    <div class="postBox">
      <div class="postName"><p id="postName">${name}</p></div>
      <div class="postTime"><p id="postTime">${timeStamp}</p></div>
      <div class="comment"><p id="comment">${comment}</p></div>
      <div class="footer">
        <span class="numLikes">${likes} likes</span>
        <span class="numReplies">${contentNum} replies</span>
        <button type="button" class="btn btn-danger" id="like"><span class="glyphicon glyphicon-thumbs-up"></span></button>
        <button type="button" class="btn btn-danger" id="reply">Reply</button>
      </div>
    </div>
  </div>`;

$(`#${newPost}`).append(newCard);
}

function renderComments(comment){
  var content = comment.content;
  var timeStamp = new Date(comment.createdAt);
  var replyName = comment.poster.name;

  var reply = `<div class="replies">
    <div class="replyName"><p id="replyName">${replyName}</p></div>
    <div class="replyTime"><p id="replyTime">${timeStamp}</p></div>
    <div class="reply"><p id="reply">${content}</p></div>
  </div>`

$(`#${newPost} .newsFeedPost`).append(reply);
}


//post button
$('#postButton').on('click', function(){
  // debugger;
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    data:{
      token: localStorage.getItem('token'),
      content: $('#postComment').val(),
    },
    error: function(err) {console.log(err)},
    success: function(r){
      console.log(r);
    }
  })
})






//regisration button
$('.btn-primary').on('click', function(){
  $('.loginPage').addClass('remove');
  $('.registrationPage').show()
});



//registration
$('.btn-info').on('click', function(){
  if($('#firstname').val() != '' && $('#lastname').val() != '' && $('#regusername').val() != '' && $('#regpassword').val() != ''){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    method: 'POST',
    data: {
      fname: $('#firstname').val(),
      lname: $('#lastname').val(),
      email: $('#regusername').val(),
      password: $('#regpassword').val()
    },
    success: function(data) {
      alert('Login success');
      $('.registrationPage').addClass('remove');
      $('.newsFeed').show();
    },
    error: function(data){
      alert("Registration failed. Please try again");
    }
    })
  }
});



//loging ajax
$('#loginFirst').on('click', function(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
  method: 'POST',
  data: {
    email: $('#username').val(),
    password: $('#password').val(),
  },
  success: function(data) {
    $('.loginPage').addClass('remove');
    $('.newsFeed').show()
    localStorage.setItem('token', data.response.token);
  },
  error: function(data){
    alert("Login failed. Please try again");
  }
  })
});
