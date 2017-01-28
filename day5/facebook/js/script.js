var getComments = function(data){
  return `<div class="comments">
    <h2>${data.poster.name}</h2>
    <h6>${data.createdAt}</h6>
    <p>${data.content}</p>
  </div>`
}

// ********************************
// login
// ********************************
$('button[name=login]').click(function(){
  var dataObj = {
    email: $('input[name=email]').val(),
    password: $('input[name=pass]').val()
  }
console.log(dataObj);
$.ajax({
  url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
  data: dataObj,
  method: 'POST',
  success: function(data){
    // don't do this because when you refresh window, token disappears
    // window.token = data.response.token;
    console.log(data);
    $('.login-page').hide();
    localStorage.setItem('token', data.response.token);
    // using local storage, you can see token even after you refresh
    // to test this, go to network tab and type below in
    // localStorage.getItem('token');
  }
  // data: dataObj
})
});

// ********************************
// to registration from login page
// ********************************
$('button[name=toRegis]').click(function(){
  $('.login-page').hide();
  $('.user-regis').show();
});

// ********************************
// to login from regis page
// ********************************
$('button[name=toLogin]').click(function(){
  $('.login-page').show();
  $('.user-regis').hide();
});

// ********************************
// registration
// ********************************
$('button[name=regis]').click(function(){
  var dataObj = {
    email: $('input[name=username]').val(),
    password: $('input[name=makePassword]').val(),
    fname: $('input[name=firstName]').val(),
    lname: $('input[name=lastName]').val()
  }
  console.log(dataObj);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    data: dataObj,
    method: 'POST',
    success: function(data){
      console.log(data);
    }
  })
});

// ********************************
// logout ... unfinished
// ********************************
$('button[name=logout]').click(function(){
  // need to logout so add ajax request
  $.ajax({
    // url:'https://horizons-facebook.herokuapp.com/api/1.0/users/logout?token=' + localStorage.getItem('token'),
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    method: 'GET',
    // to logout, we will remove the token from localStorage
    success: function(){
      localStorage.removeItem('token');
      //hide login form
      // also works: div[id=login-form]
      // also works: $('#login-form').hide();
      $('#login-form').addClass('.hide');
    },
    // token is the one we've been using, it id's us
    data: {
      token: localStorage.getItem('token')
    }
  });
});

// ********************************
// thumbs up and likes
// ********************************
// $('button[name=thumbs]').click(function(){
$('#newsfeed').on('click', 'button[name=thumbs]', function(){
  // console.log("lisa");
  var dataObj = {
    token: localStorage.getItem('token'),
  }
  // console.log($(this).parent());
  // console.log($(this).parent().attr('id'));
  // console.log(dataObj);
  $.ajax({
    // url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + $(this).parent().attr('id'),
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + $(this).parent().attr('id'),
    method: 'GET',
    success: function(data){
      // console.log('sox');
    },
    data: dataObj
  });
});

// ********************************
// get posts
// ********************************
$('button[name=getPosts]').click(function(){
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'GET',
    success: function(data){

      // return html str with comment

      $('.postcontainer').html('');
      var callPosts = function(data){
        return `<div class="post" id=${data._id}>
                <h2> ${data.poster.name} </h2>
                  <h6>${data.createdAt}</h6>
                  <p>${data.content}</p>
                <div class="breakline"></div>
                <h3>${data.comments.length} Replies, ${data.likes.length} Likes</h3>
                <div class="comments">
                ${data.comments.map(getComments)}
                </div>
                <button class="nfbutton" type="button" name="thumbs">
                   <span class="glyphicon glyphicon-thumbs-up"></span>
                </button>
                <button class="nfbutton" type="button" name="reply">Reply</button>
                </div>`
              }
        $('.postcontainer').append(data.response.map(callPosts))
      // console.log(data);
    },
    data: {
      token: localStorage.getItem('token')
    }
  });
})



// ********************************
// post a post - new facebook post
// ********************************

$('button[name=toPost]').click(function(){
  var dataObj = {
    token: localStorage.getItem('token'),
    content: $('input[name=postcontent]').val()
  }
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    data: dataObj,
    success: function(data){
      console.log(data);
      // console.log(data.response.names);
      $('.postcontainer').append(`<div class="post">
              <h2> ${data.response.poster.name} </h2>
                <h6>${data.response.createdAt}</h6>
                <p>${data.response.content}</p>
              <div class="breakline"></div>
              <h3>${data.response.comments.length} Replies, ${data.response.likes.length}</h3>
              <div class="comments">
              ${data.response.comments.map(getComments)}
              </div>
              <button class="nfbutton" type="button" name="thumbs">
                 <span class="glyphicon glyphicon-thumbs-up"></span>
              </button>
              <button class="nfbutton" type="button" name="reply">Reply</button>
              </div>`)
    }
  })
});

// ********************************
// post a comment/ reply
// ********************************
$('#newsfeed').on('click', 'button[name=reply]',function(){
  var dataObj = {
    token: localStorage.getItem('token'),
    content: $('input[name=postcontent]').val()
  }
  $('#myModal').show();
  console.log('here show');
  // $.ajax({
  //   url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + $(this).parent().attr('id'),
  //   method: 'POST',
  //   data: dataObj,
  //   success: function(data){
  //   }
  // })
});
$('span[class=close]').on('click', function(){
  console.log('here close');
  $('#myModal').hide();
})
