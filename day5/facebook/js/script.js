$(document).ready(function() {
  $('.loginForm').hide();
  $('.newsfeed').hide();
  $('.invalid-feedback').hide();
});

function loadNewsFeed() {
  $('.loginForm').hide();
  $('.newsfeed').show();
  $.ajaxSetup({
    data: {
      token: localStorage.getItem('token')
    }
  });


}

$('.form-control').on('click', function() {
  console.log($(this).val());//
});


//swap to register form
$('.fluid-container').on('click', '#loginPageRegisterButton', function(event) {
  event.preventDefault();
  $('.loginForm').hide();
  $('.registrationForm').show();
})

//swap to login form
$('.fluid-container').on('click', '#regPageLoginButton', function(event) {
  event.preventDefault();
  $('.registrationForm').hide();
  $('.loginForm').show();
})

//register
$('.fluid-container').on('click', '#regPageRegisterButton', function(event) {
  event.preventDefault();
  console.log('clicked!');
  console.log('this ', this);
  console.log('ajax this ', $(this));
  let firstName = $(this).siblings('#firstName').val();
  let lastName = $(this).siblings('#lastName').val();
  let email = $(this).siblings('#email').val();
  let password = $(this).siblings('#password').val();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    data: {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password
    },
    method: "POST",
    success: function(resp) {
      $('.registrationForm').hide();
      $('.loginForm').show();
      console.log('resp is ', resp);
      console.log('resp.success is ', resp.success);
    },
    error: function(error) {
        console.log('User creation failed due to ', error);
    }
  });
});

//login
$('.fluid-container').on('click', '#loginPageLoginButton', function(event) {
  event.preventDefault();
  let email = $(this).siblings('#email').val();
  let password = $(this).siblings('#password').val();

  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    data: {
      email: email,
      password: password
    },
    method: "POST",
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      localStorage.setItem('id', data.response.id);
      loadNewsFeed();
      console.log('resp.response.token is ', data.response.token);
      console.log('resp.response.id is ', data.response.id);

    },

    error: function(error) {
        console.log('User creation failed due to ', error);
    }
  })
})
