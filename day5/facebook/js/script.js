//prath@joinhorizons.com
//password

//LOGIN
$('button[name=login]').click(function() {
  var dataObj = {
    email : $('.login input[name=email]').val(),
    password : $('.login input[name=password]').val()
  }
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    success: function(data) {
      // window.token = data.response.token
      localStorage.setItem('token', data.response.token); //indefinite storage sort of like cookies to store some token
      localStorage.getItem('token'); //to get that token from the localstorage
      console.log(data);
      //hide login
      $('.new-post').removeClass('hide');
      $('.new-post').addClass('flex');
      $('.login-frame').addClass('hide');
      $('.login-frame').removeClass('flex');
      $('.posts-frame').removeClass('hide');
      $('.logout').removeClass('hide');
      $('.posts-frame').addClass('flex');
    },
    data: dataObj,
    error: function(xhr, textStatus, error) {
        console.log(xhr);
        console.log(xhr.responseText);
    }
  }).done(setTimeout(getPost, 300));
})


//logout
$('button[name=logout]').click(function() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    method: 'GET',
    success: function() {
      $('.login-frame').removeClass('hide');
      $('.login-frame').addClass('flex');
      $('.posts-frame').addClass('hide');
      $('.logout').addClass('hide');
      $('.posts-frame').removeClass('flex');
      console.log('log out done');
    },
    data: {
      token: localStorage.getItem('token')
    },
    error: function(xhr, textStatus, error) {

        console.log(xhr);
        console.log(xhr.responseText);
    }
  })
})


//REGISTER
$('button[name=register]').click(function() {
  var dataObj = {
    fname : $('.register input[name=first-name]').val(),
    lname : $('.register input[name=last-name]').val(),
    email : $('.register input[name=email]').val(),
    password : $('.register input[name=password]').val()
  }
  console.log(dataObj);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'POST',
    success: function(data) {
      console.log('get posts');
      $('.register-frame').removeClass('flex');
      $('.register-frame').addClass('hide');
      $('.posts-frame').removeClass('hide');
      $('.logout').removeClass('hide');
      $('.posts-frame').removeClass('flex');
      return true;
    },
    data: dataObj
  })
})

//have an account already
$('#account-exist').click(function() {
  $('#account-exist').addClass('hide');
  $('.register-frame').removeClass('flex');
  $('.register-frame').addClass('hide');
  $('.login-frame').removeClass('hide');
  $('.login-frame').addClass('flex');
})


//likes click
$('#likes').click(function() {
  $post = $(this).closest('.post');
  $post.children('.likes').removeClass('hide');
})

//comments click
$('#comments').click(function() {
  $post = $(this).closest('.post');
  $post.children('.comments').removeClass('hide');
})

var getPost = function () {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'GET',
    success: function(data) {
      data.response.forEach(function(item) {
        console.log(item);
        pullData(item);
      });

    },
    data: {
      token: localStorage.getItem('token')
    }
  })
}

var pullData = function (obj) {
  $('.posts').append('<div class = "post flex"><h1 id="poster"> '+obj.poster.name+'</h1><p id="content">'+ obj.content + ' </p><div class = "side-frame flex"><div class = "likes-frame"><a type = "text" id="likes" name="likes">Likes '+ obj.likes.length +' </a></div><div class = "comments-frame"><a type = "text" id="comments" name="comments">Comments ' + obj.comments.length+'</a></div></div><div class = "comments hide"><div class = "comment">');

  obj.comments.forEach(function (data) {
    $('.posts').append('<h1 id="poster-comment"> ' +data.poster.name +'</h1><p id="content-comment">' + data.content + '</p>');
  });
  // $('.posts').append('<button id="new-like-button" name="new-like">New Post</button>')

  $('.posts').append('</div></div><div class = "likes hide">');
  obj.likes.forEach(function (data) {
    $('.posts').append('<h1 id="like-name">'+ data.name +'</h1>');
  });
  // $('.posts').append('<input type="text" name="new-comment" placeholder="Say something">')
  // $('.posts').append('<button id="new-comment-button" name="new-comment">New Post</button>')
  $('.posts').append('</div></div>');
}





//newpost
$('.new-post-button').click(function() {
  var str = $('input[name=new-button]').val();
  var obj = {
    "token": StlocalStorage.getItem('token'), // AUTH_TOKEN
    "content": str // The text content of the new post.
  }
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    success: function(data) {
      console.log('new post done');
    },
    data: obj
  }).done(getPost)
})

//
// //new like /posts/likes/:id
//
// new-like-button
//
// //new comment /posts/comments/:id
// new-comment
// new-comment-button
//
// $('.new-post-button').click(function() {
//   var str = $('input[name=new-button]').val();
//   var obj = {
//     "token": StlocalStorage.getItem('token'), // AUTH_TOKEN
//     "content": str // The text content of the new post.
//   }
//   $.ajax({
//     url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
//     success: function(data) {
//       console.log('new post done');
//     },
//     data: obj
//   }).done(getPost)
// })
