"use strict";

var AUTH_TOKEN;
var USER_ID;

$('.sign-up-btn').on('click', function(event) {
  var firstName = $('#signup-fname').val()
  var lastName = $('#signup-lname').val()
  var eMail = $('#signup-email').val()
  var password = $('#signup-pass').val()
  event.preventDefault();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    type: 'POST',
    data: {
      "fname": firstName,
      "lname": lastName,
      "email": eMail,
      "password": password
    },
    success: function(data) {
      console.log(`Thank you ${fname} for creating a FazeHorizons account.`)
    },
    error: function(e) {
      console.log(e);
      console.log(e.responseText);
      throw "error";
    }
  })
})


$('#login-button').on("click", login);
function login(event){
  /*
  Write the front-end code the login section of your Facebook site. One way to
  create the login form is to create <input> elements and a <button> element with
  a click handler. When the button is pressed you should use the values in the
  input elements to populate your AJAX request.
  */
  var EMAIL = $('#login-email').val();
  var PASS = $('#login-pass').val();

  $.ajax(
    'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
      {
        method: 'POST',
        success: function(data) {
          console.log("Login successful.");
          localStorage.setItem(AUTH_TOKEN, data.response.token);
          localStorage.setItem(USER_ID, data.response.id);
      },
      data: {
        email: EMAIL,
        password: PASS
      }, error: function(e){
        console.log(e);
        console.log(e.responseText);
      }
    });
    event.preventDefault();
  }
