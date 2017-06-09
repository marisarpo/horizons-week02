

$(document).ready(function() {
  //
  // $('.login-container').hide();
  //
  // $('.register-container').show();

});


var apiURL = 'https://horizons-facebook.herokuapp.com/api/1.0/users/login'


// Sign Up
$('#sign-up').on('click', function(e){
  e.preventDefault();
    $.ajax({
      type: "POST",
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
      // data: {
      //   fname: $('#first-name').val(),
      //   lname: $('#last-name').val(),
      //   email: $('#input-email').val(),
      //   password: $('#input-password').val()
      // },
      data: $('#signup').serialize(),
      success: function(resp) {
        console.log(resp);
        $('.register-container').hide()
      },

      error: function(err) {
        console.log("Error", err);
      }
    })
})

// Sign In
$('#login-button').on('click', function(e){
  e.preventDefault();
    $.ajax({
      type: "POST",
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
      // data: {
      //   fname: $('#first-name').val(),
      //   lname: $('#last-name').val(),
      //   email: $('#input-email').val(),
      //   password: $('#input-password').val()
      // },
      data: {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
      },

      success: function(resp) {
        console.log(resp);
        $('.login-container').hide();
        $('.register-container').hide();

        localStorage.setItem('token', resp.response.token)

        // console.log(localStorage.getItem('token'));
      },

      error: function(err) {
        console.log("Error", err);
      }
    })
})

// Post

$('#post-button').on('click', function(e){
  e.preventDefault();
    $.ajax({
      type: "POST",
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
      // data: {
      //   fname: $('#first-name').val(),
      //   lname: $('#last-name').val(),
      //   email: $('#input-email').val(),
      //   password: $('#input-password').val()
      // },
      data: {
        token: localStorage.getItem('token'),
        content: $("#post").val()
      },
      success: function(resp) {

        var postContent = $('#post').val()
        var postWrapper = `<div class = "post-container">
            <h3>Sample Name</h3>
            <p>${postContent}</p>
        </div>`;

        var postid = resp.response.poster.id;
        console.log(resp);
        $('body').append(postWrapper);

      },

      error: function(err) {
        console.log("Error", err);
      }
    })
})


$('#get-posts-button').on('click', function(e){
  e.preventDefault();
    $.ajax({
      type: "GET",
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
      // data: {
      //   fname: $('#first-name').val(),
      //   lname: $('#last-name').val(),
      //   email: $('#input-email').val(),
      //   password: $('#input-password').val()
      // },
      data: {
        token: localStorage.getItem('token')
      },

      success: function(resp) {
        console.log(resp);

        var postContent = '';

        var postWrapper = '';

        resp.response.forEach(function(post){
          postContent = post.content;
          postWrapper = `<div class = "post-container">
              <h3>Sample Name</h3>
              <p>${postContent}</p>
          </div>`;
          $('body').append(postWrapper);
        })
      },

      error: function(err) {
        console.log("Error", err);
      }
    })
})

$('#comment-button').on('click', function(e){
  e.preventDefault();
    $.ajax({
      type: "POST",
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/593b2a1bca9cff0011dfbf1e',
      // data: {
      //   fname: $('#first-name').val(),
      //   lname: $('#last-name').val(),
      //   email: $('#input-email').val(),
      //   password: $('#input-password').val()
      // },
      data: {
        token: localStorage.getItem('token'),
        content: $('#comment').val()
      },

      success: function(resp) {
        console.log(resp);

        // var commentContent = '';
        //
        // var commentWrapper = '';
        //
        // resp.response.forEach(function(post){
        //   postContent = post.content;
        //   postWrapper = `<div class = "post-container">
        //       <h3>Sample Name</h3>
        //       <p>${postContent}</p>
        //   </div>`;
        //   $('body').append(postWrapper);
        // })
      },

      error: function(err) {
        console.log("Error", err);
      }
    })
})

$('#like-button').on('click', function(e){
  e.preventDefault();
    $.ajax({
      type: "GET",
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/593b2a1bca9cff0011dfbf1e',
      // data: {
      //   fname: $('#first-name').val(),
      //   lname: $('#last-name').val(),
      //   email: $('#input-email').val(),
      //   password: $('#input-password').val()
      // },
      data: {
        token: localStorage.getItem('token')
      },

      success: function(resp) {
        console.log(resp);
        // var postContent = '';
        //
        // var postWrapper = '';
        //
        // resp.response.forEach(function(post){
        //   postContent = post.content;
        //   postWrapper = `<div class = "post-container">
        //       <h3>Sample Name</h3>
        //       <p>${postContent}</p>
        //   </div>`;
        //   $('body').append(postWrapper);
        // })
      },

      error: function(err) {
        console.log("Error", err);
      }
    })
})

$('#get-comments-button').on('click', function(e){
  e.preventDefault();
    $.ajax({
      type: "GET",
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/593b2a1bca9cff0011dfbf1e',
      // data: {
      //   fname: $('#first-name').val(),
      //   lname: $('#last-name').val(),
      //   email: $('#input-email').val(),
      //   password: $('#input-password').val()
      // },
      data: {
        token: localStorage.getItem('token')
      },

      success: function(resp) {
        console.log(resp);
      },

      error: function(err) {
        console.log("Error", err);
      }
    })
})


setInterval(function(){
  $.ajax({
    type: "GET",
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
    // data: {
    //   fname: $('#first-name').val(),
    //   lname: $('#last-name').val(),
    //   email: $('#input-email').val(),
    //   password: $('#input-password').val()
    // },
    data: {
      token: localStorage.getItem('token')
    },

    success: function(resp) {
      console.log(resp);

      var postContent = '';

      var postWrapper = '';

      resp.response.forEach(function(post){
        postContent = post.content;
        postWrapper = `<div class = "post-container">
            <h3>Sample Name</h3>
            <p>${postContent}</p>
        </div>`;
        $('body').append(postWrapper);
      })
    },

    error: function(err) {
      console.log("Error", err);
    }
  })
}, 30000)

//Logout button

$('#logout-button').on('click', function(e){
  e.preventDefault();
    $.ajax({
      type: "GET",
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
      // data: {
      //   fname: $('#first-name').val(),
      //   lname: $('#last-name').val(),
      //   email: $('#input-email').val(),
      //   password: $('#input-password').val()
      // },
      data: {
        token: localStorage.getItem('token')
      },

      success: function(resp) {
        console.log(resp);
        alert('You\'ve been successfully logged out')
      },

      error: function(err) {
        console.log("Error", err);
      }
    })
})
// $('#sign-in').on('click', function(){
//
// })
