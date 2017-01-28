$('button[name=login]').click(function(){
  var dataObj = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  }
  console.log(dataObj);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    // for register, we use link /register (instead of login) and enter in 4
    // data points: first name, last name, username (email), password (something like that)
    // reference API for GET POSTS/etc.
    method: 'POST',
    success: function(data){
      console.log(data);
      $('#login-form').addClass('hide');
      $('#registration-form').addClass('hide');

      // SHOW LOGOUT BUTTON WHEN YOU SUCCESSFULLY LOGIN
      $('#login-page').show();


      // $('div[id=login-form]').hide(); essentially does the same thing
      // window.token = data.response.token;
      // reference local storage mozilla
      localStorage.setItem('token', data.response.token);
      localStorage.getItem('token');
      // use local storage instead of local variables
      // to remove token, use localStorage.remove()
    },
    data: dataObj
  }); //post login url
});

$('button[name=logout]').click(function() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout?token=' + localStorage.getItem('token'),
    method: 'GET',
    success: function(data) {
      console.log('logout successful', data);
      localStorage.removeItem('token');
      $('#login-page').hide();
      $('#login-form').show();

      // WE NEED TO CLEAR THE INPUT PLACEHOLDERS AFTER LOGGING OUT
      $('#login-form.reset').val('');
    },


    // THIS DOES THE SAME THING AS URL CONCATENATION ABOVE
    // data: {
    //   token: localStorage.getItem('token') // data: the stuff being sent to server
    // }
  });
}); // look for buttons with name property logout


// OLD GET POSTS METHOD
// $('button[name=getposts]').click(function() {
//
//   $.ajax({
//     url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
//     method: 'GET',
//     success: function(whatever) {
//       console.log(whatever);
//
//     },
//     data: {
//       token: localStorage.getItem('token')
//     }
//   });
// });


// likes and comments are both arrays
// comments is an array of just comments (comment, poster (who commented)
// likes: array of people who have liked
// when you logout, database destroys the token (or that's what you want)
// data has response key where value is an object
// response has id and token
// need to store token into variable



// CLICK REGISTER LINK SHOULD SHOW REGISTRATION FORM
$('button[name=register-page]').click(function() {
  $('#login-form').hide();
  $('#registration-form').show();
})
//LINK FROM REGISTRATOIN FORM TO LOGIN PAGE
$('button[name=loginLink-button]').click(function() {
  $('#login-form').show();
  $('#registration-form').hide();
});


// REGISTRATION SECTION
$('button[name=register]').click(function(){
  var dataObj = {
    fname: $('input[name=firstName]').val(),
    lname: $('input[name=lastName]').val(),
    email: $('input[name=emailRegister]').val(),
    password: $('input[name=passwordRegister]').val()
  }
  console.log(dataObj);
  $('#registration-form').addClass('hide');
  $('#login-form').show();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    // for register, we use link /register (instead of login) and enter in 4
    // data points: first name, last name, username (email), password (something like that)
    // reference API for GET POSTS/etc.
    method: 'POST',
    success: function(data){
      $('#registration-form').addClass('hide');
      console.log("it works")
    },
    // ADD ERROR HERE / FAILURE CASE HERE!!!!


    data: dataObj
  }); //post login url
});


// EVENT HANDLER FOR CLICKING REPLY/COMMENTS
// $('button[name=reply-button]').click(function(){
//   var newObj = {
//     "token": localStorage.getItem('token'),
//     "content": $('input[name=comment]').val()
//   }
//   console.log(dataObj);
//   $('#registration-form').addClass('hide');
//   $('#login-form').show();
//   $.ajax({
//     url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
//     // for register, we use link /register (instead of login) and enter in 4
//     // data points: first name, last name, username (email), password (something like that)
//     // reference API for GET POSTS/etc.
//     method: 'POST',
//     success: function(data){
//       $('#registration-form').addClass('hide');
//       console.log("it works")
//     },
//     // ADD ERROR HERE / FAILURE CASE HERE!!!!
//     data: dataObj
//   }); //post login url
// });






// GET POSTS
$('button[name=get-posts]').click(function(){
  var myString = '';
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    // for register, we use link /register (instead of login) and enter in 4
    // data points: first name, last name, username (email), password (something like that)
    // reference API for GET POSTS/etc.
    method: 'GET',
    success: function(thread){
      $('#like-button').show();
      $('#reply-button').show();
      $('#makepost').show();
      for(var i = 0; i < thread.response.length; i++) {
        myString = myString + (thread.response[i].poster.name + "<br>"
        + thread.response[i].content + "<br>" + thread.response[i].createdAt +
        "<br>" + thread.response[i].comments + "<br>" + thread.response[i].likes
        + "<br>" + "<button type = 'button' name = 'like-button'>Like</button>" +
        "<button type = 'button' name = 'replybutton'>Reply</button>" + "<br>" + "<br>");
      }
      $('#posts').html(myString);
    },
    // ADD ERROR HERE / FAILURE CASE HERE!!!!

    data: {
      token: localStorage.getItem('token')
    }

  }); //post login url
});


// MAKE POST METHOD
$('button[name=postbutton]').click(function(){
  var myString = '';
  var newPost = {
    "token": localStorage.getItem('token'),
    "content": $('input[name=comment]').val()
  }
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    // for register, we use link /register (instead of login) and enter in 4
    // data points: first name, last name, username (email), password (something like that)
    // reference API for GET POSTS/etc.
    method: 'POST',
    success: function(thread){
      myString = myString + (thread.response.poster.name + "<br>"
      + newPost.content + "<br>" + thread.response.createdAt +
      "<br>" + thread.response.comments + "<br>" +
      thread.response.likes + "<br>" + "<button type = 'button' name = 'like-button'>Like</button>" +
      "<button type = 'button' name = 'replybutton'>Reply</button>" + "<br>" + "<br>");
      $('#posts').before(myString);
      // ISSUE: COMMENTS ARE ADDING BEFORE OTHERS, BUT IN SUBSEQUENT ORDER :(
    },
    // ADD ERROR HERE / FAILURE CASE HERE!!!!

    data: newPost

  }); //post login url
});

// MAKE REPLY BUTTON (for each)
$('button[name=replybutton]').click(function(){
  console.log('clicking reply button')
  var myString = '';
  var newPost = {
    "token": localStorage.getItem('token'),
    "content": $('input[name=comment]').val()
  }
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    // for register, we use link /register (instead of login) and enter in 4
    // data points: first name, last name, username (email), password (something like that)
    // reference API for GET POSTS/etc.
    method: 'POST',
    success: function(thread){
      myString = myString + (thread.response.poster.name + "<br>"
      + newPost.content + "<br>" + thread.response.createdAt +
      "<br>" + thread.response.comments + "<br>" + thread.response.likes +
      "<button type = 'button' name = 'like-button'>Like</button>" +
      "<button type = 'button' name = 'replybutton'>Reply</button>" + "<br>" + "<br>");
      $('#posts').before(myString);
      // ISSUE: COMMENTS ARE ADDING BEFORE OTHERS, BUT IN SUBSEQUENT ORDER :(
    },
    // ADD ERROR HERE / FAILURE CASE HERE!!!!

    data: newPost

  }); //post login url
});


// means we need to make objects for each comment; use "this"
$('button[name=like-button]').click(function(){
  console.log('clicking like')
  var myString = '';
  var newPost = {
    "token": localStorage.getItem('token'),
    "content": $('input[name=comment]').val()
  }
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    // for register, we use link /register (instead of login) and enter in 4
    // data points: first name, last name, username (email), password (something like that)
    // reference API for GET POSTS/etc.
    method: 'POST',
    success: function(thread){
      myString = myString + (thread.response.poster.name + "<br>"
                              + newPost.content + "<br>" + thread.response.createdAt +
                          "<br>" + thread.response.comments + "<br>" + thread.response.likes);
      $('#posts').before(myString);
      // ISSUE: COMMENTS ARE ADDING BEFORE OTHERS, BUT IN SUBSEQUENT ORDER :(
    },
    // ADD ERROR HERE / FAILURE CASE HERE!!!!

    data: newPost

  }); //post login url
});








// RETRIEVE CURRENT POSTS ON THE DATABASE
