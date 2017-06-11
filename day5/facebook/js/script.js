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
  $('.container').append('<div class="view-container"></div>')
  refreshData()
  setInterval(refreshData, 1000);

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
  $('.view-container').empty()
  var htmlStruct;
  for(var i = 0; i < resp.response.length; i++){
    var date = new Date(resp.response[i].createdAt);
    htmlStruct = `
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
          <div class="comment-container" style = "border-style: double;">
          <div class = "post-container">
            <h1>
            ${resp.response[i].poster.name}
            </h1>
            <div class = "comment-header">
          ${resp.response[i].content}
            </div>
            <div class = "date">
          ${date}
            </div>
            </div>
            <div class = "black-line">
            </div>
            <div class = "comment-section">
            </div>
          </div>
        </div>
      </div>`
      $('.view-container').append(htmlStruct)
      renderComments(resp.response[i])
  }
  var postStruct = `   <div class="row">
       <div class="col-xs-10 col-xs-offset-1">
         <div class="post-button">
           <input class="postFld"  type="text" placeholder="POST">
            <button type="submit"  class="postBtn">Post</button>
        </div>
       </div>
     </div>`;
    $('.view-container').append(postStruct)
}

function renderComments(card){
for(var i = 0; i < card.comments.length; i++){
  console.log(card.comments[i].content)
  $('.comment-container').append(`<div class="comment">
    <div class="comment-header">
      ${card.comments[i].content}
    </div>
    <div class="date">
    ${new Date(card.comments[i].createdAt)}
    </div>
  </div>`)
  }

 }



})
