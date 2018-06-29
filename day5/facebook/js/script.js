$('#login').hide();
$('#newsfeed').hide();

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
      localStorage.setItem('id', resp.response.id);
      localStorage.setItem('token', resp.response.token);
      $('#newsfeed').show({
        done: setupNewsfeed()
      });
    }
  });
  $('#login').hide();
});

function setupNewsfeed() {
  //console.log('setting up newsfeed');
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
      alert("Sorry! " + err.error + " Please try again!");
    },
    success: function(data) {
      var posts = data.response;
      for(var i = 0; i < posts.length; i++) {
        var post = posts[i];
        //console.log('success callback');
        //console.log(post);

        var cardhtml = `<div class="card" id='${post._id}''>
                          <div class="card-body">
                            <h1 class="card-title">${post.poster.name}</h1>
                            <p>created at ${post.createdAt}</p>
                            <p class="card-text">${post.content}</p>
                            <p class='likes-replies-display'>${post.comments.length} replies, ${post.likes.length} likes</p>
                            <p>comments go here</p>
                            <a href="#" class="btn btn-primary like-btn">Like</a>
                            <a href="#" class="btn btn-primary reply-btn">Reply</a>
                          </div>
                        </div>`;

        $('#newsfeed').append(cardhtml);
      }
    }
  });
}

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
      console.log("post worked!!" + resp.response.content);
    }
  });
});

$('body').on('click', '.like-btn', function(event) {
  event.preventDefault();
  post = this.closest('.card');
  console.log('this', $(this), 'post', $(post));
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
      //console.log('passed in post', $(this));
      //console.log('likes replies', $(this).find('.likes-replies-display'));
      $(this).find('.likes-replies-display').text(`${resp.response.comments.length} replies, ${resp.response.likes.length} likes`);
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
