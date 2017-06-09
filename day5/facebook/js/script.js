$('#submitLogin').on('click', function(){
  var inputUsername = $('#usernameLogin').val();
  var inputPassword = $('#passwordLogin').val();
  console.log(inputUsername + inputPassword);
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    success: function(data) {
      console.log('LOGGED IN');
      localStorage.setItem('id',data.response.id);
      localStorage.setItem('token',data.response.token);
      $('#registerButtonDiv').hide();
      $('#loginDiv').hide();
      $('#newsfeed').removeClass('hidden');
      getPosts(1);
    },
    error: function(e){
      alert('Invalid username and/or password');
    },
    data: {
      email: inputUsername,
      password: inputPassword
    }
  });
})

$('#registerButton').on('click',function(){
  $('#registerButtonDiv').hide();
  $('#loginDiv').hide();
  $('#registrationDiv').removeClass('hidden');
})

$('#submitSignUp').on('click',function(){
  var inputFirst = $('#firstName').val();
  var inputLast =$('#lastName').val();
  var inputUsername = $('#usernameSignUp').val();
  var inputPassword = $('#passwordSignup').val();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    method: 'POST',
    success: function(data) {
      alert("You're all set! Please login now");
      $('#loginDiv').show();
      $('#registrationDiv').addClass('hidden');
    },
    error: function(e){
      alert('Oops! Sorry it didnt work! Make sure you filled out the entire form');
    },
    data: {
      fname: inputFirst,
      lname: inputLast,
      email: inputUsername,
      password: inputPassword,
    }
  });
})

var getPosts = function(times){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/'+times, {
    method: 'GET',
    success: function(data) {
      data.response.forEach(function(item, key){
        $('#newsfeed').append('<div id='+item["_id"]+'class="post" poster-id='+item.poster.id+'><div class="post"><div class="mainContent"><h2>'+item.poster.name+'</h2><i>'+item.createdAt+'</i><p>'+item.content+'</p><div class="comments"><h2>'+item.comments.length+' Comments,'+item.likes.length+' Likes</div></div><div class="postFooter"><button class="btn btn-default likeButton">LIKE</button><button class="btn btn-default postCommentButton">POST A COMMENT</button></div></div></div>');
        var postid = item["_id"];
        if(item.comments.length !== 0){
          item.comments.forEach(function(comment,i){
            $('#'+postid).children('.comments').append('<div class="commentContent"><i>'+comment.poster.name+' at '+comment.createdAt+'</br></i><p>'+comment.content+'</p></div>')
          })
        }
      })
    },
    error: function(e){
      alert('Problem loading your posts and comments');
      console.log(e);
    },
    data: {
      token: localStorage.getItem("token")
    }
  });
}
