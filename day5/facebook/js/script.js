$('#register-btn').on('click', function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    type: "POST",
    data: {
      fname: $('#firstNameInput').val(),
      lname: $('#lastNameInput').val(),
      email: $('#emailInput').val(),
      password: $('#passwordInput').val()
    },
    error: function(err) {
      var errObj = JSON.parse(err.responseText);
      //console.log(responseTextObj);
      //console.log(typeof responseTextObj);
      alert("Sorry! " + errObj.error + " Please try again!");
      //alert("shoot!" + err.error);
    },
    success: function(resp) {
      console.log("success!");
    }
  });
});
