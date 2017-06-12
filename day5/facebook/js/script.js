$(document).ready(function() {
  // hides newsfeed at start
  $('.newsfeed-container').hide();

  function renderComments(comment){
    console.log(comment);
    return (`<p>${comment.poster.name} | ${comment.createdAt}</p>
       <p>${comment.content}</p><hr>`)
     }

  function render(post){
    console.log(post);
    var template = `<div class=post>
    <div class=content>
      <h3>${post.poster.name}</h3>
      <p>${post.createdAt}</p>
      <p>${post.content}</p>
    </div> </div>`

    post.comments.forEach(function(comment) {
    template += renderComments(comment);
    $('.newsfeed-container').append(template);
    })
  }

//when click "registration," show registration page
  $('.registration-button').on('click', function(event) {
    $('.login-container').hide();
    $('.registration-container').show();
  })

//logs in and redirects to newsfeed
  $('.login-button').on('click', function(event) {
    event.preventDefault();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
      method: 'POST',
      data: {
        email: $('.usernameField').val(),
        password: $('.passwordField').val(),
      },
      success: function(data) {
        //console.log(data);
        localStorage.setItem('token', data.response.token);
        $('.login-container').hide();
        $('.newsfeed-container').show();
        console.log(data.response.token);

        $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/1',{
          method: "GET",
          data: {
            token: data.response.token
          },
          success: function(response){
            console.log(response);
            response.response.forEach(function(post) {
              render(post);
            })
          }
          // error: function(error){
          //   console.log(error, "inside");
          // }
        })
      },
      error: function(error){
        console.log(error, "outside");
      }
    });
  })

//regiters new user and redirects to login page
  $('.register-button').on('click', function(event){
    event.preventDefault();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
      method: 'POST',
      data: {
        fname: $('.firstNameField').val(),
        lname: $('.lastNameField').val(),
        email: $('.userNameField2').val(),
        password: $('.passwordField2').val()
      },
      success: function(data) {
        $('.login-container').show();
        $('.registration-container').hide();
      },
    });
  })





})
