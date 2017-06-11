$(document).ready(function(){

  // Globals
  var baseUrl = "https://horizons-facebook.herokuapp.com/api/1.0/"
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


    $.ajax({
      url: baseUrl + "users/login",
      method: 'POST',
      success: function(resp) {
        userId = resp.response.id;
        userToken = resp.response.token;
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



function toMainPage(){
  $('.login-container').remove();
  $('.container').append('<div class="view-container"></div>')
  refreshData();
  //setInterval(refreshData, 1000);

}

function refreshData(){
  $.ajax({
    url: baseUrl + "posts/:page",
    data: {
      token: userToken
    },
    success: function(resp) {
      render(resp);
    }
  })
}

function render(resp){
  // Structure
  console.log(resp)
  $('.view-container').empty()
  console.log(resp.response);
  var htmlStruct;
  var postStruct = `<div class="post-container">
    <div class="row">
      <div class="col-xs-2 col-xs-offset-5 col-md-1 col-md-offset-5.5">
        <input class="postFld" placeholder="Write a post here...">
        <button class="postBtn"> Post </button>
      </div>
    </div>

  </div>`;


  //for(var i = 0; i < resp.response.length; i++){
    var date = new Date(resp.response[4].createdAt);
    var commentsArr = $(resp.response[4]);

    htmlStruct = `
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
          <div class="post-container">
          <legend>
            <h3>
              ${resp.response[4].poster.name}
            </h3>
            <div class = "date">
              <h5>
                ${date}
              </h5>
            </div>
            <label class = "post-content">
              ${resp.response[4].content}
            </label>
            </legend>
          </div>
        </div>
      </div>`

      $('.view-container').append(htmlStruct);
      $('.view-container').append(postStruct);
      $('.postBtn').on('click', function(event){
        $('.view-container').append("test!!!");
      })
      //renderComments(resp.response[4])

  //}
}


function renderPost(postObj){

}



})
