$('#login-container').toggle("collapse");
$('#make-post').toggle("collapse");
$('#go-to-login').on("click", function(event) {
 console.log('clicked go to login');
 event.preventDefault();
 $('#registration-container').toggle("collapse");
 $('#login-container').toggle("collapse");
});
$('#register').on("click", function(event) {
    event.preventDefault();
    console.log('printing');
    var fname = $('#fname').val();
    console.log("fname", fname);
    var lname = $('#lname').val();
    console.log(lname);
    var email = $('#email').val();
    console.log(email);
    var password = $('#password').val();
    console.log(password);
    var config = {}
    console.log('clicked');
    $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/register", {
        type: 'POST',
        data: {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
        },
        success: function(data) {
            console.log(data);
            $('#registration-container').toggle("collapse");
            $('#login-container').toggle("collapse");
        },
        error: function(err) {
            console.log(err);
        }
    });
});
$('#login-login').on("click", function(event) {
    $('.registration-container').hide();
    event.preventDefault();
    console.log('printing');
    var emailLogin = $('#email-login').val();
    console.log("email login", emailLogin);
    var passwordLogin = $('#password-login').val();
    console.log('password login', passwordLogin);
    var config = {}
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
        type: 'POST',
        success: function(data) {
            // data will be the response data that is
            // returned by the endpoint. use this to
            // access the token for future authorization.
            // data.response.token will give you access
            // to the AUTH_TOKEN
            localStorage.setItem("token", data.response.token);
            var token = data.response.token;
            console.log('data', data);
            update();
            },
              error: function(err) {
            console.log(err);
            },
            data: {
            email: emailLogin,
            password: passwordLogin
            }
        })
})
function update(){
        $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:1', {
                type: 'GET',
                data: {
                    token: localStorage.getItem("token")
                },
                success: function(data) {
                    // data will be the response data that is
                    // returned by the endpoint. use this to
                    // access the token for future authorization.
                    // data.response.token will give you access
                    // to the AUTH_TOKEN
                    console.log('data', data);
                    $('#login-container').toggle("collapse");
                    $('#make-post').toggle("collapse");
                    // successfully log in.
                    // likes array
                    console.log('response', data.response);
                    // dissect the data object.
                    data.response.forEach(function(obj){
                        addComment(obj);
                    })
                },
                error: function(err) {
                    console.log(err);
                },

            });
        }

function addComment(obj){
    console.log('obj', obj);
    var numOfComments = obj["comments"].length;
    var content = obj["content"];
    var createdAt = obj["createdAt"];
    var numOfLikes = obj["likes"].length;
    var poster = obj["poster"];
    console.log('poster', poster);
    var id = obj["id"];
    var newPost = `<div class="post" id="post-object">
    <div class="post-content">
      <div class="post-name">${poster["name"]}</div>
    <div class="post-time">${createdAt}</div>
    <div class="post-post">${content}</div>
    <div class="post-replies">
    <div class="post-reply">${numOfComments} Replies    ${numOfLikes} Likes</div>
    <button id="like-button" class="btn btn-default post-button">Like button</button>
    <button id="reply-button" class="btn btn-default post-button">Reply button</button>
    </div>
    </div>`
    $('#all-posts').prepend(newPost);
}
$('#dummy').on("click", function(event) {
    event.preventDefault();
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
        type: 'GET',
        success: function(data) {
            // data will be the response data that is
            // returned by the endpoint. use this to
            // access the token for future authorization.
            // data.response.token will give you access
            // to the AUTH_TOKEN
            console.log('data', data);
        },
        error: function(err) {
            console.log(err);
        },
    });
});
$("#publish-post").click(function(){
    event.preventDefault();
    console.log('clicked published');
    console.log(localStorage.getItem('token'));
    console.log($('#comment').val());
    $.ajax({
        data: {
            token: localStorage.getItem("token"),
            content: $('#comment').val()
        },
        type: 'POST',
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
        success: function(data){
            // refresh board
            console.log('Comment posted!');
            // $('#registration-container').toggle('collapse');
            // $('#all-posts').toggle('collapse');
            console.log(data);
            addComment(data.response);

        },
        error: function(err){
            console.log(err);
        }
    })
})
$("#logout-button").click(function(){
    $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/users/logout",
        data:{
            token: localStorage.getItem("token")
        },
        success: function(){
            localStorage.removeItem("token");
             $('#registration-container').toggle("collapse");
             $('#all-posts').toggle("collapse");
             $('#make-post').toggle('collapse');
            console.log("You've logged out!");
        },
        error: function(err){
            console.log(err);
        }
    })
})
// setInterval(update, 3000);
