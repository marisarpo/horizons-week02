"use strict";
$(document).ready(function() {
  //$('.registration').hide();
  //var firstLoad = true;

   //$('.login').hide();
   $('.allPosts').hide();
   $('.postposts').hide();
   $('.registration').hide();

  $('#registerReg').on('click', function(event){
    console.log('regRegclicked');
    event.preventDefault();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
      method: 'POST',
      success: function(){
        console.log("registered");
        $('.loginPg').show();
        $('.registration').hide();
        return true;
      },
      data: {
        fname: $('#firstName').val(),
        lname: $('#lastName').val(),
        email: $('#emailReg').val(),
        password: $('#passwordReg').val()
      }
    });
  });


  $('#loginLog').on('click', function(event){
    console.log('logLogclicked');
    event.preventDefault();
    console.log('d');
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
      method: 'POST',
      success: function(data){
        load();
        console.log("loginworks");
        localStorage.setItem('token', data.response.token);
        $('.registration').hide();
        $('.loginPg').hide();
        $('.allPosts').show();
        $('.postposts').show();
      },
      error: function(d){
        console.log($('#emailLog').val(),$('#passwordLog').val());
      },
      data: {
        email: $('#emailLog').val(),
        password: $('#passwordLog').val()
      }
    });
  });

  var load = function(){
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',
      method: 'GET',
      success: function(dat){
        $('.allPosts').text("");
        for (var i = 0; i < dat.response.length; i++) {
          var postObject = dat.response[i];
          //if (firstLoad){
          var htmlNew = "<div class = 'postWhole'><div class = 'origPost'><h3 class = 'postername'>"+postObject.poster.name+"</h3><p class = 'postdate'>" + (new Date(postObject.createdAt).toLocaleString())+ "</p><p class = 'postmessage'>"+ postObject.content +"</p></div><div class = 'replies'><h3>" + postObject.comments.length + " Replies, " + postObject.likes.length + " Likes </h3><div class = 'replylist'><p> Replier name </p><p> Time/Date </p><p> Reply message </p><p> Replier name </p><p> Time/Date </p><p> Reply message </p><button> Like! </button><button> Reply </button></div></div></div>";
          $('.allPosts').append(htmlNew);
        //}
        }
      //  firstLoad = false;
      },
      data: {
        token: localStorage.getItem('token')
      }
    })
  };
  load();


  $('#postBtn').on('click', function(event){
    event.preventDefault();
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
      method: 'POST',
      success: function(data){
        //console.log($('#postbox').val(),localStorage.getItem('token'));
        load();
        console.log("f",data);
      },
      data: {
        token: localStorage.getItem('token'),
        content: $('#postbox').val()
      }
    })
  });


  $('#registerinsideLog').on('click', function(event){
    //console.log('logclicked');
    console.log('reginsideLogclicked');
    event.preventDefault();
    $('.loginPg').hide();
    $('.registration').show();
    //$('.login').show();
  })
  $('#logininsideReg').on('click', function(event){
    //console.log('logclicked');
    console.log('loginsideRegclicked');
    event.preventDefault();

    $('.loginPg').show();
    $('.registration').hide();
  })
})
