$(document).ready(function(){

})

//sign up variables//
var firstName = $('.signup-fname').val()
var lastName = $('.signup-lname').val()
var eMail = $('.signup-email').val()
var password = $('.signup-pass').val()

$('.sign-up-btn').on('click', function(event) {
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register' {
      type: 'POST',
      data: {
        fname: firstName
        lname: lastName
        email: eMail
        password: password
      },
        success: function(data) {
          console.log(`Thank you ${fname} for creating a FazeHorizons account.`)
        }
        error: function(data) {
          throw "error"
        }
    })

})
