var posts = {};

// slight performance hit but it makes more sense to do this in js
$(document).ready(function() {
    $("#login_form").hide();
    $("#logged_in_div").hide();
    if (localStorage.getItem("token")) {
        $("#register_form").hide();
        $("#logged_in_div").show();
    }
    populateNewsFeed();
    setInterval(populateNewsFeed, 30000);
});

function toggleActiveForm() {
    $("#register_form").toggle();
    $("#login_form").toggle();
}

function formatDate(date) {
    return (new Date(date)).toLocaleString("en-US");
}

function getCommentsDiv(post) {
    var commentsDiv = $("<div class='comments_container'></div>");

    var replyLikeInfo = `
        <h3 class="reply_likes_info">${post.comments.length} Replies, ${post.likes.length} Likes</h3>
    `;
    var replyLikeBtnGroup = `
        <div class="btn_group">
            <input type="button" value="👍" onclick="likePost('${post._id}')" />
            <input type="button" value="Reply" onclick="reply('${post._id}')" />
        </div>
    `;

    commentsDiv.append(replyLikeInfo);
    $.each(post.comments, function(i, postReply) {
        var postReplyDiv = $("<div></div>").addClass("post_reply");
        var nameText = $("<i></i>");
        nameText.html(postReply.poster.name + ": <small>" + formatDate(postReply.createdAt) + "</small>");
        var br = $("<br />");
        var contentText = $("<p></p>").text(postReply.content);
        commentsDiv.append("<br />");
        postReplyDiv.append(nameText);
        postReplyDiv.append(br);
        postReplyDiv.append(contentText);
        commentsDiv.append(postReplyDiv);
    });
    commentsDiv.append(replyLikeBtnGroup);
    return commentsDiv;
}

function populateNewsFeed() {
    if (!("token" in localStorage)) return;
    posts = [];
    var newsFeed = $("#news_feed");
    $.ajax({
        type: "GET",
        url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
        data: {
            token: localStorage.token,
        },
        success: function(data) {
            newsFeed.empty();
            $.each(data.response, function(i, post) {
                var nfItem = $("<div></div>").addClass("nf_item");
                var nfItemPost = $("<div></div>").addClass("post");
                var nameText = $("<h3></h3>").text(post.poster.name);
                var br = $("<br />");
                var timestampText = $("<i></i>").text(formatDate(post.createdAt));
                var contentText = $("<p></p>").text(post.content);
                var hr = $("<hr />");

                var commentsDiv = getCommentsDiv(post);

                nfItem.append(nfItemPost.append(nameText).append(br)
                      .append(timestampText).append(contentText)
                      .append(hr).append(commentsDiv));
                newsFeed.append($("<div></div>").addClass("spacer").append(nfItem));
                posts[post._id] = nfItem;
            });
        },
    });
}

function register() {
    var firstName = $("#register_form .fn_in").val();
    var lastName = $("#register_form .ln_in").val();
    var email = $("#register_form .em_in").val();
    var password = $("#register_form .pw_in").val();
    $.ajax({
        type: "POST",
        data: {
            "fname": firstName,
            "lname": lastName,
            "email": email,
            "password": password,
        },
        url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
        success: function(data) {
            if (data.success) {
                toggleActiveForm();
            }
        },
        error: function(data) {
            console.log(data);
        },
    });
}

function login() {
    var firstName = $("#login_form .fn_in").val();
    var lastName = $("#login_form .ln_in").val();
    var email = $("#login_form .em_in").val();
    var password = $("#login_form .pw_in").val();
    $.ajax({
        type: "POST",
        data: {
            "email": email,
            "password": password,
        },
        url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
        success: function(data) {
            localStorage.setItem("token", data.response.token);
            $("#login_form").hide();
            $("#logged_in_div").show();
            populateNewsFeed();
        },
        error: function(data) {
            console.log(data);
        },
    });
}

function likePost(postId) {
    $.ajax({
        type: "GET",
        url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/" + postId,
        data: {
            token: localStorage.token,
        },
        success: function(data) {
            updatePost(postId, data);
        },
    });
}

function reply(postId) {
    var postDiv = $("<div></div>");
    var textArea = $("<textarea></textarea>");
    var submitButton = $("<input type='button' value='Submit'></input>");
    posts[postId].append(postDiv.append(textArea).append(submitButton));
    submitButton.on("click", function() {
        $.ajax({
            type: "POST",
            url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/" + postId,
            data: {
                token: localStorage.token,
                content: textArea.val(),
            },
            success: function(data) {
                updatePost(postId, data);
                postDiv.remove();
            }
        });
    });
}

function updatePost(postId, data) {
    posts[postId].find(".reply_likes_info")
                 .text(`${data.response.comments.length} Replies,
                        ${data.response.likes.length} Likes`);
    var commentsDiv = getCommentsDiv(data.response);
    posts[postId].find(".comments_container").replaceWith(commentsDiv);
}

function logout() {
    $.ajax({
        type: "GET",
        url: "https://horizons-facebook.herokuapp.com/api/1.0/users/logout",
        data: {
            token: localStorage.token,
        },
        success: function() {
            delete localStorage.token;
            $("#logged_in_div").hide();
            $("#login_form").show();
            $("#register_form").hide();
        },
    });
}
