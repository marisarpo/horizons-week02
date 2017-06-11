"use strict";

// aaa@gmail.com
//
// aaa
//
// id
// :
// "593b2a71ca9cff0011dfbf27"
// token
// :
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFhYUBnbWFpbC5jb20ifQ.o5fcniS9jriq9DERiVfuLJ0TT2aoylDoqlii7XuzLxA"



function Facebook(){

  //set up registration
  this.register();
  console.log("Facebook is ready.");
}

Facebook.prototype = {

  register: function(){
    var app = this;
    $("#register-button").on('click',function(event){
      event.preventDefault();
      var fname = $(".registration #firstname").val();
      var lname = $(".registration #lastname").val();
      var email = $(".registration #new-username").val();
      var password = $(".registration #new-password").val();
      $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
        method: "POST",
        success: function(data){

        },
        data: {
          fname: fname,
          lname: lname,
          email: email,
          password: password
        },
        error: function(err){
          console.log("ERROR!!!!!")
        }
      })
      $("form").toggleClass("hide");
    })

    $("#go-to-login").on('click',function(event){
      event.preventDefault();
      $("form").toggleClass("hide");
    });

    $("#go-to-register").on('click',function(event){
      event.preventDefault();
      $("form").toggleClass("hide");
    });

    $("#login-button").on('click',function(event){
      event.preventDefault();
      var email = $(".login #username").val();
      var password = $(".login #password").val();
      $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
        method: "POST",
        success: function(data){
          localStorage.setItem('token', data.response.token);
          $("section").toggleClass("hide");
          $(".logout-button").toggleClass("hide");
          app.newsfeed(localStorage.getItem('token'));
        },
        data: {
          email: email,
          password: password
        },
        error: function(err){
          alert("Invalid email or password.")
          console.log("ERROR!!!!!")
        }
      })
    })
  },

  newsfeed: function(tokenString){
    console.log("new feed");
    var pageNum = 5
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/"+pageNum,
      method: "GET",
      data: {
        token: tokenString
      },
      success: function(data){
        for(var i = 0; i<(pageNum*10); i++){
          var obj = data.response[i];
          if(typeof obj === 'undefined'){
            continue;
          }
          var username = obj.poster.name;
          var message = obj.content;
          var time = obj.createdAt;
          var numLikes = obj.likes.length;
          var arrComments = obj.comments;
          var message_id = obj._id;
          var htmlStr = '<div class="card-block" id="'+message_id+'"> <strong class="card-title">'+username+'</strong> <h6 class="card-subtitle mb-2 text-muted">'+time+'</h6> <p class="card-text">'+message+'</p> <div class="like-box"> <p class="num-likes">'+numLikes+'</p> <button class="btn btn-success like-button">Like</button> </div> <p class="col-xs-offset-5">'+arrComments.length+' Reply &nbsp<button class="btn btn-primary reply-button">Show Replies</button></p> <div class="replies hide"> <div class="user-input"> <input class="reply-message" placeholder="your reply here..."></input> <button class="btn btn-success input-button">Enter</button> </div>'
          arrComments.forEach(function(item){
            htmlStr += ' <div class="reply"> <strong>'+item.poster.name+'</strong> says: <p >'+item.content+'</p> </div>'
          })
          htmlStr +='</div>'
          $(".newsfeed .card").append(htmlStr)
        }
      }
    });
    //new post
    $(".newsfeed").on('click','.post-button',function(event){
      event.preventDefault();
      var userinput = $(this).siblings('.new-message').val();
      $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
        method: "POST",
        data:{
          token: tokenString,
          content: userinput
        },
        success: function(data){
          var obj = data.response;
          var username = obj.poster.name;
          var message = obj.content;
          var time = obj.createdAt;
          var numLikes = obj.likes.length;
          var arrComments = obj.comments;
          var message_id = obj._id;
          var htmlStr = '<div class="card-block" id="'+message_id+'"> <strong class="card-title">'+username+'</strong> <h6 class="card-subtitle mb-2 text-muted">'+time+'</h6> <p class="card-text">'+message+'</p> <div class="like-box"> <p class="num-likes">'+numLikes+'</p> <button class="btn btn-success like-button">Like</button> </div> <p class="col-xs-offset-5">'+arrComments.length+' Reply &nbsp<button class="btn btn-primary reply-button">Show Replies</button></p> <div class="replies hide"> <div class="user-input"> <input class="reply-message" placeholder="your reply here..."></input> <button class="btn btn-success input-button">Enter</button> </div>'
          $(".newsfeed .card").children().eq(0).after(htmlStr);
        }
      })
    })
    //show replies
    $(".newsfeed").on('click','.reply-button',function(event){
      event.preventDefault();
      $(this).closest(".card-block").find(".replies").toggleClass("hide");
    })
    //reply to post
    $(".newsfeed").on('click','.input-button',function(event){
      event.preventDefault();
      var userinput = $(this).closest(".user-input").find(".reply-message").val();
      var messageid = $(this).closest(".card-block").attr('id');
      var button = this;
      $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/"+messageid,
        method: "POST",
        data: {
          token: tokenString,
          content: userinput
        },
        success: function(data){
          var htmlStr = '<div class="reply"> <strong>You</strong> say: <p >'+userinput+'</p> </div>';
          $(button).closest('.replies').append(htmlStr);
        }
      })
    })
    //like a post
    $(".newsfeed").on('click','.like-button',function(event){
      event.preventDefault();
      var messageid = $(this).closest(".card-block").attr('id');
      var button = this;
      $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/"+messageid,
        method: "GET",
        data: {
          token: tokenString
        },
        success: function(data){
          console.log("click succeed?")
          $(button).toggleClass("btn-success");
          $(button).closest('.card-block').find(".num-likes").text(data.response.likes.length)
        }
      })
    })

    //logout
    $(".logout-button").on("click", function(event){
      event.preventDefault();
      $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
        method: "GET",
        data: {
          token: tokenString
        },
        success:function(data){
          console.log("Logged Out");
          $("section").toggleClass("hide");
          $(".logout-button").toggleClass("hide");
        }
      })
    })
  }
}

window.facebook = new Facebook();
