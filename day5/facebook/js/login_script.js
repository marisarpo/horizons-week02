$(document).ready(function(){
  // Global stuff
  var baseUrl = "https://horizons-facebook.herokuapp.com/api/1.0/";
  var userId;
  var userToken;
  var gotAccess = false;

  $(".loginBt").on('click', function(event){
    event.preventDefault();
    var enteredEmail = $(".emailFld").val();
    var enteredPassword = $(".passwordFd").val();

    // Try to log in...
    requestAccess(enteredEmail, enteredPassword);
    if(gotAccess) {
      toHomePage();
    }


  });


function requestAccess(email, password){
  $.ajax({
    url: baseUrl + "users/login",
    method: 'POST',
    success: function(resp) {
      userId = resp.response.id;
      userToken = resp.response.token;
      gotAccess = true;
    },
    data: {
      email: email,
      password: password
    },
    error: function(err){
      alert("Login failed... Try again", err);
    }
  });
}

function toHomePage() {
  window.location.replace("../html/index.html");
}







});
