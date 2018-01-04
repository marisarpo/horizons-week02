function loadNewsFeed(pageCount) {
  $('.loginForm').hide();
  $('.newsfeedPage').show();

  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/' + pageCount,
    data: {
      token: localStorage.getItem('token')
    },
    method: "GET",
    success: function(resp) {
      console.log('da resp is ', resp);
      $('.comment-box').empty();
      renderHtml(resp);
    },
    error: function(err) {
      console.log('there is an error: ', err);
    }
  })
}

function renderHtml(data) {
  console.log('renderHtml Data', data);
  data.response.forEach(function(comment) {
    // console.log('Comment!', comment);
    //extract relevent data from data param
    var momentTime = moment(comment.createdAt);
    var timeString = convertTime(momentTime);
    var commenterName = comment.poster.name;
    var commentContent = comment.content;
    var commentTime = comment.createdAt;
    var likesCount = comment.likes.length;
    var repliesCount = comment.comments.length;
    var postId = comment._id;
    var postsLikers = comment.likes;
    var iLiked = false;
    var myId = localStorage.getItem('id');

    postsLikers.forEach(function(likers) {
        if(likers.id === myId) {
          iLiked = true;
        }
      })


    //create html elements for each relevant data piece
    var nameHtml = $('<p>').text(commenterName);
    var contentHtml = $('<p>').text(commentContent);
    var timeHtml = $('<p>').text(timeString);
    var likesHtml = $('<a>').text(likesCount + ' Likes');
    var repliesHtml = $('<a>').text(repliesCount + ' Replies');
    var likeButtonHtml = $('<i>');
    var postIdHtml = $('<p>').text('id: ' + postId);

    //give html elements their classes
    nameHtml.addClass('commenter-name');
    contentHtml.addClass('comment-content');
    timeHtml.addClass('comment-time');
    likesHtml.addClass('comment-like-count');
    repliesHtml.addClass('comment-reply-count');
    if (iLiked) {
      likeButtonHtml.addClass('fa fa-thumbs-up comment-like-button');
    } else {
      likeButtonHtml.addClass('fa fa-thumbs-o-up comment-like-button');
    }
    postIdHtml.addClass('post-id');

    //append html to new comment html
    var newComment = $('<div>');
    newComment.append(nameHtml);
    newComment.append(contentHtml);
    newComment.append(timeHtml);
    newComment.append(likesHtml);
    newComment.append(repliesHtml);
    newComment.append(likeButtonHtml);
    newComment.append(postIdHtml);
    newComment.addClass('singleComment')
    $('.comment-box').append(newComment)
  })
}

function initialize() {
  if (localStorage.getItem('token')) {
    $('.registrationForm').hide();
    loadNewsFeed( pageCount = 1 );
  }

  $('.fluid-container').on('click', '#regPageRegisterButton', function(event) {
    event.preventDefault();
    console.log('clicked!');
    var firstName = $(this).siblings('#firstName').val();
    var lastName = $(this).siblings('#lastName').val();
    var email = $(this).siblings('#email').val();
    var password = $(this).siblings('#password').val();
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
      data: {
        fname: firstName,
        lname: lastName,
        email: email,
        password: password
      },
      method: "POST",
      success: function(resp) {
        $('.registrationForm').hide();
        $('.loginForm').show();
      },
      error: function(error) {
          console.log('User creation failed due to ', error);
      }
    });
  });

  //login
  $('.fluid-container').on('click', '#regPageLoginButton', function(event) {
    event.preventDefault();
    $('.registrationForm').hide();
    $('.loginForm').show();
  })

  //login
  $('.fluid-container').on('click', '#loginPageLoginButton', function(event) {
    event.preventDefault();
    var email = $(this).siblings('#email').val();
    var password = $(this).siblings('#password').val();

    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
      data: {
        email: email,
        password: password
      },
      method: "POST",
      success: function(data) {
        localStorage.setItem('token', data.response.token);
        localStorage.setItem('id', data.response.id);
        loadNewsFeed( pageCount = 1 );

      },
      error: function(error) {
          console.log('User login failed due to ', error);
      }
    })
  })

  //Logout
  $('.logout').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
      data: {
        token: localStorage.getItem('token')
      },
      method: "GET",
      success: function(resp) {
        $('.newsfeedPage').hide();
        $('.loginForm').show();
        localStorage.clear();
      },
      error: function(error) {
        console.log("Logout failed due to", error);
      }
    });
  })

  //swap register to loginForm
  $('.fluid-container').on('click', '#loginPageRegisterButton', function(event) {
    event.preventDefault();
    $('.loginForm').hide();
    $('.registrationForm').show();
  })

}

var pageCounter = 1;

var commentContainer = document.getElementById("comment-box");

$('.nav-forward').on('click', function(event) {
  event.preventDefault();
  let commentBoxChildren = $('.comment-box').children();
  if (commentBoxChildren.length === 10) {
    pageCounter += 1;
    loadNewsFeed(pageCounter);
  } else {
    console.log('there are no more posts to load!');
  }
})

$('.nav-back').on('click', function(event) {
  event.preventDefault();
  if (pageCounter > 1) {
    pageCounter -= 1;
    loadNewsFeed(pageCounter);
  } else {
    console.log('cant go back any farther!');
  }
})

$('#postCommentButton').on('click', function(event) {
  event.preventDefault();

  let comment = $(this).siblings('#comment').val();

  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    data: {
      token: localStorage.getItem('token'),
      content: comment
    },
    method: 'POST',
    success: function(data){
      loadNewsFeed();
      $('#comment').val('')
    },
    error: function(err) {
      console.log('there was an error posting the comment to the database: ', error);
    }
  })
})

$('.comment-box').on('click', '.comment-reply-count', function(event) {
  event.preventDefault();
  var postId = $(this).parent()[0].children[6].textContent.substring(4);
  $('.newsfeedPage').hide();
  $('.commentRepliesPage').show();

  loadReplyFeed(postId);
})

function loadReplyFeed(postId) {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + postId,
    data: {
      token: localStorage.getItem('token')
    },
    method: 'GET',
    success: function(data) {
      console.log('success trying to retrieve the replies / comments', data);
      localStorage.setItem('postId', postId)
      $('.replies-box').empty();
      if (data.response.length > 0) {
        renderReplyHtml(data);
      }
    },
    error: function(err) {
      console.log('there was an error trying to retrieve the replies for this post', err);
    }
  })
}

function renderReplyHtml(data) {
    data.response.forEach(function(reply) {

      //extract relevent data from data param
      var replierName = reply.poster.name;
      var replyContent = reply.content;
      var momentTime = moment(reply.createdAt);
      var newTime = convertTime(momentTime);
      var replyTime = reply.createdAt;
      var replierId = reply.poster.id;

      //create html elements for each relevant data piece
      var nameHtml = $('<p>').text(replierName);
      var contentHtml = $('<p>').text(replyContent);
      var breaker = $('<br>');
      var timeHtml = $('<p>').text(newTime);
      var idHtml = $('<p>').text('id: ' + replierId);


      //give html elements their classes
      nameHtml.addClass('replier-name');
      contentHtml.addClass('reply-content');
      timeHtml.addClass('reply-time');
      idHtml.addClass('replier-id');


      //append html to new comment html
      var newReply = $('<div>');
      newReply.append(nameHtml);
      newReply.append(contentHtml);
      newReply.append(breaker);
      newReply.append(timeHtml);
      newReply.append(idHtml);
      newReply.addClass('singleReply')
      $('.replies-box').append(newReply)
    })
}

$('#postReplyButton').on('click', function(event) {
  event.preventDefault();
  var reply = $(this).siblings('#reply').val();
  var postId = localStorage.getItem('postId');

  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + postId,
    data: {
      token: localStorage.getItem('token'),
      content: reply
    },
    method: 'POST',
    success: function(data) {
      console.log('success posting a reply ', data);
      console.log($('.replies-box')[0].childNodes.length, '???');
      $('.reply-input').val('');
      loadReplyFeed(postId);
    },
    error: function(err) {
      console.log('there was an error posting your reply ', err);
    }
  })
})

$('#back').on('click', function(event) {
  event.preventDefault();
  $('.commentRepliesPage').hide();
  $('.replies-box').empty();
  $('.reply-input').val('');
  localStorage.removeItem('postId');
  loadNewsFeed(pageCounter);
  $('.newsfeedPage').show();

})

$('.comment-box').on('click', '.comment-like-button', function(event) {
  event.preventDefault();
  var postId = $(this).parent()[0].children[6].textContent.substring(4);
  console.log(postId);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + postId,
    data: {
      token: localStorage.getItem('token')
    },
    method: 'GET',
    success: function(data) {
      $(this).removeClass('fa-thumbs-o-up');
      $(this).addClass('fa-thumbs-up');
      loadNewsFeed(pageCounter);
      console.log('success in liking this comment', data);
    },
    error: function(err) {
      console.log('there was an error liking this comment, or you have already liked this comment', err);
    }
  })
})

function convertTime(postTime) {
  var currentTime = moment();
  var msTime = currentTime.diff(postTime);
  if(msTime >86400000 && msTime <604800000) { //more than 1 day agp
    return "Posted more than a day ago";
  } else if(msTime > 3600000) {
    var hours = currentTime.diff(postTime, 'hours');
    return "Posted " + hours + ' hours ago'
  } else if(msTime > 60000){

    var minutes = currentTime.diff(postTime, 'minutes');

    return "Posted " + minutes + ' minutes ago'
  }
  else if(msTime < 60000){
    var seconds = currentTime.diff(postTime, 'seconds');
    return 'Posted ' + seconds + ' seconds ago';
  }
  else{
    return 'Posted on ' + postTime.format('dddd, MMMM Do YYYY');
  }
}


setInterval( function updateNewsFeed() {
  console.log('reloading!');
  loadNewsFeed(pageCounter);
  console.log('reloaded!');
}, 35000);

function showMoment() {
  moment.format();
  console.log(myMoment);
}

$(document).ready(function() {
  $('.loginForm').hide();
  $('.newsfeedPage').hide();
  $('.invalid-feedback').hide();
  $('.commentRepliesPage').hide();
  initialize();
});
