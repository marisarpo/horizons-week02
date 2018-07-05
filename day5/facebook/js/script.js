"use strict";

// EVENT LISTENERS
document.getElementById("logout-btn").addEventListener('click', function(){
  console.log('...logging out...');
  localStorage.setItem('token', '');
  location.reload();
});

// CHECK LOGIN STATUS
if(localStorage.getItem('token') != ''){
  loadFeed();
  loginSuccess();
}

// LOAD FEED
function loadFeed(page){
  var payload = {token: localStorage.getItem('token')};
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/${page}`,
    method: 'get',
    data: payload,
    success: function(response){
      console.log("load feed successful")
      var posts = response.response;

      // Display posts in feed
      posts.reverse();                    // reverse so that newest posts are added last
      posts.forEach(function(element){
        // Append post
        var author = element.poster.name;
        var comment = element.content;
        var replies = element.comments;
        var id = element._id;             // post id
        var likes = element.likes.length;

        if(likes == undefined) likes = '';

        var html = `
          <div class='comment' id='${id}'>
            <div class="author">${author}</div>
            <div class="message">${comment}</div>
            <div class="controls">
              <button class="hide-replies btn btn-default hidden">Hide Replies</button>
              <button class="show-replies btn btn-default">Show Replies</button>
              <button class="reply btn btn-default">Reply</button>
              <div class="like-btn"><span id="like-count">${likes}</span> <button class="btn btn-default"><i class="glyphicon glyphicon-thumbs-up"></i></button></div>
            </div><div></div>
            <div class="replies hidden"></div>
          </div>`;

          $('.comments').prepend(html);

          // Display replies(comments)
          replies.forEach(function(element){
            var content = element.content;
            var author = element.poster.name;

            var html = `
              <div class='reply'>
                <div class="author">${author}</div>
                <div class="message">${content}</div><hr>
              </div>`;

            $(`#${id} .replies`).append(html);
          });

      });

    },
    error: function(){console.log("error")}
  });
}

// REGISTRATION ---------------------------------------------------------

// user clicks register button
$('.register-form .register-btn').on("click", function(event){
  //get name
  var first = $('.register-form #first-name').val();
  var last = $('.register-form #last-name').val();
  var email = $('.register-form #email').val();
  var pass = $('.register-form #password').val();


  var database = {
    fname: first,
    lname: last,
    email: email,
    password: pass
  };

  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    type: 'POST',
    data: database,
    success: function(response){
      if(response.success == true){
        console.log('register success');
        $('.register-form').addClass("hidden");
        $('.login-form').removeClass("hidden");
      }
    },
    error: function(err){
      alert("Invalid Registration. Please try again.")
    }
  });
});

// LOGIN --------------------------------------------------------------------------------

// user clicks register button
$('.login-form .register-btn').on("click", function(event){
  //get name
  var first = $('.login-form #first-name').val();
  var last = $('.login-form #last-name').val();
  var email = $('.login-form #email').val();
  var pass = $('.login-form #password').val();

  var database = {
    email: email,
    password: pass
  };

  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    type: 'POST',
    data: database,
    success: function(response){
      // Store vars in outer scope
      var id = response.response.id;
      var token = response.response.token;

      localStorage.setItem('token', token);

      loginSuccess();
    },
    error: function(err){
      alert("Invalid Login Credentials. Please try again.")
    }
  });
});

function loginSuccess(){
  console.log("login_success");

  //hide login / registration forms
  $('.login-form').addClass("hidden");

  $('.register-form').addClass('hidden');

  //show feed
  $('.feed').removeClass('hidden');

  loadFeed();

};

"use strict";

// hide all 'HIDE REPLIES' buttons first
$('.show-replies').hide();


//  POST NEW COMMENT ---------------------------------------------------------------------

$(' .post-btn').on("click", function(event){
  var comment = $(this).siblings('.post-area').val();

  var payload = {token: localStorage.getItem('token'), content: comment};

  // on successful REST call
  function on_success(response){
    var author = response.response.poster.name;

    var html = `
      <div class='comment'>
        <div class="author">${author}</div>
        <div class="message">${comment}</div>
        <div class="controls">
          <button class="hide-replies btn btn-default" style="display: none">Hide Replies</button>
          <button class="show-replies btn btn-default">Show Replies</button>
          <button class="reply btn btn-default">Reply</button>
          <div class="like-btn"><span id="like-count"> 0 </span> <button class="btn btn-default"><i class="glyphicon glyphicon-thumbs-up"></i></button></div>
        </div><div></div>
        <div class="replies"></div>
      </div>`;

      var new_element = $(html);
      $(new_element).prependTo('.comments').hide().slideDown();

  }

  var ret = my_ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', 'post', payload, on_success);

  $(this).siblings('.post-area').val('');

});


// REPLY TO EXISTING POST ---------------------------------------------------------------------

// open input box
$('.comments').on("click", '.reply', function(event){
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  var html = `<div class="input-group post-comment reply-box">
    <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
    <textarea id="card" type="text" class="form-control post-area" name="description" placeholder="Project Description"></textarea>
    <button class="input-group-addon post-btn">Post</button>
  </div>`;

  $(html).appendTo(repliesDiv);
  $(this).remove();
});

// post REPLY
$('.comments').on("click", '.reply-box button', function(event){
  var comment = $(this).siblings('textarea').val();
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  var payload = {token: localStorage.getItem('token'), content: comment};

  // on successful REST call
  function on_success(response){
    var comments_len = response.response.comments.length;
    var author = response.response.comments[comments_len-1].poster.name;

    var html = `
      <div class='reply'>
        <div class="author">${author}</div>
        <div class="message">${comment}</div><hr>
      </div>`;

      var new_element = $(html);

      repliesDiv.append(html);
      console.log('this', self);
  }

  var id = $(this).closest('.comment').attr('id');
  var login_token = localStorage.getItem('token');

  var ret = my_ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${id}`, 'post', payload, on_success);
});


// HIDE REPLIES --------------------------------------------------------------------------------------------

$('.comments').on("click", '.hide-replies', function(event){
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  repliesDiv.addClass('hidden');

  // replace hide replies button with 'SHOW REPLIES' button
  commentDiv.find('.hide-replies').addClass('hidden');    // hide
  commentDiv.find('.show-replies').removeClass('hidden');    // show

  var num_replies = commentDiv.find('.replies > .reply').length;

  // reply vs replies
  if(num_replies == 1) var plurality = 'reply';
  else var plurality = 'replies';

  // display num of comments hidden;
  commentDiv.append(`<div class='reply-count'>${num_replies} ${plurality} hidden</div><div></div>`);

});

// SHOW REPLIES --------------------------------------------------------------------------------------------

$('.comments').on("click", '.show-replies', function(event){
  var commentDiv = $(this).closest('.comment');
  var repliesDiv = commentDiv.children('.replies');

  repliesDiv.removeClass('hidden');

  // replace show replies button with 'HIDE REPLIES' button
  commentDiv.find('.hide-replies').removeClass('hidden');    // show '.hide-replies'
  commentDiv.find('.show-replies').addClass('hidden');    // hide '.show-replies'

  commentDiv.find('.reply-count').hide();
});

// LOGIN BUTTON
$('.login-btn').on("click", function(event){
  $('.register-form').addClass('hidden');
  $('.login-form').removeClass('hidden');
});

// LIKE BUTTON
$('.comments').on("click", '.like-btn button', function(event){
  var id = $(this).closest('.comment').attr('id');
  var login_token = localStorage.getItem('token');

  my_ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${id}`, 'get', {token: login_token}, function(response){console.log(response)});


  //---increment like count---
  $(this).addClass('like-btn-child-pressed');
  var current = $(this).parent().text();
  current++;
  $(this).siblings('#like-count').text(current);

});



// AJAX GENERAL HELPER FUNCTION ---------------------------------------------------------------------
function my_ajax(url, type, data, func){
  var ret = $.ajax({
    url: url,
    type: type,
    data: data,
    success: function(response){
      func(response);
    },
    error: function(err){
      console.log(err)
    }
  });
  return ret;
};
