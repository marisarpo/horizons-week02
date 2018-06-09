if (localStorage.getItem('token')) {
  $('.outside').toggle();
  $('.posts').toggle();
  $('.post-posts').toggle();
}


$('.btn-1').on('click', function() {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'POST',
    success: function(data) {
      if (data['success']) {
        $('.outside').toggle();
        $('.login').toggle();
      }

    },
    data: {
      fname: $('#Firstname').val(),
      lname: $('#Lastname').val(),
      email: $('#Email').val(),
      password: $('#Password').val()
    }
  })
});

$('.btn-2').on('click', function(event) {
  event.preventDefault();
  $('.outside').toggle();
  $('.login').toggle();
});

$('.btn-3').on('click', function() {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    success: function(data) {
      if (data['success']) {
        localStorage.setItem('token', data.response.token);
        localStorage.setItem('id', data.response.token);
        $('.login').toggle();
        $('.posts').toggle();
        $('.post-posts').toggle();
      }
    },
    data: {
      email: $('#Email-login').val(),
      password: $('#Password-login').val()
    }
  })
});

$('.btn-4').on('click', function() {
  $('.outside').toggle();
  $('.login').toggle();
});

setInterval(function(){ return refresh() }, 10000);
refresh();

function refresh() {
  $('.post').remove();
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
    method: 'GET',
    success: function(data) {
      if (data['success']) {
        for (var i = 0; i < data['response'].length; i++) {
          var name = data['response'][i]['poster']['name'];
          var time = data['response'][i]['createdAt'];
          var content = data['response'][i]['content'];
          var comments = data['response'][i]['comments'];
          var likes = data['response'][i]['likes'];
          var id = data['response'][i]['_id'];
          commentsnum = comments.length;
          likesnum = likes.length;
          var commentstring = "";
          for (var j = 0; j < commentsnum; j++ ) {
            var commentsname = comments[j]['poster']['name'];
            var commentstime = comments[j]['createdAt'];
            var commentscontent = comments[j]['content'];
            commentstring += `<div class="space-before-comment">${commentsname}</div>
                              <div>${commentstime}</div>
                              <div>${commentscontent}</div>`;
          }
          $('.posts').append($(`<div class="post" id="${id}">
                <div class="post-name">${name}</div>
                <div class="post-time">${time}</div>
                <div class="post-content">${content}</div>
                  <div class="replies-likes">
                    <div>${likesnum}likes,${commentsnum}replies</div>
                    <div class="buttons">
                  <button class="btn btn-primary btn-like">Like</button>
                  <button class="btn btn-primary btn-reply">Reply</button>
                  <input class="form-control"placeholder="Comments">
                </div>
              </div>${commentstring}
              </div>`));
        }
      }
    },
    data: {
      token: localStorage.getItem('token')
    },
    error: function(err) {
      console.log(err);
    }
  });
};


$('.btn-post').on('click', function() {
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
    method: "POST",
    success: function(data) {
      if(data['success']) {
        $('.post-text').val("");
      }
    },
    data: {
      token: localStorage.getItem('token'),
      content: $('.post-text').val()
    },
    error: function(err) {
      console.log(err);
    }
  });
});

$('.posts').on('click','.btn-reply', function() {
  var postid = $(this).closest('.post').attr('id');
  var content = $(this).siblings('input');
  $.ajax({
    url:"https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/"+postid,
    method: "POST",
    success: function(data) {
      if (data['success']) {
        content.val("");
      }
    },
    data: {
      token: localStorage.getItem('token'),
      content: content.val()
    },
    error: function(err) {
      console.log(err);
    }
  });
});

$('.posts').on('click','.btn-like', function() {
  var postid = $(this).closest('.post').attr('id');
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/"+postid,
    method: "GET",
    data: {
      token: localStorage.getItem('token')
    },
    error: function(err) {
      console.log(err);
    }
  });
});
