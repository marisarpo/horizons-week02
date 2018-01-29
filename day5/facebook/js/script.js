"use strict";

var user_id;
var user_token;
var user_name = "User"; // can't actually access this after registration


$("#signup-button").on('click', function(event){
    event.preventDefault();
    $("#signup-modal").modal();
});
$("#login-button").on('click', function(event){
    event.preventDefault();
    $("#login-modal").modal();
});

$("#signup-submit").on("click", function(event){
    event.preventDefault();
    $("#signup-modal").modal("toggle");

    var first = $("#signup-firstName").val();
    var last = $("#signup-lastName").val();
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();
    register(first, last, email, password);
});


$("#login-submit").on("click", function(event){
    event.preventDefault();
    $("#login-modal").modal("toggle");    

    var email = $("#login-email").val();
    var password = $("#login-password").val();
    login(email, password);
});

$("#logout-button").on("click", function(event){
    event.preventDefault();
    logout();
});
$("#logged-in-button").on("click", function(event){
    event.preventDefault();    
});



$("#feed").on("click", ".like-button", function(event){
    event.preventDefault();

    var postDiv = $(this).closest(".post");
    var post_id = postDiv.attr("data-post-id");
    

    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${post_id}`, {
        data: {
            token: user_token,
        },
        method: "GET",
        success: function(data) {
            console.log(data);
            loadFeed(1);
        },
        error: function(response){
            console.log(response);
        }
    });

});
$("#feed").on("click", ".comment-button", function(event){
    event.preventDefault();
    
    var post = $(this).closest(".post");
    post.find(".comment-collapse").toggleClass("collapse");    
  
});

$("#feed").on("click", ".comment-submit", function(event){
    event.preventDefault();
    var postDiv = $(this).closest(".post");
    var comment_input = postDiv.find(".comment-input").val();

    var post_id = postDiv.attr("data-post-id");

    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${post_id}`, {
        data: {
            token: user_token,
            content: comment_input
        },
        method: "POST",
        success: function(data) {
            console.log(data);
            loadFeed(1);
        },
        error: function(response){
            console.log(response);
        }
    });

});

$("#post-submit").on("click", function(event){
    event.preventDefault();
    var content = $("#post-input").val();

    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts`, {
        data: {
            token: user_token,
            content: content
        },
        method: "POST",
        success: function(data) {
            console.log(data);
            loadFeed(1);
        },
        error: function(response){
            console.log(response);
        }
    });

});


function loadFeed(page_num)
{
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/${page_num}`, {
        data: {
          token: user_token,
        },
        method: "GET",
        success: function(data) {
            console.log(data);

            $("#feed").empty();
            $.each(data.response, function(key, post){
                let comments = populateComments(post.comments);
                let template = `<div class="post" data-post-id="${post._id}">
                    <h1>${post.poster.name}</h1>
                    <p>${post.content}</p>
                    <p>Posted <strong>${fixDate(post.createdAt)}</strong></p>
                    <a class="like-button" href="#"><span class="glyphicon glyphicon-thumbs-up"></span> Like (${post.likes.length})</a>
                    <a class="comment-button" href="#"><span class="glyphicon glyphicon-comment"></span> Comments</a>
                
                    <div class="comment-collapse">${comments}
                        <input type="text" class="form-control comment-input" placeholder="Enter Your Comment Here!">
                        <button type="button" class="btn btn-primary comment-submit">Post</button>
                    </div>
                
                </div>`;
                $("#feed").append(template);
            });

        },
        error: function(response){
            console.log(response);
        }
    });


}

function register(firstName, lastName, email, password)
{
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/users/register`, {
        data: {
            fname: firstName,
            lname: lastName,
            email: email,
            password: password
        },
        method: "POST",
        success: function(data) {
            console.log(data);
            user_name = firstName;
            login(email, password);
        },
        error: function(response){
            console.log(response);
        }
    });
}


function login(email, password)
{
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/users/login`, {
        data: {
            email: email,
            password: password
        },
        method: "POST",
        success: function(data) {
            console.log(data);
            user_id = data.response.id;
            user_token = data.response.token;
            loadFeed(1);

            signedIn();
        },
        error: function(response){
            console.log(response);
        }
    });
}

function logout()
{
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/users/logout`, {
        data: {
            token: user_token
        },
        method: "GET",
        success: function(data) {
            console.log(data);
            $("#feed").empty();
            signedOut();
        },
        error: function(response){
            console.log(response);
        }
    });
}


function populateComments(comments)
{
    var comment_str = "";
    $.each(comments, function(i, comment){
        let name = comment.poster.name;
        let id = comment.poster.id;
        let date = comment.createdAt;
        let content = comment.content;
        comment_str += `<div class="comment" data-class-id="${id}">
            <h3>${name}</h3><p>${content}</p>   
            <small>Posted <strong>${fixDate(date)}</strong></small>    
        </div>`;
    });
    return comment_str;
}

function signedIn()
{
    $("#logged-in-button").show();
    $("#logout-button").show();
    $("#login-button").hide();
    $("#signup-button").hide();
    
    $("#logged-in-button").children().eq(0).text(`Welcome, ${user_name}!`);    

    // socket stuff
    // var socket = io.connect('https://horizons-facebook.herokuapp.com/');
    // socket.emit('authentication', {'token': user_token});
    // socket.emit('authentication', {'token': localStorage.getItem('token') });
    // io.emit('tweet', 'tweet');
}

function signedOut()
{
    $("#logged-in-button").hide();
    $("#logout-button").hide();
    $("#login-button").show();
    $("#signup-button").show();
}


$("#logged-in-button").hide();
$("#logout-button").hide();


// login("taav.kujira@gmail.com","orenobandana");
login("wazy@sss.gov", "madamada");

$("#login-email").val("wazy@sss.gov");
$("#login-password").val("madamada");

setInterval(function(){
    loadFeed(1);
    console.log("Refreshed");
}, 60000);


var someDate = new Date();
function fixDate(date){

    return moment(date).fromNow();
}


