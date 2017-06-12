$(document).ready(function(){
  $("#login-hider").hide();
  $("#newsfeed").hide();  
  $(".register").on("click", function (){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
      method: 'POST',
      success: function(data) {
        $("#register-hider").hide();
        $("#login-hider").show();
      },
      data: {
        email: $(".email").val(),
        password: $(".password").val(),
        fname: $(".fname").val(),
        lname: $(".lname").val()
      }
    });
  });

  $(".login-button").on("click", function(){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
      method: 'POST',
      success: function(data) {
        localStorage.setItem('token', data.response.token);
        $("#login-hider").hide();
        $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:posts_id', {
          method: 'GET',
          success: function (){

          },
          data: {
            token: localStorage.getItem('token')
          }
          }
        r});
        $("#newsfeed").show();
      },
      data: {
        email: $(".theEmail").val(),
        password: $(".thePassword").val()
      }
    });
  })
})
