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
  $.ajax(apiUrl + '/users/login', {
      method: 'POST',
      success: function(data) {
        // data will be the response data that is
        // returned by the endpoint. use this to
        // access the token for future authorization.
        console.log('hey');
        localStorage.setItem('token', data.response.token)
        $('.login-container').hide();
        // data.response.token will give you access
        // to the AUTH_TOKEN
      },
      data: {
        email: user,
        password: password
      }
    });
})
