$("#loginLogin").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
    method: "POST",
    success: function(resp) {
      $("#login").hide();
      //console.log(resp)
    },
    data: {
      email: $("#emailLogin").val(),
      password: $("#passwordLogin").val(),
    },
    error: function(err){
      //console.log(err);
      alert('Oops! Something went wrong.');
    }
  });
});

$("#signUpLogin").on("click", function(event) {
  event.preventDefault();
  $("#signUp").show();
  $("#login").hide();
  //console.log('signuplogin')
  });

$("#signUpSignUp").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
    method: "POST",
    success: function(resp) {
      $("#signUp").hide();
      $("#login").show();
      //console.log(resp)
    },
    data: {
      fname: $("#firstNameSignUp").val(),
      lname: $("#lastNameSignUp").val(),
      email: $("#emailSignUp").val(),
      password: $("#passwordSignUp").val(),
    },
    error: function(err){
      //console.log(err);
      alert('Oops! Something went wrong.');
    }
  });
});

$("#loginSignUp").on("click", function(event) {
  event.preventDefault();
  $("#login").show();
  $("#signUp").hide();
  });

  //document.getElementById('insert').innerHTML = $("#firstNameSignUp").val();
