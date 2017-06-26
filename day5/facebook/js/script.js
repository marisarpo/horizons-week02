$(document).ready(function() {
    $('#reg_page').show();
    $('#login_page').hide();
    $('#posts_page').hide();
    $('.logout').css('visibility', 'hidden');
    register();

});

// REGISTRATION PAGE
function register() {
    $('#reg_page').children('button').eq(0).on('click', function() { // access Register button
        var first_name = $('#reg_page').children(".fname").val()
        var last_name = $('#reg_page').children(".lname").val()
        var email = $('#reg_page').children(".email").val()
        var password = $('#reg_page').children(".password").val()
        $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
            method: 'POST',
            success: function(data) {
                return true
            },
            data: {
                fname: first_name,
                lname: last_name,
                email: email,
                password: password
            },
            error: function(err) {
                return "Incomplete register definition"
            }
        })
    })

    $('#reg_page').children('button').eq(1).on('click', function() { // access Go to Login button
        $('#reg_page').hide();
        $('#login_page').show();
        login();
    })
}

// LOGIN PAGE
function login() {
    $('#login_page').children('button').eq(0).on('click', function() { // access Login button
        var email = $('#login_page').children(".email").val()
        var password = $('#login_page').children(".password").val()
        $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
            method: 'POST',
            success: function(data) {
                $('#posts_page').show();
                $('#login_page').hide();
                $('.logout').css('visibility', 'visible');
                post()
                newPost();
                comment();
                localStorage.setItem('token', data.response.token);
                return true
            },
            data: {
                email: email,
                password: password
            },
            error: function(err) {
                return "Login failed"
            }
        })

    })

    $('#login_page').children('button').eq(1).on('click', function() { // access Go to Registration button
        $('#login_page').hide();
        $('#reg_page').show();

    })
}

// LOGOUT
function logout() {
    $('.logout').on('click', function() {
        $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/logout', {
            method: 'GET',
            success: function(data) {
                return true
            },
            data: {
                token: localStorage.getItem('token')
            },
            error: function(err) {
                return "Logout failed"
            }
        })
    })

}

// POSTS
function parsePostArray(postArray) {
    var responseArray = postArray.response
    responseArray.forEach(function(post) {
        postAdd(post, false) // false for not a new post
        var postID = post._id
        var commentsObject = post.comments
        var likesObject = post.likes
        var commentCount = commentsObject.length
        $(`#${postID}`).find('#comment_count').text(`${commentCount} comments`)
        parseComment(commentsObject, postID);
        parseLikes(likesObject);
    })
}

function parseComment(commentsObj, postID) {
    var commentCount = commentsObj.length
    if (!(commentCount === 0)) {
           commentsObj.forEach(function(comment) {
              addComment(comment, postID)
           })
    }
}

function addComment(comment, postID) {
    var commentTimestamp = new Date(comment.createdAt)
    var commentContent = comment.content
    var commenterArray = comment.poster.name.split(" ")
    var commenterFirstName = commenterArray[0]
    var commenterLastName = commenterArray[1]
    $(`#${postID}`).find('#reply_thread').append(`
        <div id = "comment">
            <div id = "comment_username">${commenterFirstName} ${commenterLastName}</div>
            <div id = "comment_timestamp">${commentTimestamp}</div>
            <div id = "comment_message">${commentContent}</div>
        </div>
    `)
}

function parseLikes(likesObj) {
    if (!(likesObj.length === 0)) {
        var likeCount = likesObj.length
        $('#like_count').text(`${likeCount} likes`)
    }
}

function post() {
    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
        method: 'GET',
        success: function(data) {
            parsePostArray(data)
            update()
        },
        data: {
            token: localStorage.getItem('token')
        },
        error: function(err) {
            return "Retrieving posts failed"
        }
    })
}

// POSTING POSTS
function newPost() {
    $('#new_post').children('button').on('click', function() {
        var new_content = $('#new_post').children('textarea').val()
        $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
            method: 'POST',
            success: function(data) {
                var responseArray = data.response
                postAdd(responseArray, true)
            },
            data: {
                token: localStorage.getItem('token'),
                content: new_content
            },
            error: function(err) {
                alert("Posting a post failed!")
                return err
            }
        })
    })

}

function postAdd(post, isNewPost) {
    var postID = post._id
    var posterNameArray = post.poster.name.split(" ")
    var posterFirstName = posterNameArray[0]
    var posterLastName = posterNameArray[1]
    var postMessage = post.content
    var postTimestamp = new Date(post.createdAt)
    var newHTML = (`<div id = "${postID}" class = "post_all">
        <div  class = "post">
            <div id = "post_username">${posterFirstName} ${posterLastName}</div>
            <div id = "post_timestamp">${postTimestamp}</div>
            <div id = "post_message">${postMessage}</div>
            <div id = "post_buttons">
                <textarea type = "text" rows="2" cols="50" placeholder = "Comment on this thing"></textarea></br>
                <button type="button" id = "comment_button">Comment</button>
                <button type="button" id = "like_button">Like</button>
            </div>
        </div>
        <div id = "reply_count">
            <span id = "comment_count">0 comments</span>
            <span id = "like_count">0 likes</span>
        </div>
        <div id = "reply_thread">
            <div id = "comment">
                <div id = "comment_username"></div>
                <div id = "comment_timestamp"></div>
                <div id = "comment_message"></div>
            </div>
        </div>
    </div>
    `)
    if (isNewPost) {
        $('#newsfeed').prepend(newHTML)
    }
    else {
        $('#newsfeed').append(newHTML)
    }
}

function comment() {
    $('body').on('click', '#comment_button', function() {
        var new_comment = $(this).siblings('textarea').val()
        var postID = $(this).parent().parent().parent().attr('id')
        $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${postID}`, {
            method: 'POST',
            success: function(data) {
                var commentsObj = data.response.comments
                console.log(commentsObj);
                commentsObj.forEach(function(comment) {
                    addComment(comment)
                })
            },
            data: {
                token: localStorage.getItem('token'),
                content: new_comment
            },
            error: function(err) {
                alert("Posting a comment failed!")
                return err
            }
        })
    })
}

function update() {
    setInterval(function() {
        $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
            method: 'GET',
            success: function(data) {
                if (data) {
                    return true
                }
            },
            data: {
                token: localStorage.getItem('token')
            },
            error: function(err) {
                return "Retrieving posts failed"
            }
        })
        }, 30000)
}
