$('#registerBody').hide();
$('.board').hide();
$('#replyBody').hide();
$('#loginBody #login').on('click', function() {
  var inputName = $('#user').val();
  var inputPassword = $('#passwordLogin').val();
  $('#loginBody').hide();
  $('.board').show();


  // console.log(123);
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    success: function(data) {
      // alert('login sucessful');
      console.log(data.response);
      localStorage.setItem('token', data.response.token);
      //
      // server();
    },
    error: function(e) {
      alert('invalid input');
    },
    data: {
      email: inputName,
      password: inputPassword
    }
  });
})

$('#register').on('click', function() {
  $('#loginBody').hide();
  $('#registerBody').show();

})

$('#registerR').on('click', function() {
  var email = $('#email').val();
  var password = $('#password').val();
  var fname = $('#fname').val();
  var lname = $('#lname').val();
  $('#registerBody').hide();
  $('#loginBody').show();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    success: function(data) {
      console.log(data);
    },
    method: 'POST',
    data: {
      fname: fname,
      lname: lname,
      email: email,
      password: password

    }
  });
})

function server(num) {
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/`,
    data: {
      token: localStorage.getItem('token')
    },
    method: 'GET',
    success: function(data) {
      // console.log(data);
      // console.log(data);
      data.response.forEach(function(dataSourse) {
        var commentContent = dataSourse.content;
        var name = dataSourse.poster.name;
        var time = dataSourse.createdAt;
        var commentsNum = dataSourse.comments.length;
        var likesNum = dataSourse.likes.length;
        var id = dataSourse._id;
        var html = `<div class="list" id = '${id}'>
        <div class= 'name'>
        '${name}'
        </div>
        <div class= 'time'>
        '${time}'
        </div>
        <div class= 'content'>
        '${commentContent}'
        </div>
        <span>comments: '${commentsNum}' ,</span> <span>likes: '${likesNum}'</span>
        <button type="button" id= 'like' >like</button>
        <button type="button" id ='reply' >reply</button>
        <button type="button" id ='showComment' >showComment</button>
        </div>`;
        // localStorage.setItem('id', data.response._id);
        // console.log(data.response._id);
        $('#listbody').append(html);
      })
    }
  })
}

$('.board').on('click', '#refresh', function() {
  // console.log(123);
  $('#listbody').empty();
  server();
})

// setInterval(function() {
//   $('#listbody').empty();
//   server();
//   console.log('running well');
// }, 10000)

$('.board').on('click', '#out', function() {
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/users/logout`,
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(response) {
      console.log(response);
      $('.board').hide();
      $('#loginBody').show();

    }
  })
})

$('#listbody').on('click', '#like', function() {
  // console.log(123);
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/` + $(this).parent().attr('id'),
    method: 'GET',
    data: {
      token: localStorage.getItem('token'),
    },
    success: function(data) {
      console.log('liked once');
      // server();
    },
    error: function(e) {
      console.log(e);
    }

  })
})
var currentId = null;
$('#listbody').on('click', '#reply', function() {
  console.log('cliked reply');
  currentId = $(this).parent().attr('id');
  $('#replyBody').show();

})

$('#replyBody').on('click', 'button', function() {
  $('#replyBody').hide();
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/` + currentId,
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $('#replyContent').val()
    },
    success: function(data) {
      var comment = data.response.comments;
      comment.forEach(function(item) {
        var content = item.content;
        var timing = item.createdAt;
        var name = item.poster.name;
        var html = `<div class="commentBody" >
        <div class= 'name'>
        '${name}'
        </div>
        <div class= 'time'>
        '${timing}'
        </div>
        <div class= 'content'>
        '${content}'
        </div>
        </div>`;
        $('#poster').append(html);
      })
      // server();
    },
    error: function(e) {
      console.log(e);
    }

  })
})

$('#comments').on('click', function() {
  server();
})

$('#poster').on('click', 'button', function() {
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts`,
    data: {
      token: localStorage.getItem('token'),
      content: $('#posterContent').val()
    },
    method: 'POST',
    success: function(data) {
      // console.log(data);
      // $('#listbody').empty();
      server();

    }
  })
})
