"use strict";

$('#registration').hide()

var getPosts;
//LOGIN BUTTON EVENT HANDLER
$('button[name=login]').click(function() {

  //Saving user info to data object
  var dataObj = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  }

  $.ajax({
    method: 'POST',
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    data: dataObj,
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      $('#login-form').addClass('.hide');
      $('#login-form').hide();
      getPosts();
    },
    error: function() { console.log("error")}

  })
})

$('button[name=register]').click(function() {
  $('#login-form').hide();
  $('#registration').show();
})

$('button[name=complete]').click(function() {

  //User information
  var dataObj = {
    fname: $('input[name=firstName]').val(),
    lname: $('input[name=lastName]').val(),
    email: $('input[name=emailR]').val(),
    password: $('input[name=passwordR]').val()

  }

  //Send post request to register
  $.ajax({
    method: 'POST',
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    data: dataObj,
    success: function() {
      console.log("registered");
      $('#login-form').show();

    },
    error: function() {
      console.log("sows u can't sit with us");
    }
  })

})

//Load posts after a successful login
getPosts = function() {
  $('.landing-page').hide();
  $('.posts').show();

  $.ajax({
    method: 'GET',
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      console.log(data);

      //Get the shows and append them
      var recentPosts = function(response) {
        return `<div class="post">
        <h2>${response.poster.name}</h2>
        <h3>${response.createdAt}</h3>
        <p>${response.content}</p>
        </div>`;
      }

      $('.post-container').append(data.response.map(recentPosts));

    }
  })



}



//Back to log in event handler
$('button[name=back-to-register]').click(function() {
  $('#login-form').show();
  $('#registration').hide();
})
