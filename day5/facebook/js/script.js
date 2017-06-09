$(document).ready(function() {

});
// $.ajaxSetup({
//   data:{
//     key:apiKey,
//     token:apiToken
//   }
// })
var apiUrl = 'https://horizons-facebook.herokuapp.com/api/1.0'
$('.submit').on('click',function(){
  var $inputs = $('#login_form :input');
  var user = $inputs[0].value
  var password = $inputs[1].value
  function clear(){
       $('#input_form input').each(function () {
         $(this).val("");
      });
          $('#input_form input').first().focus();
  };
  $.ajax(apiUrl + '/users/login', {
      method: 'POST',
      success: function(data) {
        // data will be the response data that is
        // returned by the endpoint. use this to
        // access the token for future authorization.
        localStorage.setItem('token', data.response.token)
        clear();
        $('.login-container').hide();
        // data.response.token will give you access
        // to the AUTH_TOKEN
      },
      data: {
        email: user,
        password: password
      },
      error: function(err){
        alert('ERROR',err);
      }
    });
})
$('#submit_reg').on('click',function(){
  var $inputs = $('#registration_form :input');
  var fname = $inputs[0].value
  var lname = $inputs[1].value
  var newUser = $inputs[2].value
  var newPass = $inputs[3].value
  function clear(){
       $('#registration_form input').each(function () {
         $(this).val("");
      });
          $('#registration_form input').first().focus();
  };


  $.ajax(apiUrl + '/users/register', {
      method: 'POST',
      data:{
        fname: fname,
        lname: lname,
        email: newUser,
        password: newPass
      },
      success: function(data) {
        // data will be the response data that is
        // returned by the endpoint. use this to
        // access the token for future authorization.
        $('.registration-container').hide();
        clear();
        $('.login-container').show();
        // data.response.token will give you access
        // to the AUTH_TOKEN
      },
      error: function(err){
        alert('ERROR',err);
        console.log(err);
      }
    });

})
$('#register_button').on('click', function(){
  $('.login-container').hide();
  $('.registration-container').show();
})
$('#login_btn').on('click', function(){
  $('.login-container').show();
  $('.registration-container').hide();
})
