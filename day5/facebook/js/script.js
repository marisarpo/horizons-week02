$('.loginpage').hide();
$('.newsFeed').hide();

$('#rp_register').on('click', function (event) {
  event.preventDefault();
  $('.newUserRegistrationpage').hide();
  $('.loginpage').show();
  debugger;
  $.ajax({
    method: "POST",
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    success: function(resp){
      console.log(resp);
    },
    data: {
      fname: $('#first_name').val(),
      lname: $('#last_name').val(),
      email: $('#email').val(),
      password: $('#password').val()
    }
  })
})

$('#rp_login').on('click',function(){
  event.preventDefault();
  $('.newUserRegistrationpage').hide();
  $('.loginpage').show();
})

$('#lip_gtRegister').on('click',function(){
  event.preventDefault();
  $('.newUserRegistrationpage').show();
  $('.loginpage').hide();
})

$('#lip_login').on('click',function(event){
  event.preventDefault();
  $.ajax({
  url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
  method: 'POST',
  success: function(data) {
    // data will be the response data that is
    // returned by the endpoint. use this to
    // access the token for future authorization.

    // data.response.token will give you access
    // to the AUTH_TOKEN
    localStorage.setItem('token', data.response.token);
    $('.loginpage').hide();
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
      method: 'GET',
      data:{
        token: localStorage.getItem('token')
      },
      success: function (data){
        console.log(data.response);
        for (var i=0; i<data.response.length; i++){
          var author = data.response[i].poster.name;
          var content = data.response[i].content;
          var time = new Date(data.response[i].createdAt);
          var t = time.toDateString() + time.toLocaleTimeString();
          var numReplies = data.response[i].comments.length;
          var numLikes = data.response[i].likes.length;
          var id = data.response[i]._id;
          var comments = data.response[i].comments;

          var post = $(`
          <div class="post" id="${id}">
            <div class="author">${author}</div>
            <div class='time'>${t}</div>
            <div class="message">${content}</div>
            <div class="numReplies">${numReplies} Replies</div>
            <div class="numLikes">${numLikes} Likes</div>
            <div class="controls"><button class="like btn btn-default">Like</button><button class="reply btn btn-default">Reply</button></div>
            <div class="replies">
          </div>
          `)
          $('.posts').append(post);

          for (var j=0; j<comments.length;j++){
            var author = comments[j].poster.name;
            var time = new Date(comments[j].createdAt);
            var t = time.toDateString() + time.toLocaleTimeString();
            var content = comments[j].content;
            var reply = $(`
              <div class="reply">
                <div class="author">${author}</div>
                <div class='time'>${t}</div>
                <div class="message">${content}</div>
              </div>`)
            $(`#${id}`).find('.replies').append(reply);
          }
        }

      }
    });
    $('.newsFeed').show();
  },
  data: {
    email: $('#email2').val(),
    password: $('#password2').val()
  }
});
})

function display () {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
    method: 'GET',
    data:{
      token: localStorage.getItem('token')
    },
    success: function (data){
      console.log(data.response);
      $('.posts').empty();
      for (var i=0; i<data.response.length; i++){
        var author = data.response[i].poster.name;
        var content = data.response[i].content;
        var time = new Date(data.response[i].createdAt);
        var t = time.toDateString() + time.toLocaleTimeString();
        var numReplies = data.response[i].comments.length;
        var numLikes = data.response[i].likes.length;
        var id = data.response[i]._id;
        var comments = data.response[i].comments;

        var post = $(`
        <div class="post" id="${id}">
          <div class="author">${author}</div>
          <div class='time'>${t}</div>
          <div class="message">${content}</div>
          <div class="numReplies">${numReplies} Replies</div>
          <div class="numLikes">${numLikes} Likes</div>
          <div class="controls"><button class="like btn btn-default">Like</button><button class="reply btn btn-default">Reply</button></div>
          <div class="replies">
        </div>
        `)
        $('.posts').append(post);

        for (var j=0; j<comments.length;j++){
          var author = comments[j].poster.name;
          var time = new Date(comments[j].createdAt);
          var t = time.toDateString() + time.toLocaleTimeString();
          var content = comments[j].content;
          var reply = $(`
            <div class="reply">
              <div class="author">${author}</div>
              <div class='time'>${t}</div>
              <div class="message">${content}</div>
            </div>`)
          $(`#${id}`).find('.replies').append(reply);
        }
      }

    }
  });
}

$('#submit').on('click',function(event){
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    data:{
      token: localStorage.getItem('token'),
      content: $('#newPostInput').val()
    },
    success: function(data){
      console.log(data);
      $('#newPostInput').val('');
    },
  })
})

$('.newsFeed').on('click','.like',function(){
  event.preventDefault();
  console.log('test');
  var id = $(this).closest('.post')[0].id;
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${id}`,
    method: 'GET',
    data:{
      token: localStorage.getItem('token')
    },
    success: function(data){
      console.log(data)
    }
  })
})

$('.newsFeed').on('click', '.reply', function(){
  event.preventDefault();
  var comment = prompt('Type your Comment');
  console.log(comment);
  var id = $(this).closest('.post')[0].id;
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${id}`,
    method: 'POST',
    data:{
      token: localStorage.getItem('token'),
      content: comment
    },
    success: function(data){
      console.log(data)
    }
  })
})

$('.newsFeed').on('click', '#logOut', function(){
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function (data){
      $('.newsFeed').hide();
      $('.loginpage').show();
      $('#email2').val('');
      $('#password2').val('');
    }
  });
})

setInterval(display, 10000);
