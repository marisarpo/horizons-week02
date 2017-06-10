$(document).ready(function () {

  $('#registration-page').hide();

  $('#go-to-register-button').on('click', function () {
    console.log('hi');
    $('#login-page').hide();
    $('#registration-page').show();
  });

  $('#go-to-login-button').on('click', function () {
    console.log('hi');
    $('#registration-page').hide();   
    $('#login-page').show();
  });

})