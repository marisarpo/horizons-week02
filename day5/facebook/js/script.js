$(document).ready(function(){
  //global variables
  var baseUrl = "https://horizons-facebook.herokuapp.com/api/1.0/"
  // Lets us know what window we are on.
  var isLoginMode = true;
  var userId;
  var userToken;

  $(".registerBt").on('click', function(event){
    event.preventDefault();
    // Check the status of the page
    if(isLoginMode){
      // Need to display the new fields and set isLogin to false
      isLoginMode = false;
      toRegisterPage();
    } else{
      var newEmail = $(".emailFld").val();
      var newPassword = $(".passwordFd").val();
      var newFirstName = $(".firstNameFld").val();
      var newLastName = $(".lastNameFld").val();
      $.ajax({
        url: baseUrl + "users/register",
        method: 'POST',
        success: function(response) {
          toLoginPage();
        },
        data: {
          fname: newFirstName,
          lname: newLastName,
          email: newEmail,
          password: newPassword
        },
        error: function(err){
          alert("Error: Email already in use!", err);
        }
      });
    }



})

$(".loginBt").on('click', function(event){
  event.preventDefault();
  var newEmail = $(".emailFld").val();
  var newPassword = $(".passwordFd").val();

  if(!isLoginMode){
    isLoginMode = true;
    toLoginPage();
  }else{
    $.ajax({
      url: baseUrl + "users/login",
      method: 'POST',
      success: function(response) {
        userId = response.id;
        userToken = response.token;
        toMainPage();
      },
      data: {
        email: newEmail,
        password: newPassword
      },
      error: function(err){
        alert("Error: ", err);
      }
    });
  }
})

function checkValidFields(){
  // --->>>TODO
}
function toRegisterPage(){
  var regFldToAdd =  `
  <div class="temp-flds">
  <div class="row">
  <div class="col-xs-6 col-xs-offset-3 col-md-2 col-md-offset-5">
  <label for="firstNameFld" class="firstNameLb">First name</label>
  <input class="firstNameFld" style="width: 100%" type="text" placeholder="First name">
  </div>
  </div>
  <div class="row">
  <div class="col-xs-6 col-xs-offset-3 col-md-2 col-md-offset-5">
  <label for="lastNameFld" class="lastNameLb">Last name</label>
  <input class="lastNameFld" style="width: 100%" type="Last name" placeholder="Last name">
  </div>
  </div>
  </div>`
  // Append the new fields
  $('.row').eq(1).append(regFldToAdd)
}

function toLoginPage(){
    $('.temp-flds').remove();
    $('.passwordFd').val("");
}

function toMainPage(){
  $('.login-container').remove();
}
})
