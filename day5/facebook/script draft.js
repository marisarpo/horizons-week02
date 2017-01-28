$('button[name=login]').click(function(){
  var dataObj = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  }
  console.log(dataObj);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    // for register, we use link /register (instead of login) and enter in 4
    // data points: first name, last name, username (email), password (something like that)
    // reference API for GET POSTS/etc.
    method: 'POST',
    success: function(data){
      console.log(data);
      $('#login-form').addClass('hide');
      // $('div[id=login-form]').hide(); essentially does the same thing
      // window.token = data.response.token;
      // reference local storage mozilla
      localStorage.setItem('token', data.response.token);
      localStorage.getItem('token');
      // use local storage instead of local variables
      // to remove token, use localStorage.remove()
    },
    data: dataObj
  }); //post login url
});
