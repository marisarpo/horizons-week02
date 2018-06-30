if(localStorage.getItem('token')) {
  $('#registration').hide();
  $('#login').hide();
  $('#newsfeed-container').show();
} else {
  $('#registration').show();
  $('#login').hide();
  $('#newsfeed-container').hide();
}

$('#register-btn').on('click', function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    type: "POST",
    data: {
      fname: $('#firstNameInput').val(),
      lname: $('#lastNameInput').val(),
      email: $('#emailInput').val(),
      password: $('#passwordInput').val()
    },
    error: function(err) {
      var errObj = JSON.parse(err.responseText);
      alert("Sorry! " + errObj.error + " Please try again!");
    },
    success: function(resp) {
      console.log("success!");
      $('#login').show();
      alert("thanks for signing up! please sign in now with your new account");
      $('#registration').hide();
    }
  });
});

$('#login-btn').on('click', function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    type: "POST",
    data: {
      email: $('#emailInputLogin').val(),
      password: $('#passwordInputLogin').val(),
    },
    error: function(err) {
      console.log(err);
      alert("Sorry! " + err.error + " Please try again!");
    },
    success: function(resp) {
      $('#login').hide();
      $('#emailInputLogin').val('');
      $('#passwordInputLogin').val('');
      localStorage.setItem('id', resp.response.id);
      localStorage.setItem('token', resp.response.token);
      $('#newsfeed-container').show({
        done: setupNewsfeed()
      });
    }
  });
});

$('#logout').on('click', function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    type: "GET",
    data: {
      token: localStorage.getItem('token')
    },
    error: function(err) {
      console.log(err);
      //alert("Sorry! " + err.error + " Please try again!");
    },
    success: function(resp) {
      localStorage.clear();
      $('#registration').hide();
      $('#newsfeed-container').hide();
      $('#login').show();
    }
  });
});

function setupNewsfeed() {
  $('#newsfeed-container').find('.card').remove();
  console.log('setting up newsfeed');
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/',
    type: "GET",
    dataType: "json",
    data: {
      token: localStorage.getItem('token'),
    },
    error: function(err) {
      console.log('error callback');
      console.log(err);
      //alert("Sorry! " + err.error + " Please try again!");
    },
    success: function(data) {
      console.log('setup newsfeed is a success');
      var posts = data.response;
      for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        //console.log('post', post, 'comments', post.comments);

        //console.log(post.comments);
        //console.log('success callback');
        //console.log(post);

        var cardhtml = `<div class="card" id='${post._id}''>
                          <div class="card-body">
                            <h2 class="card-title">${post.poster.name}</h2>
                            <p class='time'>posted at ${post.createdAt}</p>
                            <p class="card-text">${post.content}</p>
                            <span class='replies-display'>${post.comments.length} replies,</span>
                            <span class='likes-display'>${post.likes.length} likes</span>
                            <p><a class='replies-link'>See replies</a></p>
                            <div class='comments-container'>
                            </div>
                            <div class = "likereplybtns">
                              <a href="#" class="btn btn-primary like-btn"><span class="glyphicon glyphicon-thumbs-up"></span></a>
                              <a href="#" class="btn btn-primary reply-btn">Reply</a>
                            </div>
                            <div class='well collapse reply-form'>
                            <form class="form-inline">
                              <input type="text" class="form-control mb-2 mr-sm-2 reply-form-text" placeholder="Comment"/>
                              <button type="button" class="btn btn-default reply-form-save"">Save</button>
                              <button type="button" class="btn btn-default reply-form-cancel"><span class="glyphicon glyphicon-remove"></span></button>
                            </form>
                            </div>
                          </div>
                        </div>`;

        $('#newsfeed').append(cardhtml);
        //
        // post.comments.forEach(function(comment) {
        //   //console.log(comment);
        //   var commenthtml = `<div class='comment'>
        //                         <p>${comment.poster.name}: ${comment.createdAt}</p>
        //                         <p>${comment.content}</p>
        //                       </div>
        //                      `
        //   //console.log(commenthtml);
        //   console.log(this._id);
        //   console.log($('#'+$(this).id));
        //   //console.log(this);
        //   //console.log(this);
        //   //console.log($('#'+this._id));
        //   //$(`#comments-container${post.id}`).append(commenthtml);
        // }.bind(post));

        // for(var j = 0; j < post.comments.length; j++) {
        //   var comment = post.comments[i];
        //   console.log(comment);
        //   if(comment != undefined) {
        //     var commenthtml = `<div class='comment'>
        //                           <p>${comment.poster.name}: ${comment.createdAt}</p>
        //                           <p>${comment.content}</p>
        //                         </div>
        //                        `
        //     $(`#comments-container${post.id}`).append(commenthtml);
        //   }
        // }
      }
    }
  });
}

$('body').on('click', '.replies-link', function(event) {
  event.preventDefault();
  card = $(this).closest('.card');
  console.log($(this).closest('.card').find('.comments-container'));
  postid = $(this).closest('.card')[0].id;
  console.log('postid', postid)
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${postid}`,
    type: "GET",
    data: {
      token: localStorage.getItem('token'),
    },
    error: function(err) {
      console.log(err);
      //alert("Sorry! " + err.error + " Please try again!");
    },
    success: function(resp) {
      var comments = resp.response;
      for(var j = 0; j < comments.length; j++) {
        var comment = comments[j];
        var commenthtml = `<div class='comment'>
                              <p>${comment.poster.name}: ${comment.createdAt}</p>
                              <p>${comment.content}</p>
                            </div>
                           `
        console.log($(card).find('.comments-container'));
        $(card).find('.comments-container').append(commenthtml);
        $(card).find('.replies-link').hide();
        //$(`#comments-container${post.id}`).append(commenthtml);
      }
    }
  });
})

$('#post-btn').on('click', function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    type: "POST",
    data: {
      token: localStorage.getItem('token'),
      content: $('#postInput').val(),
    },
    error: function(err) {
      console.log(err);
      alert("Sorry! " + err.error + " Please try again!");
    },
    success: function(resp) {
      $('#postInput').val('');
      setupNewsfeed();
      console.log("post worked!!" + resp.response.content);
    }
  });
});

$('body').on('click', '.reply-form-cancel', function(event) {
  event.preventDefault();
  well = $(this).closest('.well');
  well.collapse('toggle');
})

$('body').on('click', '.reply-btn', function(event) {
  event.preventDefault();
  post = $(this).closest('.card');
  well = $(this).parents('.likereplybtns').siblings('.well');
  well.collapse('toggle');
})

$('body').on('click', '.reply-form-save', function(event) {
  event.preventDefault();
  post = $(this).closest('.card');
  //console.log('post', post, 'postarr', $(post[0]), 'postid', $(post[0].id));
  well = $(this).closest('.well');
  input = $(this).siblings('.reply-form-text').val();

  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${post[0].id}`,
    type: "POST",
    data: {
      token: localStorage.getItem('token'),
      content: input
    },
    error: function(err) {
      console.log('error!!!', err);
      //alert("Sorry! " + err.error + " Please try again!");
    },
    success: function(resp) {
      console.log(resp);
      $(this).find('.replies-display').text(`${resp.response.comments.length} replies, `);
      well.collapse('toggle');
    }.bind(post)
  });
})

$('body').on('click', '.like-btn', function(event) {
  event.preventDefault();
  post = this.closest('.card');
  //console.log('this', $(this), 'post', $(post));
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${post.id}`,
    type: "GET",
    data: {
      token: localStorage.getItem('token'),
    },
    error: function(err) {
      console.log(err);
      alert("Sorry! " + err.error + " Please try again!");
    },
    success: function(resp) {
      console.log('like success');
      $(this).find('.likes-display').text(`${resp.response.likes.length} likes`);
    }.bind(post)
  });
})

$('#go-to-login').on('click', function(event) {
  event.preventDefault();
  $('#login').show();
  $('#registration').hide();
});

$('#go-to-register').on('click', function(event) {
  event.preventDefault();
  $('#registration').show();
  $('#login').hide();
});

setInterval(setupNewsfeed(), 30000);
