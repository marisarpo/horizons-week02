$('#login').on('click', function(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    success: function(data) {
      // data will be the response data that is
      // returned by the endpoint. use this to
      // access the token for future authorization.

      // data.response.token will give you access
      // to the AUTH_TOKEN
      console.log('yay this shit works pt. 2');
      localStorage.setItem('token', data.response.token);
      console.log(localStorage.token);
      $('.login, .middleSection').hide();
    },
    data: {
      email: $('#loginInfo').val(),
      password: $('#password').val()
    }
  });
})

$('#createAccount').on('click', function(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    method: 'POST',
    success: function(resp) {
      // data will be the response data that is
      // returned by the endpoint. use this to
      // access the token for future authorization.

      // data.response.token will give you access
      // to the AUTH_TOKEN
      console.log('yay this shit works pt. 1')
      return true;
    },
    data: {
      fname: $('#firstName').val(),
      lname: $('#lastName').val(),
      email: $('#newLoginInfo').val(),
      password: $('#newPassword').val(),
    }
  });
})
