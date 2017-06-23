$(document).ready(function() {
  $('#register-submit').on('click', function(e) {
    e.preventDefault();
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email-register').val();
    var pass = $('#password-register').val();
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
      method: 'post',
      data: {
        fname: fname,
        lname: lname,
        email: email,
        password: pass
      },
      success: function(resp) {
        console.log('Successfully registered!');
        $('#register-form').hide();
        $('#login-form').show();
      },
      error: function(err) {
        alert('Something went wrong with AJAX! Please check your console.');
        console.log(err);
      }
    });
  });

  $('#login-submit').on('click', function(e) {
    e.preventDefault();
    var email = $('#email-login').val();
    var pass = $('#password-login').val();
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
      method: 'post',
      data: {
        email: email,
        password: pass
      },
      success: function(resp) {
        console.log('Successfully logged in!');
        localStorage.setItem('token', resp.response.token);
        $('#login-form').hide();
      },
      error: function(err) {
        if (err.responseJSON.error === 'Login failed.')
          alert('Incorrect username or password. Please try again.');
        else {
          alert('Something went wrong with AJAX! Please check your console.');
          console.log(err);
        }
      }
    });
  });

  $('#goto-login').on('click', function(e) {
    e.preventDefault();
    $('#register-form').hide();
    $('#login-form').show();
  });

  $('#goto-register').on('click', function(e) {
    e.preventDefault();
    $('#login-form').hide();
    $('#register-form').show();
  });
});
