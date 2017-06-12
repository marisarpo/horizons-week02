"use strict";
$(document).ready(function() {
  // $('.posts').hide();

  $('#register').on('click',function(){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
      method: 'POST',
      success: function() {
        return true;
      },
      data: {
        fname: $('#firstname').val(),
        lname: $('#lastname').val(),
        email: $('#usernameregistration').val(),
        password: $('#passwordregistration').val()
      }
    });
  })

  $('#login').on('click',function(){
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
      method: 'POST',
      success: function(data) {
        console.log(data);
        localStorage.setItem('token', data.response.token)
        localStorage.setItem('id', data.response.id)
      },
      data: {
        // email: $('#username').val(),
        // password: $('#password').val()
        email: 'danhuizzz@gmail.com',
        password: '123456'
      }
    });
    $('#loginPage').hide();
    $('#registrationPage').hide();
    $('#listposts').show();

    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
      // method: 'GET',
      data:{
        token: localStorage.getItem('token')
      },
      success: function(data) {
        console.log(data);
        data.response.forEach(function(post){
          var author = post.poster.name;
          var a = new Date(post.createdAt);
          var time = a.toString();
          var content = post.content;
          var numLikes = post.likes.length;
          var repliesArr = post.comments;
          var numReplies = repliesArr.length;
          var postId = post._id;
          var myId = localStorage.getItem('id');
          console.log(time, author, postId);
          var likedByMe = false;
          post.likes.forEach(function(liker) {
            var likerId = liker.id;
            if (myId.indexOf(likerId) > -1) {
              likedByMe = true;
            }
          })
          // console.log("state of likedByMe", likedByMe);
          if(likedByMe){
            $('#listposts').append(`<div class="entry" id="${postId}">
            <script>$(document).ready(function(){$(".show-replies").hide();})</script>
            <div class="author"><span class="glyphicon glyphicon-user"></span> ${author}</div>
            <div class="time">${time}</div>
            <div class="message">${content}</div>
            <div class="replycount">${numReplies} replies</div><div class="likecount col-sm-offset-2 col-md-offset-2 col-lg-offset-2"><span>${numLikes}</span> likes</div>
            <div class="controls">
            <button class="hide-replies btn btn-default">Hide Replies</button>
            <button class="show-replies btn btn-default">Show Replies</button>
            <button class="reply btn btn-default">Reply</button>
            <button class="like liked"><span class="glyphicon glyphicon-thumbs-up"></span></button>
            </div>
            <input name="reply" placeholder=" Your reply" class="replyinput" type="text">
            <div class="replies"></div></div>`);
          } else {
            $('#listposts').append(`<div class="entry" id="${postId}">
            <script>$(document).ready(function(){$(".show-replies").hide();})</script>
            <div class="author"><span class="glyphicon glyphicon-user"></span> ${author}</div>
            <div class="time">${time}</div>
            <div class="message">${content}</div>
            <div class="replycount">${numReplies} replies</div><div class="likecount col-sm-offset-2 col-md-offset-2 col-lg-offset-2"><span>${numLikes}</span> likes</div>
            <div class="controls">
            <button class="hide-replies btn btn-default">Hide Replies</button>
            <button class="show-replies btn btn-default">Show Replies</button>
            <button class="reply btn btn-default">Reply</button>
            <button class="like"><span class="glyphicon glyphicon-thumbs-up"></span></button>
            </div>
            <input name="reply" placeholder=" Your reply" class="replyinput" type="text">
            <div class="replies"></div></div>`);
          }

          repliesArr.forEach(function(reply){
            var author2 = reply.poster.name;
            // var time2 = reply.createdAt;
            var a = new Date(reply.createdAt);
            var time2 = a.toString();
            var content2 = reply.content;
            $('#'+postId).children('.replies').append(`<div class="entry">
            <div class="author"><span class="glyphicon glyphicon-user"></span> ${author2}</div>
            <div class="time">${time2}</div>
            <div class="message">${content2}</div></div>`)
            console.log("replies for", author, "by ", author2, time2, content2);
          })

        })
      }
    });
  })

  $('#gotologin').on('click',function(){
    $('#registrationPage').hide();
    $('#loginPage').show();
  })

  $('#gotoregistration').on('click',function(){
    $('#loginPage').hide();
    $('#registrationPage').show();
  })

  $('.show-replies').hide();

  $('.post').on('click',function(){
    var response = $('textarea').val();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
      method: 'POST',
      success: function(data) {
        console.log(data);
        var author = data.response.poster.name;
        var timeO = data.response.createdAt;
        var a = new Date(timeO);
        var time = a.toString();
        var content = data.response.content;
        var numLikes = data.response.likes.length;
        var repliesArr = data.response.comments;
        var numReplies = repliesArr.length;
        var postId = data.response._id;
        $("#listposts").append(`<div class="entry" id="${postId}">
        <script>$(document).ready(function(){$(".show-replies").hide();})</script>
        <div class="author"><span class="glyphicon glyphicon-user"></span> ${author}</div>
        <div class="time">${time}</div>
        <div class="message">${content}</div>
        <div class="replycount">${numReplies} replies</div><div class="likecount col-sm-offset-2 col-md-offset-2 col-lg-offset-2"><span>${numLikes}</span> likes</div>
        <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
        <button class="like"><span class="glyphicon glyphicon-thumbs-up"></span></button>
        </div>
        <input name="reply" placeholder=" Your reply" class="replyinput" type="text">
        <div class="replies"></div></div>`);
      },
      data: {
        token: localStorage.getItem('token'),
        content: response
      }
    });
  })

  $('#listposts').on('click','.hide-replies',function(){
    $(this).parent().parent().children('.replies').hide();
    $(this).hide();
    $(this).parent().children('.show-replies').show();
  })

  $('#listposts').on('click','.show-replies',function(){
    $(this).parent().parent().children('.replies').show();
    $(this).hide();
    $(this).parent().children('.hide-replies').show();
  })


  //Like an existing post
  $('#listposts').on('click','.like',function(){
    var postId = $(this).closest('.entry').attr('id');
    // console.log("likes worked?", postId);
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/'+postId, {
      method: 'GET',
      success: function(data) {
        var likeCount = data.response.likes.length;
        console.log($(this));
        $(this).parent().siblings('.likecount').children('span').text(likeCount);
        $(this).toggleClass('liked');
      }.bind(this),
      data: {
        token: localStorage.getItem('token'),
      }
    });
  })

  //Comment on an existing post
  $('#listposts').on('click','.reply',function(){
    var postId = $(this).closest('.entry').attr('id');
    var reply = $(this).parent().siblings('.replyinput').val();
    if(reply === ''){
      alert("Reply content is Empty!");
    } else {
      $(this).parent().siblings('.replyinput').val('');
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/'+postId, {
        method: 'POST',
        success: function(data) {
          var item = data.response.comments[data.response.comments.length-1];
          var author2 = item.poster.name;
          var time = item.createdAt;
          var timeConv = new Date(time);
          var time2 = timeConv.toString();
          var content2 = item.content;
          $('#'+postId).children('.replies').append(`<div class="entry">
          <div class="author"><span class="glyphicon glyphicon-user"></span> ${author2}</div>
          <div class="time">${time2}</div>
          <div class="message">${content2}</div></div>`)
        },
        data: {
          token: localStorage.getItem('token'),
          content: reply
        }
      });
    }
  })


})
