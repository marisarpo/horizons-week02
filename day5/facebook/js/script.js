// Verify login status
if (window.localStorage.getItem('token') == null) window.location.href = 'login.html';

// Helper Functions
// Credit: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParamByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getPageNumber() {
    var pageNum = getParamByName('page');
    if (pageNum === null || typeof parseInt(pageNum) !== 'number') pageNum = 1;
    return pageNum;
}

function getLikeText(likes) {
    var likedNames = [];
    var likedText = "";
    for (var i = 0; i < likes.length; ++i) {
        var name = likes[i].name;
        if (likes[i].id === window.localStorage.getItem('userId')) {
            likedNames.unshift("You");
            continue;
        }
        if (likedNames.length < 3) {
            likedNames.push(name);
        }
    }
    if (likedNames.length === 0) {
        likedText = "";
    } else if (likedNames.length === 1) {
        likedText = likedNames[0] + " liked this.";
    } else if (likedNames.length === 2) {
        likedText = likedNames[0] + " and " + likedNames[1] + " liked this.";
    } else if (likedNames.length === 3) {
        likedText = likedNames[0] + ", " + likedNames[1] + ", and " + likedNames[2] + " liked this.";
    } else {
        likedText = likedNames[0] + ", " + likedNames[1] + ", " + likedNames[2] + ", and ";
        likedText += (likedNames.length - 3) + " others liked this.";
    }
    return likedText;
}

function renderPost(post, $target) {
    var postTime = new Date(post.createdAt);
    var newPost = $(`
<div class="panel panel-primary post" id="${post._id}">
    <div class="panel-heading">
      <h3 class="panel-title post-author">${post.poster.name}</h3>
    </div>
    <div class="panel-body">
      <p class="small text-muted post-time">
        <em>Posted at ${postTime.toLocaleString()}</em>
      </p>
      <span class="post-content lead">${post.content}</span>
      <div class="text-right" style="margin: 10px">
        <b class="liked-users"></b>
        <button type="btn" class="like-button">
          <span class="glyphicon glyphicon-thumbs-up"></span> Like (<span class="post-like">${post.likes.length}</span>)</button>
        <button type="btn" class="reply-button">
          <span class="glyphicon glyphicon-send"></span> Reply (<span class="post-reply-count">${post.comments.length}</span>)</button>
      </div>
      <div class="post-reply-form collapse">
        <div class="col-md-8"></div>
        <div class="input-group col-md-4">
            <input type="text" class="form-control" placeholder="Reply here...">
            <span class="input-group-btn">
                <button class="btn btn-default reply-send" type="button">Send</button>
            </span>
        </div>
      </div>
      <div class="post-replies">
        <hr />
      </div>
    </div>
</div>
    `);

    // Render all comments
    var comments = post.comments;
    var $postReplies = newPost.find('.post-replies');
    if (comments.length === 0) $postReplies.empty();
    for (var i = comments.length - 1; i >= 0; --i) {
        var replyTime = new Date(comments[i].createdAt);
        var newComment = $(`
        <div class="reply">
            <span>${comments[i].poster.name}</span> - <span class="text-muted">${replyTime.toLocaleString()}</span>
            <p style="margin: 10px 10px 20px 10px; font-size: 1.1em">${comments[i].content}</p>
        </div>
        `);
        $postReplies.append(newComment);
    }

    // Check if the user liked this post already
    var likes = post.likes;
    var liked = false;
    for (var i = 0; i < likes.length; ++i) {
        if (likes[i].id === window.localStorage.getItem('userId')) {
            liked = true;
            break;
        }
    }

    if (liked) {
        newPost.removeClass('panel-primary');
        newPost.addClass('panel-success');
    }

    var likedText = getLikeText(likes);
    newPost.find('.liked-users').text(likedText);

    // Put this post inside
    $target.append(newPost);
}

function render() {
    $('.all-posts').html('<div class="text-center">Loading...</div>');
    var pageNum = getPageNumber();
    $.ajax({
        url: API_URL + POSTS_ENDPOINT + pageNum,
        method: "GET",
        data: {
            token: window.localStorage.getItem('token')
        },
        success: function (resp) {
            var allPosts = resp.response;
            var $allPostsElem = $('.all-posts');
            $allPostsElem.empty();
            for (var i = 0; i < allPosts.length; ++i) {
                renderPost(allPosts[i], $allPostsElem);
            }
            if (allPosts.length === 0) {
                $allPostsElem.html('<div class="text-center">Oops! Nothing here</div>')
            }
        },
        error: function (err) {
            alert('An error occurred');
        }
    });
}

$(document).ready(function () {
    // Load all posts
    render();

    // Automatically check new posts every 30 seconds
    setInterval(function() {
        render();
    }, 30000);
});

// Event Listeners
$('#logout_button').on('click', function() {
    $.ajax({
        url: API_URL + USERS_ENDPOINT + 'logout',
        method: "GET",
        data: {
            token: window.localStorage.getItem('token')
        },
        success: function(resp) {
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('token');
            window.location.href = "login.html";
        },
        error: function(err) {
            alert(err.responseJSON.error + " You may ask a TA for help.");
        }
    })
});

// New Post Functionality
$('#new-post-button').on('click', function() {
    $('.new-post').toggle();
});

$('#new-post-send').on('click', function() {
    var content = $('#new-post-input').val().trim();
    if (content.length === 0) {
        alert('Your post cannot be empty!');
        return;
    }
    $.ajax({
        url: API_URL + POSTS_ENDPOINT,
        method: "POST",
        data: {
            token: window.localStorage.getItem('token'),
            content: content
        },
        success: function() {
            render();
            $('#new-post-input').val('');
            $('.new-post').toggle();
        },
        error: function(err) {
            alert(err.responseJSON.error + " You may ask a TA for help.");
        }
    });
});

// Reply Functionality
$('.all-posts').on('click', '.reply-button', function() {
    $replyForm = $(this).closest('div').siblings('.post-reply-form');
    if ($replyForm.hasClass('collapse')) {
        $replyForm.removeClass('collapse');
    } else {
        $replyForm.addClass('collapse');
        $replyForm.find('input').val('');
    }
});

$('.all-posts').on('click', '.reply-send', function(e) {
    e.preventDefault();
    var $this = $(this);
    var content = $this.closest('span').siblings('input').val().trim();
    if (content.length === 0) {
        alert('Your reply cannot be empty!');
        return false;
    }
    var postId = $this.closest('.post').attr('id');
    $.ajax({
        url: API_URL + POSTS_ENDPOINT + 'comments/' + postId,
        method: "POST",
        data: {
            token: window.localStorage.getItem('token'),
            content: content
        },
        success: function() {
            render();
        },
        error: function(err) {
            alert(err.responseJSON.error + " You may ask a TA for help.");
        }
    });
});

// Liking Functionality
$('.all-posts').on('click', '.like-button', function(e) {
    e.preventDefault();
    var $thisPost = $(this).closest('.post');
    var postId = $thisPost.attr('id');
    var liked = $thisPost.hasClass('panel-success');
    var $likeCount = $thisPost.find('.post-like');
    $.ajax({
        url: API_URL + POSTS_ENDPOINT + 'likes/' + postId,
        method: "GET",
        data: {
            token: window.localStorage.getItem('token')
        },
        success: function(resp) {
            if (liked) {
                $likeCount.text(parseInt($likeCount.text()) - 1);
                $thisPost.removeClass('panel-success');
                $thisPost.addClass('panel-primary');
            } else {
                $likeCount.text(parseInt($likeCount.text()) + 1);
                $thisPost.removeClass('panel-primary');
                $thisPost.addClass('panel-success');
            }
            var likedText = getLikeText(resp.response.likes);
            $thisPost.find('.liked-users').text(likedText);
        },
        error: function(err) {
            alert(err.responseJSON.error + " You may ask a TA for help.");
        }
    });
});

// Pagination Functionality
$('.prev-page').on('click', function(e) {
    e.preventDefault();
    var pageNum = getPageNumber();
    if (pageNum == 1) return;
    pageNum--;
    window.location.href = "index.html?page=" + pageNum;
});

$('.next-page').on('click', function(e) {
    e.preventDefault();
    var pageNum = getPageNumber();
    pageNum++;
    window.location.href = "index.html?page=" + pageNum;
});
